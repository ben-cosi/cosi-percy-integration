import { Builder } from 'selenium-webdriver';
import percySnapshot from '@percy/selenium-webdriver';
import fs from 'fs/promises';

const BROWSERS = ['chrome', 'firefox',  'safari'];

async function buildDriver(browser) {
  return new Builder().forBrowser(browser).build();
}

async function waitForStablePage(driver) {
  await driver.wait(async () =>
    driver.executeScript('return document.readyState').then(s => s === 'complete'), 20000);
  await driver.sleep(700);
}

async function runForBrowser(browser) {
  const driver = await buildDriver(browser);
  try {
    const content = await fs.readFile(new URL('../urls.json', import.meta.url));
    const list = JSON.parse(content.toString());

    for (const { name, url } of list) {
      console.log(`[${browser}] visiting: ${url}`);
      await driver.get(url);
      await waitForStablePage(driver);

      await percySnapshot(driver, name, {
        widths: [1600],
        minHeight: 1024
      });
      console.log(`[${browser}] snapshot: ${name}`);
    }
  } finally {
    await driver.quit();
  }
}

(async function main() {
  const arg = process.argv[2] || 'chrome';
  const targets = arg === 'all' ? BROWSERS : [arg];

  for (const browser of targets) {
    console.log(`\n=== Running in ${browser} ===`);
    await runForBrowser(browser);
  }
  console.log('\nDone.');
})();
