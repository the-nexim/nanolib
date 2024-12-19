import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger = createLogger(__package_name__);

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/**
 * Initialize google analytics with tracking id.
 *
 * @param trackingId - The Google Analytics tracking ID.
 *
 * @example
 * import {initializeGoogleAnalytics} from '@nexim/analytic';
 *
 * initializeGoogleAnalytics('your-google-analytics-tracking-id');
 */
export async function initializeGoogleAnalytics(trackingId: string): Promise<void> {
  logger.logMethodArgs?.('initializeGoogleAnalytics', {trackingId});

  try {
    await loadGoogleAnalyticsScript(trackingId);
  }
  catch (error) {
    logger.error('initializeGoogleAnalytics', 'load_google_analytic_script_failed', error);
    return;
  }

  setupGoogleAnalytics(trackingId);
}

/**
 * Google Analytics tracking function.
 *
 * @param args - The arguments to be passed to the dataLayer.
 */
function gtag(...args: unknown[]): void {
  window.dataLayer.push(args);
}

/**
 * Sets up Google Analytics.
 *
 * @param trackingId - The Google Analytics tracking ID.
 */
function setupGoogleAnalytics(trackingId: string): void {
  logger.logMethodArgs?.('setupGoogleAnalytics', {trackingId});

  window.dataLayer = window.dataLayer || [];

  gtag('js', new Date());
  gtag('config', trackingId);
}

/**
 * Loads the Google Analytics script.
 *
 * @param trackingId - The Google Analytics tracking ID.
 */
function loadGoogleAnalyticsScript(trackingId: string): Promise<void> {
  logger.logMethodArgs?.('loadGoogleAnalyticsScript', {trackingId});

  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // return script load promise
  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
  });
}
