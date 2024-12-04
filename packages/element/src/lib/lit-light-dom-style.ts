import {logger} from './logger.js';

import type {CSSResultGroup, ReactiveElement} from 'lit';

function flatCssText(styles?: CSSResultGroup): string {
  logger.logMethod?.('flatCssText');

  if (styles === undefined) return '';
  if ('cssText' in styles) return styles.cssText.trim();
  if (Array.isArray(styles)) {
    return styles
      .map((style) => ('cssText' in style ? style.cssText : flatCssText(style)))
      .join('\n')
      .trim();
  }
  return '';
}

export function lightDomStyles(tagName: string, element: typeof ReactiveElement): void {
  const className = `${tagName}-light-dom-style`;
  if (document.querySelector(`style.${className}`) !== null) return;

  const cssText = flatCssText(element.styles);
  if (cssText === '') return;
  logger.logMethodArgs?.('lightDomStyles', {tagName});

  const styleEl = document.createElement('style');
  styleEl.classList.add(className);
  styleEl.innerHTML = cssText;
  document.head.append(styleEl);
}
