import { writeFileSync } from 'node:fs';
import { PlaywrightCrawler, FileDownload, type PlaywrightCrawlingContext } from 'crawlee';
import { parseCharacteristic } from './helpers.js';
import { crawlerDefault } from './config.js';

// import stealthPlugin from 'puppeteer-extra-plugin-stealth';
// import { firefox } from 'playwright-extra';
// firefox.use(stealthPlugin());

const downloadCrawler = new FileDownload({
    async requestHandler({ body, request, contentType, getKeyValueStore }) {
        const filename = request.userData.filename
            .replace(/[^a-z0-9_\.]/gi, '')

        const directory = `storage/images/${request.userData.category}/`
        writeFileSync(directory + filename + '.png', body);
    },
});


const parseWatchesPage = async (page: PlaywrightCrawlingContext["page"]) => {
    await page.locator('[data-target="#tab-about"]').first().click()
    await page.waitForSelector('.textoverflow__text')
    const description = await page.locator('.textoverflow__text').innerHTML()

    return {
        category: 'watches',
        description
    }
}


const parsePhonesPage = async (page: PlaywrightCrawlingContext["page"]) => {
    await page.locator('[data-target="#tab-specs"]').first().click()
    await page.waitForSelector('#tab-specs')

    return {
        category: 'headphones',
        description: '',
        screenSize: await parseCharacteristic(page, /Диагональ/),
        cpu: await parseCharacteristic(page, /Процессор/),
        cpuCores: await parseCharacteristic(page, /Количество ядер/),
        mainCamera: await parseCharacteristic(page, /Камера фронтальной/),
        frontCamera: await parseCharacteristic(page, /Фронтальная камера/),
        batteryCapacity: await parseCharacteristic(page, /Емкость аккумулятора/),
        screenResolution: await parseCharacteristic(page, /Разрешение экрана/),
        pixelDensity: await parseCharacteristic(page, /Плотность пикселей/),
        screenType: await parseCharacteristic(page, /Технология экрана/),
        weight: await parseCharacteristic(page, /Вес, г/),
    }
}


const parsers = {
    watch: parseWatchesPage,
    phones: parsePhonesPage
}


const crawler = new PlaywrightCrawler({
    ...crawlerDefault,
    async requestHandler({ request, page, enqueueLinks, log, pushData }) {
        if (
            page.url() !== "https://pitergsm.ru/catalog/watch/" &&
            page.url() !== "https://pitergsm.ru/catalog/phones/"
        ) {
            const label = page.url().slice('https://pitergsm.ru/catalog/'.length).split('/')[0]

            const title = await page.locator('.section__title').first().innerText()
            const raw_price = await page.locator('.product__price').first().innerText()

            const specsBrand = await page.locator('.specs__name', { hasText: "Бренд" }).first().innerText()
            const additionalData = await parsers[label](page)

            await pushData({ title, raw_price, ...additionalData }, label);

            const image = await page.locator('.prodslider__pic-img').first().getAttribute('src')

            await downloadCrawler.addRequests([
                {
                    url: 'https://pitergsm.ru' + image,
                    userData: {
                        filename: title,
                        category: label
                    }
                }
            ])
        } else {
            await enqueueLinks({
                selector: 'a.prodcard__name'
            });
        }
    }
});

await crawler.run([
    {
        url: 'https://pitergsm.ru/catalog/watch/',
        crawlDepth: 2,
    },
    {
        url: 'https://pitergsm.ru/catalog/phones/',
        crawlDepth: 2,
    }
]);

await downloadCrawler.run()