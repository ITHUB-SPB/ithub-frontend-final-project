import type { PlaywrightCrawlingContext } from "crawlee";

type Page = PlaywrightCrawlingContext["page"];

export const parseCharacteristic = async (page: Page, name: RegExp) => {
  try {
    const locator = page
      .locator(".specs__item", { hasText: name })
      .first()
    
    const rawText = await locator.locator(".specs__val")
      .first()
      .allTextContents()
    
    const value = rawText?.join()?.trim() ?? null

    if (value && isFinite(Number(value))) {
      return Number(value)
    }
    
    return value
  } catch {
    return null;
  }
};
