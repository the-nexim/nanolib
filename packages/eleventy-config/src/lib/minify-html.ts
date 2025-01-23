import { type Options, minify } from '@swc/html';

import { logger } from './logger.js';

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
