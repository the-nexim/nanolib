import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

/**
 * Add package tracer for development mode.
 * @private
 */
__dev_mode__: packageTracer.add(__package_name__, __package_version__);

/**
 * Logger instance for the snackbar package.
 * @const
 */
export const logger = /* @__PURE__ */ createLogger(__package_name__);
