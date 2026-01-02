const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const websites = [
    { url: 'https://summitdrilling.com/', name: 'summit-drilling' },
    { url: 'https://www.aquadriveusa.com/', name: 'aquadrive' },
    { url: 'https://superbossstudio.com', name: 'superboss' },
    { url: 'https://pillarshotel.com/', name: 'pillars-hotel' },
    { url: 'https://lignecarre.com', name: 'ligne-carre' },
    { url: 'https://orilacenter.com/', name: 'orila-center' },
    { url: 'https://www.prakharpsychologicaltest.com/', name: 'psych-test' },
    { url: 'https://galefamilyremodeling.com/', name: 'gale-family' }
];

const outputDir = path.join(__dirname, 'public/images/portfolio');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    for (const site of websites) {
        console.log(`Capturing ${site.name} (${site.url})...`);
        const page = await browser.newPage();

        try {
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 60000 });

            // Wait a bit for animations/lazy loading
            await new Promise(r => setTimeout(r, 2000));

            const screenshotBuffer = await page.screenshot({ type: 'png', fullPage: false });

            const outputPath = path.join(outputDir, `${site.name}.webp`);

            await sharp(screenshotBuffer)
                .resize(1200) // Resize width to 1200px
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Saved optimized screenshot to ${outputPath}`);
        } catch (error) {
            console.error(`Failed to capture ${site.name}:`, error.message);
        } finally {
            await page.close();
        }
    }

    await browser.close();
    console.log('All done!');
})();
