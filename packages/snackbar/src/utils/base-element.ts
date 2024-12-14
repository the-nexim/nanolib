import {LightDomMixin, LoggerMixin} from '@nexim/element';
import {LitElement} from 'lit';

export const BaseElement = LightDomMixin(LoggerMixin(LitElement));
