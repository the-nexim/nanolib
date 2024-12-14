import {parseDuration} from '@alwatr/parse-duration';
import {waitForTimeout} from '@alwatr/wait';
import {snackbarSignal} from '@nexim/snackbar';

import {logger} from './logger.js';

/**
 * Check Is on installed PWA mode.
 */
function isOnInstalledPwa(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches || ('standalone' in window.navigator && window.navigator.standalone != null)
  );
}

/**
 * Check browser compatibility for PWA installation and setup the installation prompt handler.
 *
 * If browser support `BeforeInstallPromptEvent` event, show the install button and handle the installation process.
 *
 * require element with `install-pwa-prompt` id.
 */
export function setupInstallPwaPromptHandler(): void {
  logger.logMethod?.('setupInstallPwaPromptHandler');

  if (isOnInstalledPwa() === true) return;

  const isSupportInstallFromApp = 'BeforeInstallPromptEvent' in window;
  if (isSupportInstallFromApp === false) return;

  const installPwaPromptButton = document.getElementById('install-pwa-prompt');
  if (installPwaPromptButton === null) return;

  // Show button prompt because supported.
  installPwaPromptButton.classList.remove('!hidden');
  installPwaPromptButton.classList.add('!flex');

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let deferredPrompt: any;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    installPwaPromptButton.addEventListener('click', () => {
      if (deferredPrompt == null) {
        logger.error('setupInstallPwaPromptHandler', 'deferred_prompt_is_null');
        snackbarSignal.notify({
          content: 'مشکلی در نصب برنامه پیش آمده است! ممکن است برنامه را قبلا نصب کرده باشید.',
          duration: parseDuration('2s'),
        });
        waitForTimeout(parseDuration('3s')).then(() => {
          location.href = '/';
        });
        return;
      }

      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
      });
    });

    // FIXME: check this to ensure work fine
    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      snackbarSignal.notify({
        content: 'مراحل نصب آغاز شد...',
      });

      installPwaPromptButton.classList.add('!hidden');
      installPwaPromptButton.classList.remove('!flex');
    });
  }
  catch (error) {
    logger.error('setupInstallPwaPromptHandler', 'unknown_install_error', {error});
    snackbarSignal.notify({
      content: 'مشکلی در نصب برنامه پیش آمده است! ممکن است برنامه را قبلا نصب کرده باشید.',
    });
  }
}

/**
 * Show a guide link to install the PWA.
 *
 * require element with `install-pwa-guide` id.
 */
export function showInstallPwaGuideElement(): void {
  logger.logMethod?.('showInstallPwaGuideElement');

  if (isOnInstalledPwa() === true) return;

  const installPwaGuideLink = document.getElementById('install-pwa-guide');
  if (installPwaGuideLink === null) return;

  installPwaGuideLink.classList.remove('!hidden');
  installPwaGuideLink.classList.add('!flex');
}

/**
 * Show a message that the PWA is installed.
 *
 * require element with `installed-pwa` id.
 */
export function showInstalledPwaMessage(): void {
  logger.logMethod?.('showInstalledPwaMessage');

  if (isOnInstalledPwa() === false) return;

  const installedMessage = document.getElementById('installed-pwa');
  if (installedMessage === null) return;

  snackbarSignal.notify({
    content: 'برنامه نصب شده است!',
    action: {
      label: 'رفتن به صفحه‌ی اصلی',
      handler: () => {
        location.href = '/';
      },
    },
  });

  installedMessage.classList.remove('!hidden');
  installedMessage.classList.add('!flex');
}
