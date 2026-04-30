import type { PlaywrightCrawlingContext } from 'crawlee'

type Page = PlaywrightCrawlingContext["page"]

export const parseCharacteristic = async (page: Page, name: RegExp) => {
    try {
        const rawText = await page
            .locator('.specs__item', { hasText: name })
            .first()
            .locator('.specs__val')
            .first()
            .textContent()
        return rawText?.trim()
    } catch {
        return null
    }
}