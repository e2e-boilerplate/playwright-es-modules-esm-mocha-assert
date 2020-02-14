import puppeteer from "puppeteer";
import { strictEqual } from "assert";

let page;
let browser;

describe("google search", () => {
  before(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false });

    page = await browser.newPage();

    await page
      .goto("https://e2e-boilerplates.github.io/sandbox/", { waitUntil: "networkidle0" })
      .catch(() => {});
  });

  after(() => {
    if (!page.isClosed()) {
      browser.close();
    }
  });

  it("should be on google search page", async () => {
    await page.waitFor("h1");
    const title = await page.$eval("h1", el => el.textContent);

    strictEqual(await page.title(), "Sandbox");
    strictEqual(title, "Sandbox");
  });
});
