/**
 * ArkAuto Product Image Fetcher
 * This script automates finding product images for 1,989 products.
 * Use with an API key from Serper.dev (recommended) or similar.
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// CONFIGURATION
const SERPER_API_KEY = 'YOUR_SERPER_API_KEY'; // Get a free one at serper.dev
const DATA_PATH = path.join(__dirname, '../Allproducts.xls');
const OUTPUT_PATH = path.join(__dirname, '../src/data/products.ts');
const SLEEP_MS = 1000; // Be nice to the API

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchImageFromSerper(query) {
    if (SERPER_API_KEY === 'YOUR_SERPER_API_KEY') {
        // Fallback placeholder if no API key is provided
        return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop';
    }

    try {
        const response = await fetch("https://google.serper.dev/images", {
            method: 'POST',
            headers: {
                'X-API-KEY': SERPER_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ q: query, num: 1 })
        });
        const data = await response.json();
        return data.images?.[0]?.imageUrl || null;
    } catch (err) {
        console.error(`Error searching for ${query}:`, err.message);
        return null;
    }
}

async function run() {
    console.log('🚀 Loading product data...');
    const workbook = XLSX.readFile(DATA_PATH);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    console.log(`📦 Found ${data.length} products. Starting image search...`);

    const products = [];

    // For demonstration, let's process the first 50 or allow the user to run full
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rawCode = String(row['Code'] || '');
        const desc = String(row['Description'] || '');
        const brand = String(row['__EMPTY_1'] || 'Generic');

        // Extract a clean searchable term
        // Priority: Description first as it has name + codes
        const searchQuery = `${brand} ${desc}`.replace(/,/g, '');

        console.log(`[${i + 1}/${data.length}] Searching for: ${searchQuery}`);

        let imageUrl = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop';

        if (SERPER_API_KEY !== 'YOUR_SERPER_API_KEY') {
            const foundUrl = await fetchImageFromSerper(searchQuery);
            if (foundUrl) imageUrl = foundUrl;
            await sleep(SLEEP_MS);
        }

        // Re-construct the product object matching our previous parser
        const makes = ['TOYOTA', 'HONDA', 'FORD', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'KIA', 'VOLKSWAGEN', 'BMW', 'MERCEDES', 'AUDI', 'LEXUS', 'MAZDA', 'SUBARU', 'JEEP'];
        const foundMakes = makes.filter(m => desc.toUpperCase().includes(m));

        const oemMatch = desc.match(/[A-Z0-9.\-]{5,}/g) || [];

        products.push({
            id: `PROD-${1000 + i}`,
            name: desc,
            category: String(row['__EMPTY'] || 'General'),
            price: row['Selling Price'] || 0,
            image: imageUrl,
            description: desc,
            rating: 4.5,
            reviews: 12,
            stock: row['Quantity'] || 0,
            partNumber: rawCode,
            oemNumber: oemMatch[0] || '',
            brand: brand,
            compatibility: foundMakes.length > 0 ? foundMakes : ['Universal']
        });

        // Save progress every 50 items
        if (i % 50 === 0 && i > 0) {
            writeOutput(products);
            console.log(`💾 Progress saved at ${i} items.`);
        }
    }

    writeOutput(products);
    console.log('✅ Task Complete!');
}

function writeOutput(products) {
    const content = `// Auto-generated Product Data with Scraped Images
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    stock: number;
    partNumber: string;
    oemNumber: string;
    brand: string;
    compatibility: string[];
}

export const productsByPartNumber: { [key: string]: Product } = {};

export const products: Product[] = ${JSON.stringify(products, null, 4)};

products.forEach(p => {
    if (p.partNumber) productsByPartNumber[p.partNumber] = p;
    if (p.oemNumber) productsByPartNumber[p.oemNumber] = p;
});
`;
    fs.writeFileSync(OUTPUT_PATH, content);
}

run();
