import {type Options, minify} from '@swc/html';
import {logger} from './logger.js';

const swcHtmlOptions: Options = {
  forceSetHtml5Doctype: true,
  quotes: true,
  collapseWhitespaces: 'smart',
  removeEmptyMetadataElements: true,
  removeComments: true,
  preserveComments: [],
  // removeEmptyAttributes: true,
  // removeRedundantAttributes: true,
  // collapseBooleanAttributes: true,
  normalizeAttributes: true,
  minifyJs: true,
  minifyCss: true,
  sortAttributes: true,
  tagOmission: false,
  selfClosingVoidElements: true,
  sortSpaceSeparatedAttributeValues: false,
  minifyJson: true,
};

/**
 * Minify the html
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function minifyHtml(this: any, content: string): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (!this.page.outputPath?.endsWith('.html')) return content; // not doing anything

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  logger.logMethodArgs?.('minifyHtml', { path: this.page.outputPath });

  try {
    const result = await minify(content, swcHtmlOptions);
    return result.code;
  }
  catch (err) {
    logger.error('minifyHtml', 'minify_error', err);
    return content;
  }
}

/**
 * Options for the eleventyCopyFontPlugin.
 */
export type EleventyMinifyHtmlPluginOptions = {
  /**
   * The this of this.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  this: any;

  /**
   * The content for minifying by the plugin.
   */
  content: string;
};

/**
 * Eleventy plugin for minifying HTML content.
 *
 * @param eleventyConfig - The Eleventy configuration object.
 * @param options - The options for the plugin.
 *
 * @example
 * ```js
 * // eleventy.config.mjs
 *
 * import {eleventyMinifyHtmlPlugin} from '@nexim/eleventy-config';
 *
 * export default function (eleventyConfig) {
 *   eleventyConfig.addPlugin(eleventyMinifyHtmlPlugin, {content});
 *   // ...
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function eleventyMinifyHtmlPlugin(eleventyConfig: any, options: EleventyMinifyHtmlPluginOptions): void {
  // TODO: better event handling to just copy for the first time

  const minifyingHtml = minifyHtml(options.content);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  eleventyConfig.addTransform('minifyHtml', minifyingHtml);
}

