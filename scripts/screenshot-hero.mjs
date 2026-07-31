import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:4173";
const outPrefix = process.argv[3] ?? "hero";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 820, height: 1300 },
  { name: "mobile", width: 390, height: 1300 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `.playwright-shots/${outPrefix}-${vp.name}.png`, fullPage: false });
  await page.close();
}
await browser.close();
console.log("done");
