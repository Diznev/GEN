import { fakerDE, fakerEN } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import archiver from 'archiver';
import { fetchAndSaveImages } from './imageService.js';
import { generateContent } from './contentGenerator.js';

export async function generateWebsite(config) {
  try {
    const outputDir = path.join(process.cwd(), config.domain);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'images'), { recursive: true });
    fs.mkdirSync(path.join(outputDir, 'css'), { recursive: true });
    
    const pages = ['index', 'about', 'privacy', 'payment', 'contact'];
    const selectedFaker = config.language === 'German' ? fakerDE : fakerEN;
    const images = await fetchAndSaveImages(config, outputDir);
    
    // Copy CSS file
    const cssSource = path.join(process.cwd(), 'public', 'css', 'style.css');
    const cssDest = path.join(outputDir, 'css', 'style.css');
    fs.copyFileSync(cssSource, cssDest);
    
    for (const page of pages) {
      const content = generateContent(page, config, images, selectedFaker);
      const templatePath = path.join(process.cwd(), 'templates', 'pages', `${page}.ejs`);
      const layoutPath = path.join(process.cwd(), 'templates', 'layouts', 'main.ejs');
      
      const pageContent = await ejs.renderFile(templatePath, { config, content });
      const html = await ejs.renderFile(layoutPath, {
        config,
        content,
        body: pageContent
      });
      
      fs.writeFileSync(
        path.join(outputDir, `${page}.html`),
        html,
        'utf-8'
      );
    }
    
    await createZipArchive(config.domain);
    console.log(`Website generated successfully at ${outputDir}`);
    
  } catch (error) {
    console.error('Error generating website:', error);
    throw error;
  }
}

async function createZipArchive(domain) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(`${domain}.zip`);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => resolve());
    archive.on('error', err => reject(err));
    
    archive.pipe(output);
    archive.directory(domain, false);
    archive.finalize();
  });
}
