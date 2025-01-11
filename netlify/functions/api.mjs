import express, { Router } from "express";
import serverless from "serverless-http";
import puppeteer from "puppeteer";

const app = express();
const router = Router();

router.get("/", async (req, res) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH,
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const screenshot = await page.screenshot({ type: "png" });
  await browser.close();
  res.setHeader("Content-Type", "image/png");
  res.send(screenshot);
});

app.use("/", router);

export const handler = serverless(app);