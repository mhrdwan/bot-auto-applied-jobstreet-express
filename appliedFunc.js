import puppeteer from 'puppeteer';
import fs from 'fs'


export async function lamar() {
    const dataBuffer = fs.readFileSync('ListLowongan.json');
    const data = JSON.parse(dataBuffer.toString());
    const browser = await puppeteer.launch({ headless: true });
    const cookiesString = fs.readFileSync('cookies.json', 'utf8');
    const cookies = JSON.parse(cookiesString);
    const useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    const page = await browser.newPage();
    await page.setCookie(cookies);
    await page.setUserAgent(useragent)
    await page.setViewport({ width: 1080, height: 1024 });


    for (let jobData of data) {
        if (jobData && jobData.link) {
            try {
                await page.goto(jobData.link);
                const selector = '#job-view > div.job-view-actions-container.top-actions-container > div > a';
                await page.waitForSelector(selector);

                const href = await page.$eval(selector, el => el.href);
                await page.goto(href);
                const buttonSelector = '#main > form > div.mt-6 > div > button';
                await page.waitForSelector(buttonSelector);
                await page.click(buttonSelector, { visible: true, timeout: 3000 });
                // await page.waitForSelector('heading-xlarge -text-center', { visible: true, timeout: 3000 })
                console.log('sukses apply di' + " " + jobData.ptnya);
            } catch (error) {
                console.log('error sudah pernah apply di' + " " + jobData.ptnya);
            }

        }

    }
    await browser.close();

}
// lamar()

