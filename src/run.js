import { Builder } from 'selenium-webdriver';
import percySnapshot from '@percy/selenium-webdriver';
import fs from 'fs/promises';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import edge from 'selenium-webdriver/edge.js';

const BROWSERS = ['chrome', 'firefox', 'MicrosoftEdge', 'safari'];
const IS_CI = process.env.CI === 'true';

async function buildDriver(browser) {
  switch (browser) {
    case 'chrome': {
      const opts = new chrome.Options();
      if (IS_CI) opts.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
      return new Builder().forBrowser('chrome').setChromeOptions(opts).build();
    }
    case 'firefox': {
      const opts = new firefox.Options();
      if (IS_CI) opts.addArguments('-headless');
      return new Builder().forBrowser('firefox').setFirefoxOptions(opts).build();
    }
    case 'MicrosoftEdge': {
      const opts = new edge.Options();
      if (IS_CI) opts.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
      return new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(opts).build();
    }
    case 'safari': {
      // Safari has no headless mode. Works on macOS runner.
      return new Builder().forBrowser('safari').build();
    }
    default:
      throw new Error(`Unsupported browser: ${browser}`);
  }
}