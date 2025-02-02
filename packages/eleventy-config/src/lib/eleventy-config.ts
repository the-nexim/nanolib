/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import directoryOutputPlugin from '@11ty/eleventy-plugin-directory-output';
import { generateServiceWorker } from './workbox.js';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import { minifyHtml } from './minify-html.js';
import { postcssBuild } from './postcss.js';
import { trim } from './util/trim.js';

type EleventyOptions = {
  directories: {
    root: string;
    shortcode: string;
    style: string;
    jsOutput: string;
    output: string;
    data: string;
    layouts: string;
    includes: string;
  };
  files: {
    baseFileName: string;
    templateFormats?: string[];
    markDownTemplateEngine: string;
    htmlTemplateEngine: string;
  }
};

/**
 * Configures Eleventy with nexim app specification and html minify, postcss, workbox, etc.
 *
 * @param eleventyConfig - The eleventy config
 * @returns The eleventyConfig return type
 *
 * @see https://www.11ty.dev/docs/config/
 * @see https://www.11ty.dev/docs/config-shapes/#optional-return-object
 *
 * @example
 * ```
 * import {eleventyConfiguration} from '@nexim/eleventy-config';
 *
 * export default function (eleventyConfig) {
 *   return eleventyConfiguration(eleventyConfig,{
 *    directories: {
 *     root: 'site',
 *     shortcode: 'shortcode',
 *     style: 'style',
 *     jsOutput: 'dist/es',
 *     output: 'dist',
 *     data: '_data',
 *     layouts: '_layout',
 *     includes: '_include',
 *    },
 *    files: {
 *      baseFileName: 'index',
 *     // optional
 *     // have default value ['md', 'njk', '11ty.js'],
 *      templateFormatsExtensions: [],
 *      markDownTemplateEngine: 'md',
 *      htmlTemplateEngine: 'njk',
 *    });
 * }
 * ```
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function eleventyConfiguration(eleventyConfig: any,options: EleventyOptions) {
  eleventyConfig.addPassthroughCopy({
    assets: '/',
    'assets/img/meta/favicon.ico': '/favicon.ico',
  });

  // templates root Directory
  eleventyConfig.addWatchTarget(options.directories.root);

  // shortcodes Directory
  eleventyConfig.addWatchTarget(options.directories.shortcode);

  // styles Directory
  eleventyConfig.addWatchTarget(options.directories.style);

  // build target typescript Directory
  eleventyConfig.addWatchTarget(options.directories.jsOutput);

  /**
   * Watch javascript dependencies
   */
  eleventyConfig.setWatchJavaScriptDependencies(true);

  /**
   * Set markdown parser
   */
  const markdownLibrary = markdownIt({ html: true, breaks: true, linkify: true })
    .use(markdownItAttrs) // required for enter manual set id for header
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(), // this can change create link mode
      level: 2, // apply to h2, h3 and ...., don't apply to h1
      tabIndex: false,
      // slugify: slugify, // this slugify convert persian to english so must set custom slugify
    });
  eleventyConfig.setLibrary('md', markdownLibrary);

  /**
   * Simple trim filter
   */
  eleventyConfig.addFilter('trim', trim);

  /**
   * Pretty log the outputs plugin after build success
   */
  eleventyConfig.addPlugin(directoryOutputPlugin, {
    columns: {
      filesize: true,
      benchmark: true,
    },
    warningFileSize: 400 * 1000,
  });

  /**
   * Transform Minify Html and Trim methods
   */
  eleventyConfig.addTransform('minifyHtml', minifyHtml);
  eleventyConfig.addTransform('trim', trim);

  /**
   * Set after eventListener for build css and service worker
   */
  const configureBuilding = postcssBuild({inputDir: options.directories.style, outputDir: options.directories.output + '/css'});
  eleventyConfig.on('eleventy.after', configureBuilding);

  const generateServiceWorkerWithOptions = generateServiceWorker({
    outputDir: options.directories.output,
    deploymentServiceWorkerContent: "console.log('service worker not build in deployment.')",
    nameOfServiceWorker: 'service-worker.js',
    maximumFileSize: 1 * 1024 * 1024, // 1MB
    mode: 'production',
  });
  eleventyConfig.on('eleventy.after', generateServiceWorkerWithOptions);

  /**
   * Add template cjs to extension
   */
  eleventyConfig.addExtension('template.cjs', { key: '11ty.js' });

  /**
   * Set data root directory and base name of file
   */
  eleventyConfig.setDataFileSuffixes([ '.data' ]);
  eleventyConfig.setDataFileBaseName(options.files.baseFileName);

  /**
   * Add Html, Nunjucks, Markdown, Tsx, Jsx, for template engines
   */
  eleventyConfig.templateFormats = [ 'md', 'njk', '11ty.js', ...(options.files.templateFormats ?? []) ];

  return {
    // if your site lives in a subdirectory, change this
    pathPrefix: '/',
    markdownTemplateEngine: options.files.markDownTemplateEngine,
    htmlTemplateEngine: options.files.htmlTemplateEngine,

    handlebarsHelpers: {},
    nunjucksFilters: {},

    // "index" will look for `directory/index.*` directory data files instead of `directory/directory.*`
    dataFileDirBaseNameOverride: false,

    keys: {
      package: 'pkg',
      layout: 'layout',
      permalink: 'permalink',
      permalinkRoot: 'permalinkBypassOutputDir',
      engineOverride: 'templateEngineOverride',
      computed: 'eleventyComputed',
    },

    dir: {
      data: options.directories.data,
      input: options.directories.root,
      output: options.directories.output,
      layouts: options.directories.layouts,
      includes: options.directories.includes,
    },
  };
}
