import type { PlaywrightCrawlingContext } from "crawlee";

type Page = PlaywrightCrawlingContext["page"];

export const selectTab = async (page: Page, name: "about" | "specs") => {
  const selector = `[data-target="#tab-${name}"]`;

  try {
    await page.waitForSelector(selector);
    await page.locator(selector).first().click();
    await page.waitForSelector(`#tab-${name}`);
  } catch (error) {
    console.log(error);
  }
};

export const parseCharacteristic = async (page: Page, name: RegExp) => {
  try {
    const rawText = await page
      .locator(".specs__item", { hasText: name })
      .first()
      .locator(".specs__val")
      .first()
      .textContent();
    
    if (isFinite(Number(rawText?.trim()))) {
      return Number(rawText?.trim())
    }
    
    return rawText?.trim();
  } catch {
    return null;
  }
};
