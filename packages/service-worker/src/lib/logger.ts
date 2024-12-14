import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add('common/service-worker', __package_version__);
export const logger = /* @__PURE__ */ createLogger('common/service-worker');
