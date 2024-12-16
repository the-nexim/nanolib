import {packageTracer} from '@alwatr/package-tracer';

// Ensure only single version of this package use in the project (only check in development environment).
__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export * from './lib/service-worker-notify.js';
export * from './lib/service-worker.js';
export * from './lib/install-pwa.js';
