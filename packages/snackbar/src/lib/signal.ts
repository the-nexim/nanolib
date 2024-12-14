import {AlwatrSignal, AlwatrTrigger} from '@alwatr/flux';
import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';
import {parseDuration, type Duration} from '@alwatr/parse-duration';
import { waitForTimeout } from '@alwatr/wait';

import type {SnackbarComponent} from './element.js';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);
const logger = createLogger(`${__package_name__}/snackbar`);

export type SnackbarOptions = {
  /**
   * @property {string} content - The content to be displayed in the snackbar.
  */
  content: string;

  /**
  * @property { Object } [action] - The action button configuration.
  * @property {string} action.label - The label for the action button.
  * @property {Function} action.handler - The handler function for the action button.
  */
  action?: {
    label: string;
    handler: () => void;
  };

  /**
   * Duration for which the snackbar is displayed.
   * `-1` for infinite duration.
   * @property {number} [duration] - Duration for which the snackbar is displayed. `-1` for infinite duration.
   */
  duration?: Duration;

  /**
   * @property {boolean} [addCloseButton] - Whether to add a close button to the snackbar.
   */
  addCloseButton?: boolean;
};

/**
 * Signal for when the snackbar action button is clicked.
 * @type {AlwatrTrigger}
 */
export const snackbarActionButtonClickedSignal = new AlwatrTrigger({
  name: 'snackbar-action-button-clicked',
});

/**
 * Signal for displaying the snackbar.
 * @type {AlwatrSignal<SnackbarOptions>}
 */
export const snackbarSignal = new AlwatrSignal<SnackbarOptions>({name: 'snackbar'});

// Subscribe to the snackbar signal to show the snackbar when the signal is emitted.
snackbarSignal.subscribe((options) => {
  showSnackbar(options);
});

let closeLastSnackbar: (() => Promise<void>) | null = null;
let unsubscribeActionButtonHandler: (() => void) | null = null;

/**
 * Displays the snackbar with the given options.
 * @param {SnackbarOptions} options - Options for configuring the snackbar.
 * @returns {Promise<void>}
 */
async function showSnackbar(options: SnackbarOptions): Promise<void> {
  logger.logMethodArgs?.(`${__package_name__}:showSnackbar`, {options});

  // Set default duration if not provided
  options.duration ??= parseDuration('4s');

  const element = document.createElement('snack-bar') as SnackbarComponent;

  element.setAttribute('content', options.content);

  if (options.addCloseButton === true) {
    element.setAttribute('add-close-button', '');
  }

  if (options.action != null) {
    element.setAttribute('action-button-label', options.action.label);

    // Subscribe to the action button click
    unsubscribeActionButtonHandler = snackbarActionButtonClickedSignal.subscribe(() => {
      options.action!.handler();

      return closeSnackbar_();
    }).unsubscribe;
  }

  let closed = false;
  const closeSnackbar_ = async () => {
    if (closed === true) return;
    logger.logMethodArgs?.(`${__package_name__}:closeSnackbar`, {options});

    await element.close();
    unsubscribeActionButtonHandler?.();
    closed = true;
  };

  // Close the last snackbar if it exists
  await closeLastSnackbar?.();
  closeLastSnackbar = closeSnackbar_;
  document.body.appendChild(element);

  // Set a timeout to close the snackbar if duration is not infinite
  if (options.duration !== -1) {
    waitForTimeout(parseDuration(options.duration)).then(closeSnackbar_);
  }
}
