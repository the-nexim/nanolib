import {waitForAnimationFrame, waitForTimeout} from '@alwatr/wait';

import { logger } from './logger.js';

/**
 * Running code immediately after a repaint maximizes the chance that the DOM has been fully calculated.
 * This minimizes the chance that querying the DOM will cause a costly reflow.
 * If you're not querying the DOM, then this isn't something you need to worry about.
 *
 * `requestAnimationFrame` schedules code to run immediately before the repaint, which is close but not quite ideal.
 * Using `setTimeout` with a delay of 0 (or `setImmediate` on supported browsers) will execute code as soon as possible after that.
 * This approach doesn't guarantee that your code is the first to run after the repaint,
 * but it's the best you can do with the available APIs.
 *
 * @see https://stackoverflow.com/a/47184426
 */
export function waitForNextFrame(): Promise<void> {
  logger.logOther?.('waitForNextFrame');

  return new Promise((resolve) => {
    waitForAnimationFrame().then(() => {
      waitForTimeout(0).then(resolve);
    });
  });
}
