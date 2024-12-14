import {LightDomMixin, LoggerMixin} from '@nexim/element';
import {LitElement} from 'lit';

/**
 * Base element class that includes Light DOM and Logger mixins.
 * @class
 * @extends {LitElement}
 */
export const BaseElement = LightDomMixin(LoggerMixin(LitElement));
