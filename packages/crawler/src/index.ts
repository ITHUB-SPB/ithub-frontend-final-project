import { writeFileSync, appendFileSync } from "node:fs";
import { PlaywrightCrawler, FileDownload, type PlaywrightCrawlingContext } from "crawlee";
import { parseCharacteristic } from "./helpers.js";
import { crawlerDefault } from "./config.js";

// import stealthPlugin from 'puppeteer-extra-plugin-stealth';
// import { firefox } from 'playwright-extra';
// firefox.use(stealthPlugin());

const downloadCrawler = new FileDownload({
  async requestHandler({ body, request, contentType, getKeyValueStore }) {
    const filename = request.userData.filename.trim().replace(/[^а-яa-z0-9_\.]/gi, "_");

    const directory = `storage/images/${request.userData.category}/`;
    const filepath = directory + filename + ".png"

    writeFileSync(filepath, body);
    appendFileSync('storage/images/meta.txt', `${request.userData.title}=${filepath}\n`);
  },
});

const parseWatchesPage = async (page: PlaywrightCrawlingContext["page"]) => {
  // await page.waitForSelector('#tab-about');
  const description = await page.locator(".textoverflow__text").first().innerHTML() ?? null;
  // await page.waitForSelector('#tab-specs');

  const compatibility = await parseCharacteristic(page, /Совместимость/)
  const batteryCapacity = await parseCharacteristic(page, /Емкость аккумулятора/)
  const brand = await parseCharacteristic(page, /Бренд/)
  const screenResolution = await parseCharacteristic(page, /Разрешение экрана/)
  const bluetooth = await parseCharacteristic(page, /Bluetooth/)
  const navigation = await parseCharacteristic(page, /Системы навигации/)

  return {
    category: "watch",
    description,
    compatibility,
    batteryCapacity,
    brand,
    screenResolution,
    bluetooth,
    navigation,
  };
};

const parsePhonesPage = async (page: PlaywrightCrawlingContext["page"]) => {
  // await page.waitForSelector('#tab-about');
  const description = await page.locator(".textoverflow__text").first().innerHTML() ?? null;
  // await page.waitForSelector('#tab-specs');

  const screenSize = await parseCharacteristic(page, /Диагональ/)
  const cpu = await parseCharacteristic(page, /Процессор/)
  const cpuCores = await parseCharacteristic(page, /Количество ядер/)
  const mainCamera = await parseCharacteristic(page, /Камера фронтальной/)
  const frontCamera = await parseCharacteristic(page, /Фронтальная камера/)
  const batteryCapacity = await parseCharacteristic(page, /Емкость аккумулятора/)
  const screenResolution = await parseCharacteristic(page, /Разрешение экрана/)
  const pixelDensity = await parseCharacteristic(page, /Плотность пикселей/)
  const screenType = await parseCharacteristic(page, /Технология экрана/)
  const weight = await parseCharacteristic(page, /Вес, г/)
  const brand = await parseCharacteristic(page, /Бренд/)

  return {
    category: "phones",
    description,
    screenSize,
    cpu,
    brand,
    cpuCores,
    mainCamera,
    frontCamera,
    batteryCapacity,
    screenResolution,
    pixelDensity,
    screenType,
    weight,
  };
};

const parsers = {
  watch: parseWatchesPage,
  phones: parsePhonesPage,
} as const;

const crawler = new PlaywrightCrawler({
  ...crawlerDefault,
  async requestHandler({ request, page, enqueueLinks, log, pushData }) {
    if (
      page.url() !== "https://pitergsm.ru/catalog/watch/" &&
      page.url() !== "https://pitergsm.ru/catalog/phones/" &&
      !(page.url().includes('PAGEN'))
    ) {
      await page.waitForTimeout(10000)

      const label = page.url().slice("https://pitergsm.ru/catalog/".length).split("/")[0];

      const title = await page.locator(".section__title").first().innerText();

      const rawPrice = await page.locator(".product__price")
        .first()
        .innerText()

      const additionalData = ['watch', 'phones'].includes(label)
        ? await parsers[label](page)
        : {};

      await pushData({
        title,
        rawPrice: Number(
          rawPrice
            .slice(0, rawPrice.lastIndexOf(' ') - 1)
            .replace(/ /, '')
        ),
        ...additionalData
      }, label);

      const imageSelector = await page.waitForSelector('img.prodslider__pic-img')
      const image = await imageSelector.getAttribute("src");

      await downloadCrawler.addRequests([
        {
          url: "https://pitergsm.ru" + image,
          userData: {
            title,
            filename: title,
            category: label,
          },
        },
      ]);
    } else {
      await enqueueLinks({
        selector: "a.prodcard__name",
      });
    }
  },
});

// await crawler.run([
//   {
//     url: "https://pitergsm.ru/catalog/watch/",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=2",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=3",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=4",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=5",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=6",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=7",
//     maxRetries: 1,
//   },
//   {
//     url: "https://pitergsm.ru/catalog/watch/?PAGEN_2=8",
//     maxRetries: 1,
//   },
// ]);

// await downloadCrawler.run();

await crawler.run([
  {
    url: "https://pitergsm.ru/catalog/phones/",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=2",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=3",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=4",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=5",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=6",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=7",
    maxRetries: 1,
  },
  {
    url: "https://pitergsm.ru/catalog/phones/?PAGEN_2=8",
    maxRetries: 1,
  }
]);

await downloadCrawler.run();
