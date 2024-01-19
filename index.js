import puppeteer from 'puppeteer';
import fs from 'fs'
import { lamar } from './appliedFunc.js';
import { urlpencarianss } from './carijob.js';

(async () => {


    const browser = await puppeteer.launch({ headless: true });

    const cookiesString = fs.readFileSync('cookies.json', 'utf8');
    const cookies = JSON.parse(cookiesString);
    const useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    const page = await browser.newPage();
    await page.setCookie(cookies);
    await page.setUserAgent(useragent)
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(urlpencarianss);
    console.log('menjalankan pencarian pekerjaan sesuai pencarian...');

    const jobDetails = await page.$$eval('.job-card', jobCards =>
        jobCards.map((jobCard, nomor) => {
            const no = nomor + 1
            const nama = jobCard.querySelector('.job-title.heading-large')?.innerText || ""
            const ptnya = jobCard.querySelector('.job-company')?.innerText || "";
            const link = jobCard.querySelector('a.job-link')?.href || "";
            const alamat = jobCard.querySelector('.job-location.clickable-link')?.innerText || "";
            const waktu = jobCard.querySelector('span.job-listed-date')?.innerText || "";




            return { no, nama, ptnya, alamat, link, waktu };
        })

    );

    
    fs.writeFile('ListLowongan.json', JSON.stringify(jobDetails, null, 2), err => {
        if (err) {
            console.error('Error menulis file', err);
        } else {
            console.log('List ada di ListLowongan.json');
        }
    });
    console.log('menjalankan function lamar...');
    await browser.close();
    await lamar()
})();