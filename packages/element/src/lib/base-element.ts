import {LitElement} from 'lit';

import {LightDomMixin} from '../mixin/light-dom.js';
import {LoggerMixin} from '../mixin/logging.js';

export const BaseElement = LightDomMixin(LoggerMixin(LitElement));
