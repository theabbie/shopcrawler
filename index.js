const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const screenshot = await page.screenshot({ type: 'png' });
  await browser.close();
  res.setHeader('Content-Type', 'image/png');
  res.send(screenshot);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});