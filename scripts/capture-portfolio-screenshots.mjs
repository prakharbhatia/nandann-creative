import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const allProjects = [
  ['aquadrive-usa', 'https://www.aquadriveusa.com/'],
  ['ligne-carre', 'https://lignecarre.com/en'],
  ['superboss-studio', 'https://superbossstudio.com/'],
  ['prakhar-psychological-test', 'https://www.prakharpsychologicaltest.com/'],
  ['birch-house', 'https://birchhouseclub.com/'],
  ['ai-brand-exhibit', 'https://aibrandexhibit.com/'],
  ['monkbot', 'https://monkbot.app/'],
  ['prakhar-bhatia', 'https://prakharbhatia.com/']
];
const requestedSlug = process.env.CAPTURE_SLUG;
const projects = requestedSlug
  ? allProjects.filter(([slug]) => slug === requestedSlug)
  : allProjects;

if (projects.length === 0) {
  throw new Error(`Unknown CAPTURE_SLUG: ${requestedSlug}`);
}

const outputDirectory = join(process.cwd(), 'public', 'images', 'portfolio', 'live');
await mkdir(outputDirectory, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--disable-dev-shm-usage', '--no-sandbox']
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const [slug, url] of projects) {
    console.log(`Capturing ${url}`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60_000 });
    await new Promise((resolve) => setTimeout(resolve, slug === 'prakhar-bhatia' ? 4_000 : 1_000));
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.querySelectorAll('*').forEach((element) => {
        const htmlElement = element;
        htmlElement.style.animationDuration = '0s';
        htmlElement.style.animationDelay = '0s';
        htmlElement.style.transitionDuration = '0s';
      });
      window.scrollTo(0, 0);
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const screenshot = await page.screenshot({ type: 'png' });
    await sharp(screenshot)
      .resize(1280, 800, { fit: 'cover', position: 'top' })
      .webp({ quality: 78, smartSubsample: true })
      .toFile(join(outputDirectory, `${slug}.webp`));
  }
} finally {
  await browser.close();
}
