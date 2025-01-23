import { cp, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { createRequire } from 'node:module';
import { logger } from './logger.js';

// TODO: handle in cjs
const require = /* @__PURE__ */ createRequire(import.meta.url);

/**
 * Copies a font from the `@alwatr/font` package to the specified output directory.
 *
 * @param fontName - The name of the font to copy.
 * @param outputDirectory - The directory where the font should be copied.
 *
 * @example
 * ```typescript
 * await copyFont('vazirmatn', 'dist/font');
 * ```
 */
export async function copyFont(fontName: string, outputDirectory: string): Promise<void> {
  logger.logMethodArgs?.('copyFont', { fontName, outputDirectory });

  const resolvedOutputDirectory = join(outputDirectory, fontName);
  await mkdir(resolvedOutputDirectory, { recursive: true });

  // Generate npm package font path directory
  let fontPath = require.resolve('@alwatr/font');
  fontPath = dirname(fontPath);
  fontPath = join(fontPath, fontName);

  await cp(fontPath, resolvedOutputDirectory, { recursive: true, preserveTimestamps: true, force: true });

  logger.logStep?.('copyFont', `${fontName} copy to output directory.`, { resolvedOutputDirectory });
}

/**
 * Options for the eleventyCopyFontPlugin.
 */
export type EleventyCopyFontPluginOptions = {
  /**
   * The name of the font to copy.
   */
  fontName: string;

  /**
   * The directory where the font should be copied.
   */
  outputDirectory?: string;
};

/**
 * Eleventy plugin to copy a font before the build process.
 *
 * @param eleventyConfig - The Eleventy configuration object.
 * @param options - The options for the plugin.
 *
 * @example
 * ```js
 * // eleventy.config.mjs
 *
 * import {eleventyCopyFontPlugin} from '@nexim/eleventy-config';
 *
 * export default function (eleventyConfig) {
 *   eleventyConfig.addPlugin(eleventyCopyFontPlugin, {fontName: 'vazirmatn'});
 *   // ...
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function eleventyCopyFontPlugin(eleventyConfig: any, options: EleventyCopyFontPluginOptions): void {
  // TODO: better event handling to just copy for the first time

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  eleventyConfig.on('eleventy.before', async () => {
    options.outputDirectory ??= 'dist/font';
    await copyFont(options.fontName, options.outputDirectory);
  });
}
