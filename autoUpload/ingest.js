import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'pui3ifss',
  dataset: 'production',
  useCdn: false,
  token: 'skHNCr67t3GF1TtjmsCHLAQS4FzBd9A1GKbrMtN9DWENbjDEmUp7e4Fwvfclaa9h9eSp5CF9iJtRo0qB77JJGQpapvjIBpJuQnnbwawl1jB5qI97nC8C1ON4mUD406GYfdBlTHIHTLNV8xEriRHwiRRV7QgASL7Nw53AxFAjmVVq9C50MVi9',
  apiVersion: '2024-01-01',
});

async function uploadProducts() {
  try {
    // Read the array of products from data.json
    const rawData = fs.readFileSync('./data.json', 'utf8');
    const products = JSON.parse(rawData);

    console.log(`Found ${products.length} products to upload. Starting...`);

    // Loop through and upload them one by one
    for (const product of products) {
      const res = await client.create(product);
      console.log(`✅ Uploaded: ${product.name} (ID: ${res._id})`);
    }

    console.log('🎉 All products uploaded successfully!');
  } catch (err) {
    console.error('❌ Error during upload:', err.message);
  }
}

uploadProducts();