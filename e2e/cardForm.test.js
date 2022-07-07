import puppeteer from 'puppeteer';

jest.setTimeout(20000);

describe('card form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8888';
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('correct card nubmer input', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.card-form');
    const input = await form.$('input');
    await input.type('371449635398431');

    await page.waitForSelector('[data-ps="American Express"].card-active');
  });

  test('uncorrect card nubmer input', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.card-form');
    const input = await form.$('input');
    await input.type('37144963539843');

    await page.waitForSelector('[data-ps="American Express"].card-active');
    await page.waitForSelector('button[disabled]');
  });
});
