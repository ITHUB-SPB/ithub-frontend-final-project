import type { PlaywrightCrawlerOptions } from "crawlee";
import { BrowserName, DeviceCategory, OperatingSystemsName } from "@crawlee/browser-pool";
import { launchOptions } from "camoufox-js";
// import { firefox } from "playwright-extra";

export const crawlerDefault: PlaywrightCrawlerOptions = {
  // postNavigationHooks: [
  //   async ({ handleCloudflareChallenge }) => {
  //     await handleCloudflareChallenge();
  //   },
  // ],
  browserPoolOptions: {
    useFingerprints: true,
    fingerprintOptions: {
      fingerprintGeneratorOptions: {
        browsers: [
          {
            name: BrowserName.chrome,
          },
        ],
        devices: [DeviceCategory.desktop],
        operatingSystems: [OperatingSystemsName.windows],
      },
    },
  },
  // launchContext: {
  //   launcher: firefox,
  //   launchOptions: await launchOptions({
  //     headless: false,
  //   }),
  // },
  failedRequestHandler({ request, log }) {
    log.error(`Request ${request.url} failed too many times.`);
  },
  maxRequestsPerCrawl: 100,
  maxCrawlDepth: 1,
  requestHandlerTimeoutSecs: 20,
  headless: true,
};
