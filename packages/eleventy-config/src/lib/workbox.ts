import { type BuildResult, generateSW } from 'workbox-build';
import { logger } from './logger.js';
import { platformInfo } from '@alwatr/platform-info';
import { writeFile } from 'fs/promises';

export async function generateServiceWorker(options:
{
  outputDir: string,
  deploymentServiceWorkerContent: string,
  nameOfServiceWorker: string,
  maximumFileSize: number,
  mode: 'production' | 'development',
}
): Promise<BuildResult | null> {
  const isDevelopment = platformInfo.development;
  logger.logMethodArgs?.('generateServiceWorker', { isDevelopment });

  if (isDevelopment) {
    await writeFile(options.outputDir + options.nameOfServiceWorker, options.deploymentServiceWorkerContent);
    return null;
  }

  const buildResult = await generateSW({
    globDirectory: options.outputDir,
    maximumFileSizeToCacheInBytes: options.maximumFileSize,
    cleanupOutdatedCaches: true,
    inlineWorkboxRuntime: false,
    clientsClaim: true,
    skipWaiting: true,
    globPatterns: [ '**/*.{woff,woff2,js,css,webmanifest,html}', 'index.html', 'favicon.ico' ],
    swDest: options.outputDir + options.nameOfServiceWorker,
    sourcemap: false,
    mode: options.mode,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 2 * 30 * 24 * 60 * 60, // 2 Months
          },
        },
      },
      {
        urlPattern: /\.(?:m4a|mp3)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'sounds',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 2 * 30 * 24 * 60 * 60, // 2 Months
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|json)(\?.*)?$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'resources',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 2 * 30 * 24 * 60 * 60, // 2 Months
          },
        },
      },
    ],
  });

  const preCacheSize = String(Math.floor(buildResult.size / 1024));
  const count = String(buildResult.count);

  logger.logOther?.(`Generated a service worker, which will pre-cache ${count} files, totaling ${preCacheSize}kb.`);
  return buildResult;
}

/**
 * Options for the eleventyCopyFontPlugin.
 */
export type EleventyWorkBoxPluginOptions = {
  /**
   * The output directory for the service worker.
   */
  outputDir: string;

  /**
   * The content for the deployment service worker.
   */
  deploymentServiceWorkerContent: string,

  /**
   * The name of the service worker.
   */
  nameOfServiceWorker: string,

  /**
   * The maximum file size for the service worker.
   */
  maximumFileSize: number,

  /**
   * The mode for the service worker.
   */
  mode: 'production' | 'development',
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
 * import {eleventyWorkBoxPlugin} from '@nexim/eleventy-config';
 *
 * export default function (eleventyConfig) {
 *   eleventyConfig.addPlugin(eleventyWorkBoxPlugin, {
 *    outputDir: 'dist',
 *    deploymentServiceWorkerContent: "console.log('service worker not build in deployment.')",
 *    nameOfServiceWorker: 'service-worker.js',
 *    maximumFileSize: 1 * 1024 * 1024, // 1MB,
 *    mode: 'production',
 *  });
 *   // ...
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function eleventyWorkBoxPlugin(eleventyConfig: any, options: EleventyWorkBoxPluginOptions): void {
  // TODO: better event handling to just copy for the first time

  const generateServiceWorkerWithOptions = generateServiceWorker({
    outputDir: options.outputDir,
    deploymentServiceWorkerContent: options.deploymentServiceWorkerContent,
    nameOfServiceWorker: options.nameOfServiceWorker,
    maximumFileSize: options.maximumFileSize,
    mode: options.mode,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  eleventyConfig.on('eleventy.after', generateServiceWorkerWithOptions);
}
