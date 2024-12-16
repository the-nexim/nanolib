import { AlwatrSignal } from '@alwatr/flux';

import {logger} from './logger.js';

const eventList = [
  'service_worker_registered',
  'service_worker_register_failed',
  'service_worker_first_install',
  'service_worker_updated',
  'service_worker_installed',
  'service_worker_update_found',
] as const;

export const serviceWorkerSignal = /* @__PURE__ */ new AlwatrSignal<{event: (typeof eventList)[number]}>({
  name: 'serviceWorker',
});

/**
 * Register the service worker and listen for the 'updatefound' event
 *
 * @param serviceWorkerPath The path to the service worker
 */
export async function registerServiceWorker(serviceWorkerPath: string) {
  logger.logMethod?.('registerServiceWorker');

  try {
    const swRegistration = await navigator.serviceWorker.register(serviceWorkerPath);
    logger.logOther?.('Service worker registered.');
    serviceWorkerSignal.notify({event: 'service_worker_registered'});
    swRegistration.addEventListener('updatefound', () => serviceWorkerUpdateFoundHandler(swRegistration.installing));
  }
  catch (error) {
    logger.error('registerServiceWorker', 'registration_failed ', {error});
    serviceWorkerSignal.notify({event: 'service_worker_register_failed'});
  }
}

/**
 * Handle the 'updatefound' event
 *
 * @param serviceWorker The service worker
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
 * Handle the 'statechange' event
 *
 * If the service worker state is 'installed' then it is either a new install or an update
 * If the service worker state is 'redundant' then the service worker is redundant
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
 *
 * @param serviceWorker The service worker
 */
function serviceWorkerStateChangeHandler(serviceWorker: ServiceWorker): void {
  logger.logMethodArgs?.('serviceWorkerStateChangeHandler', serviceWorker.state);
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
    serviceWorkerSignal.notify({event: 'service_worker_installed'});
  }
}
