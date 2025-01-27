import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function searchUnsplashImages(query) {
  try {
    const response = await axios.get(
      `https://unsplash.com/s/photos/${encodeURIComponent(query.replace(/\s+/g, '-'))}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      }
    );

    const $ = cheerio.load(response.data);
    const images = [];
    
    $('img[srcset]').each((_, element) => {
      const srcset = $(element).attr('srcset');
      if (srcset) {
        const urls = srcset.split(',')
          .map(src => src.trim().split(' ')[0])
          .filter(url => url.startsWith('https://') && url.includes('unsplash.com'));
        
        if (urls.length > 0) {
          images.push(urls[0]); // Use smaller image from srcset
        }
      }
    });

    return images;
  } catch (error) {
    console.error('Error searching Unsplash images:', error);
    return [];
  }
}

async function downloadImage(url, outputPath) {
  try {
    const response = await axios({
      url,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, Buffer.from(response.data));
    return true;
  } catch (error) {
    console.error('Error downloading image:', error);
    return false;
  }
}

function generatePlaceholderImage(outputPath, text) {
  const svg = `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

  try {
    fs.writeFileSync(outputPath, svg);
    return true;
  } catch (error) {
    console.error('Error creating placeholder image:', error);
    return false;
  }
}

export async function fetchAndSaveImages(config, outputDir) {
  const searchQueries = [
    `${config.industry} business`,
    `${config.industry} professional`,
    `${config.industry} team`,
    `${config.industry} office`,
    `${config.industry} work`
  ];

  const savedImages = [];
  const imagesDir = path.join(outputDir, 'images');
  fs.mkdirSync(imagesDir, { recursive: true });

  for (let i = 0; i < searchQueries.length; i++) {
    if (savedImages.length >= 5) break;

    const images = await searchUnsplashImages(searchQueries[i]);
    
    for (const imageUrl of images) {
      if (savedImages.length >= 5) break;

      const imagePath = `images/image-${savedImages.length + 1}-${Date.now()}.jpg`;
      const fullImagePath = path.join(outputDir, imagePath);

      const success = await downloadImage(imageUrl, fullImagePath);
      if (success) {
        savedImages.push(imagePath);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  // Create placeholder images if needed
  while (savedImages.length < 5) {
    const placeholderPath = `images/placeholder-${savedImages.length + 1}.svg`;
    const fullPlaceholderPath = path.join(outputDir, placeholderPath);
    
    const placeholderText = `${config.companyName} - ${config.industry}`;
    const success = generatePlaceholderImage(fullPlaceholderPath, placeholderText);
    
    if (success) {
      savedImages.push(placeholderPath);
    }
  }

  return savedImages;
}
