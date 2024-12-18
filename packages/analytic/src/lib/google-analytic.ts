declare global {
  interface Window {
    dataLayer: unknown[];
  }
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
