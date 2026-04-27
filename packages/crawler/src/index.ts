import { PlaywrightCrawler, FileDownload } from 'crawlee';
import { BrowserName, DeviceCategory, OperatingSystemsName } from '@crawlee/browser-pool';
import { launchOptions } from 'camoufox-js';
import { firefox } from 'playwright';


const downloadCrawler = new FileDownload({
    async requestHandler({ body, request, contentType, getKeyValueStore }) {
        const url = new URL(request.url);
        const kvs = await getKeyValueStore();

        await kvs.setValue(url.pathname.replace(/\//g, '_'), body, { contentType: contentType.type });
    },
});

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
        if (page.url() === "https://pitergsm.ru/catalog/watch/") {
            await enqueueLinks({
                selector: 'a.prodcard__name'
            });
            return
        }

        const title = await page.locator('.section__title').first().innerText()
        const raw_price = await page.locator('.product__price').first().innerText()
        const category = await page.locator('.breadcrumbs__item').nth(2).locator('a').first().innerText()
        // const specsBrand = await page.locator('.specs__name', { hasText: "Бренд" })

        await pushData({ title, raw_price, category });

        const images = await page.locator('.prodslider__pic-img').all()

        try {
            await downloadCrawler.addRequests([
                ...images.map(image => 'https://pitergsm.ru' + image.getAttribute('src'))
            ])
        } catch (error) {
            console.error(error)
        }

        // log.info(`Title of ${request.loadedUrl} is '${title}'`);
    },
    maxRequestsPerCrawl: 10,
    headless: false,
});

await crawler.run(['https://pitergsm.ru/catalog/watch/']);
