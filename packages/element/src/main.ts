import {packageTracer} from '@alwatr/package-tracer';

// Ensure only single version of this package use in the project (only check in development environment).
__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export * from './mixin/light-dom.js';
export * from './mixin/logging.js';
