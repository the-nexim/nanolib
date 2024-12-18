/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clarity: (...args: unknown[]) => void;
  }
}

/**
 * Sets up Clarity Analytics.
 * @param {string} trackingId - The Clarity Analytics tracking ID.
 * @example
 * import {setupClarityAnalytics} from '@nexim/analytic'
 *
 * setupClarityAnalytics('your-clarity-tracking-id');
 */
export function setupClarityAnalytics(trackingId: string): void {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', trackingId);
}
