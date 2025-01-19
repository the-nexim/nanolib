import {AlwatrSignal} from '@alwatr/flux';
import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';
import {parseDuration, type Duration} from '@alwatr/parse-duration';

/**
 * The events that can be emitted by the service worker.
 */
export type ServiceWorkerEvent =
  | 'service_worker_registered'
  | 'service_worker_register_failed'
  | 'service_worker_first_install'
  | 'service_worker_updated'
  | 'service_worker_installed'
  | 'service_worker_update_found'
  | 'service_worker_update_failed';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger = /* @__PURE__ */ createLogger(__package_name__);

/**
 * Signal for service worker events.
 *
 * @example
 * ```ts
 * import {serviceWorkerSignal} from '@nexim/service-worker';
 *
 * serviceWorkerSignal.subscribe(({event}) => {
 *   console.log('Service worker event:', event);
 * });
 * ```
 */
export const serviceWorkerSignal = /* @__PURE__ */ new AlwatrSignal<{event: ServiceWorkerEvent}>({
  name: 'serviceWorker',
});

/**
 * Register the service worker and handle updates.
 *
 * @param serviceWorkerPath - The path to the service worker.
 * @param timeForAutoUpdate - For updating automatically service worker.
 *
 * @example
 * ```ts
 * import {registerServiceWorker} from '@nexim/service-worker';
 *
 * const serviceWorkerPath = '/service-worker.js';
 *
 * // without auto update
 * registerServiceWorker(serviceWorkerPath);
 *
 * // with auto update
 * registerServiceWorker(serviceWorkerPath, '10m');
 * ```
 */
export async function registerServiceWorker(serviceWorkerPath: string, timeForAutoUpdate?: Duration): Promise<void> {
  logger.logMethodArgs?.('registerServiceWorker', {serviceWorkerPath});

  if ('serviceWorker' in navigator === false) {
    logger.incident?.('registerServiceWorker', 'service_worker_not_supported');
    return;
  }

  try {
    const swRegistration = await navigator.serviceWorker.register(serviceWorkerPath);
    serviceWorkerSignal.notify({event: 'service_worker_registered'});
    swRegistration.addEventListener('updatefound', () => serviceWorkerUpdateFoundHandler(swRegistration.installing));
    logger.logOther?.('Service worker registered.');

    if (timeForAutoUpdate != null) {
      setInterval(async () => {
        logger.logMethod?.('startPeriodicUpdateChecks');

        await swRegistration.update();
      }, parseDuration(timeForAutoUpdate)); // 10 minutes
    }
  }
  catch (error) {
    logger.error('registerServiceWorker', 'registration_failed', {error});
    serviceWorkerSignal.notify({event: 'service_worker_register_failed'});
  }
}

/**
 * Handle the 'updatefound' event
 *
 * @param serviceWorker - The service worker
 */
function serviceWorkerUpdateFoundHandler(serviceWorker: ServiceWorker | null): void {
  if (serviceWorker == null) return;
  logger.logMethod?.('swUpdateFound');

  // Only notify update found if there's an existing controller
  if (navigator.serviceWorker.controller) {
    serviceWorkerSignal.notify({event: 'service_worker_update_found'});
  }
  else {
    serviceWorkerSignal.notify({event: 'service_worker_first_install'});
  }

  serviceWorker.addEventListener('statechange', () => serviceWorkerStateChangeHandler(serviceWorker));
}

/**
 * Handle the 'statechange' event.
 *
 * If the service worker state is 'installed' then it is either a new install or an update.
 * If the service worker state is 'redundant' then the service worker is redundant.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
 *
 * @param serviceWorker - The service worker.
 */
function serviceWorkerStateChangeHandler(serviceWorker: ServiceWorker): void {
  logger.logMethodArgs?.('serviceWorkerStateChangeHandler', {state: serviceWorker.state});

  if (serviceWorker.state === 'installed') {
    // if old controller available then its update else its new install
    if (navigator.serviceWorker.controller) {
      serviceWorkerSignal.notify({event: 'service_worker_updated'});
    }
    else {
      serviceWorkerSignal.notify({event: 'service_worker_installed'});
    }
  }
  else if (serviceWorker.state === 'redundant') {
    logger.accident('serviceWorkerStateChangeHandler', 'sw_redundant', 'Service worker redundant');
    serviceWorkerSignal.notify({event: 'service_worker_update_failed'});
  }
}
