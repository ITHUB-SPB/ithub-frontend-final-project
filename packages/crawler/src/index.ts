import { PlaywrightCrawler } from 'crawlee';
import { BrowserName, DeviceCategory, OperatingSystemsName } from '@crawlee/browser-pool';
import { launchOptions } from 'camoufox-js';
import { firefox } from 'playwright';


const crawler = new PlaywrightCrawler({
    postNavigationHooks: [
        async ({ handleCloudflareChallenge }) => {
            await handleCloudflareChallenge();
        },
    ],
    browserPoolOptions: {
        useFingerprints: true,
        fingerprintOptions: {
            fingerprintGeneratorOptions: {
                browsers: [
                    {
                        name: BrowserName.firefox,
                        minVersion: 96,
                    },
                ],
                devices: [DeviceCategory.desktop],
                operatingSystems: [OperatingSystemsName.windows],
            },
        },
    },
    launchContext: {
        launcher: firefox,
        launchOptions: await launchOptions({
            headless: true,
        }),
    },
    async requestHandler({ request, page, enqueueLinks, log, pushData }) {
        const title = await page.title();

        if (!page.url().includes("https://pitergsm.ru/catalog/watch/")) {
            return
        }

        await enqueueLinks({
            // globs: ['https://www.mvideo.ru/products/smart-chasy-*'],
            selector: 'a.prodcard__name'
        });

        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        // await pushData({ title, url: request.loadedUrl });

    },
    maxRequestsPerCrawl: 10,
    headless: false,
});

await crawler.run(['https://pitergsm.ru/catalog/watch/']);
