declare global {
  interface Window {
    dataLayer: unknown[];
  }
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
export function loadGoogleAnalyticsScript(trackingId: string): void {
  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.onload = () => setupGoogleAnalytics(trackingId);
  document.head.appendChild(script);
}
