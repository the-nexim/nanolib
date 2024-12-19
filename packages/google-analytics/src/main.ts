import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export function initializeGoogleAnalytics(trackingId: string): void {
  loadGoogleAnalyticsScript(trackingId);
  setupGoogleAnalytics(trackingId);
}

/**
 * Sets up Google Analytics.
 * @param {string} trackingId - The Google Analytics tracking ID.
 */
function setupGoogleAnalytics(trackingId: string): void {
  window.dataLayer = window.dataLayer || [];

  /**
   * Google Analytics tracking function.
   * @param {...unknown[]} args - The arguments to be passed to the dataLayer.
   */
  function gtag(...args: unknown[]): void {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', trackingId);
}

/**
 * Loads the Google Analytics script.
 * @param {string} trackingId - The Google Analytics tracking ID.
 * @example
 * import {loadGoogleAnalyticsScript} from '@nexim/analytic'
 *
 * loadGoogleAnalyticsScript('your-google-analytics-tracking-id');
 */
function loadGoogleAnalyticsScript(trackingId: string): void {
  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);
}
