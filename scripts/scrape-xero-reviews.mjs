import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("https://apps.xero.com/app/the-portal-genie", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await page.waitForTimeout(5000);
await page.getByText("View all reviews").first().click();
await page.waitForTimeout(3000);

const nextButton = page.locator('nav[aria-label="Pagination"]').getByRole("button").last();
if (await nextButton.count()) {
  await nextButton.click();
  await page.waitForTimeout(2000);
}

const text = await page.evaluate(() => document.body.innerText);
const start = text.indexOf("Most recent reviews");
const end = text.indexOf("Although Xero reviews");
console.log(text.slice(start, end > start ? end : undefined));

await browser.close();
