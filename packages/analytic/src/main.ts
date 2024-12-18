/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

declare global {
  interface Window {
    // Type of Google Setup analytics dataLayer
    dataLayer: unknown[];

    // Type of Clarity Analytics Setup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity: any;
  }
}

// Clarity Analytics setup
export function setupClarityAnalytics(trackingId: string): void {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', trackingId);
}

// Google Analytics setup
function setupGoogleAnalytics(trackingId: string): void {
  window.dataLayer = window.dataLayer || [];

  function gtag(...args: unknown[]): void {
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', trackingId);
}

// Load Google Analytics script
export function loadGoogleAnalyticsScript(trackingId: string): void {
  const script = document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.onload = () => setupGoogleAnalytics(trackingId);
  document.head.appendChild(script);
}
