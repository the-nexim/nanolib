import { createLogger } from '@alwatr/logger';

/**
 * Logger instance for the snackbar package.
 * @const
 */
export const logger = /* @__PURE__ */ createLogger(__package_name__);

export * from './lib/element.js';
export * from './lib/signal.js';
