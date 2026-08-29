import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'pui3ifss',
  dataset: 'production',
  useCdn: false,
  token:'skHNCr67t3GF1TtjmsCHLAQS4FzBd9A1GKbrMtN9DWENbjDEmUp7e4Fwvfclaa9h9eSp5CF9iJtRo0qB77JJGQpapvjIBpJuQnnbwawl1jB5qI97nC8C1ON4mUD406GYfdBlTHIHTLNV8xEriRHwiRRV7QgASL7Nw53AxFAjmVVq9C50MVi9',
  apiVersion: '2024-01-01',
});

async function uploadArticle() {
  try {
    const rawData = fs.readFileSync('./article.json', 'utf8');
    const article = JSON.parse(rawData);

    const res = await client.create(article);
    console.log(`✅ Uploaded article: ${res.title} (ID: ${res._id})`);
  } catch (err) {
    console.error('❌ Error during upload:', err.message);
  }
}

uploadArticle();