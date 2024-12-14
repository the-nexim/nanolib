import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';
import {waitForAnimationFrame, waitForTimeout} from '@alwatr/wait';

/**
 * Add package tracer for development mode.
 * @private
 */
__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Logger instance for the snackbar package.
 * @const
 */
const logger = /* @__PURE__ */ createLogger(__package_name__);

/**
 * Waits for the next frame to ensure the DOM has been fully calculated.
 * This minimizes the chance that querying the DOM will cause a costly reflow.
 *
 * This function uses `requestAnimationFrame` to schedule code to run immediately before the repaint,
 * followed by `setTimeout` with a delay of 0 to execute code as soon as possible after the repaint.
 *
 * @returns {Promise<void>} A promise that resolves after the next frame.
 *
 * @see https://stackoverflow.com/a/47184426
 */
export function waitForNextFrame(): Promise<void> {
  logger.logOther?.(`${__package_name__}:waitForNextFrame`);

  return new Promise((resolve) => {
    waitForAnimationFrame().then(() => {
      waitForTimeout(0).then(resolve);
    });
  });
}
