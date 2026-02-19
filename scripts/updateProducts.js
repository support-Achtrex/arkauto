const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = XLSX.readFile(path.join(__dirname, '../Allproducts.xls'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

function cleanString(str) {
    if (typeof str !== 'string') return String(str || '');
    return str.trim();
}

// Visual mapping for categories/parts to high-end automotive photography
const categoryImages = {
    'BRAKE PAD': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
    'OIL FILTER': 'https://images.unsplash.com/photo-1590515136814-118833924151?q=80&w=800&auto=format&fit=crop',
    'AIR FILTER': 'https://images.unsplash.com/photo-1635773100239-d37012480674?q=80&w=800&auto=format&fit=crop',
    'CABIN': 'https://images.unsplash.com/photo-1635773100239-d37012480674?q=80&w=800&auto=format&fit=crop',
    'CVT': 'https://images.unsplash.com/photo-1621939514649-280e2ee9d3d0?q=80&w=800&auto=format&fit=crop',
    'BRAKE DISC': 'https://images.unsplash.com/photo-1549410141-86f78f658055?q=80&w=800&auto=format&fit=crop',
    'FUEL PUMP': 'https://images.unsplash.com/photo-1605164599901-f89016e1af72?q=80&w=800&auto=format&fit=crop',
    'SPARK PLUG': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'
};

const products = data.map((row, index) => {
    const code = cleanString(row['Code']);
    const desc = cleanString(row['Description']);
    const rawCategory = cleanString(row['__EMPTY']).toUpperCase() || 'GENERAL';
    const brand = cleanString(row['__EMPTY_1']) || 'Generic';
    const sellingPrice = row['Selling Price'] || 0;
    const quantity = row['Quantity'] || 0;

    // Normalize Category
    let normalizedCategory = rawCategory;
    if (rawCategory.includes('FILETR') || rawCategory.includes('FILETER')) {
        normalizedCategory = rawCategory.replace('FILETR', 'FILTER').replace('FILETER', 'FILTER');
    }

    // Advanced Part Number Extraction
    // Split by comma, then space
    const segments = desc.split(/[, ]+/).filter(s => s.length > 2);
    const allCodes = segments.filter(s => /[0-9]/.test(s) && !/^[A-Z]{5,}$/.test(s)); // Must have numbers and not be just a word like 'FRONT'

    // Better Patterns for Manufacturers
    const patterns = {
        centric: /[0-9]{3}\.[0-9]{5}/,
        oemMercedes: /^[AB][0-9]{10}/, // Often starts with A or B
        oemVAG: /^[0-9A-Z]{3}[0-9]{3}[0-9A-Z]{3}/, // VW, Audi, Seat, Skoda
        oemToyota: /^[0-9]{5}-[0-9]{5}/,
        oemBMW: /^[0-9]{11}$|^[0-9]{7}$/,
        oemHonda: /^[0-9]{5}-[A-Z0-9]{3}-[A-Z0-9]{3}/,
        oemNissan: /^[0-9]{5}-[A-Z0-9]{5}/,
        fmsi: /^D[0-9]{3,4}-?[0-9]{3,4}/
    };

    let oemNumber = '';
    let partNumber = code;
    let altNumbers = [];
    let compatibilityTags = new Set();

    allCodes.forEach(c => {
        const upperC = c.toUpperCase();
        if (patterns.centric.test(upperC)) {
            partNumber = upperC;
        } else if (patterns.oemMercedes.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('MERCEDES-BENZ');
        } else if (patterns.oemVAG.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('VOLKSWAGEN');
            compatibilityTags.add('AUDI');
        } else if (patterns.oemToyota.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('TOYOTA');
            compatibilityTags.add('LEXUS');
        } else if (patterns.oemBMW.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('BMW');
        } else if (patterns.oemHonda.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('HONDA');
        } else if (patterns.oemNissan.test(upperC)) {
            oemNumber = upperC;
            compatibilityTags.add('NISSAN');
        } else if (patterns.fmsi.test(upperC)) {
            altNumbers.push(upperC);
        } else {
            altNumbers.push(upperC);
        }
    });

    // Fallback if no OEM found but we have codes
    if (!oemNumber && allCodes.length > 0) {
        oemNumber = allCodes.find(c => c !== partNumber) || '';
    }

    // Try to find vehicle makes in description
    const makes = ['TOYOTA', 'HONDA', 'FORD', 'CHEVROLET', 'NISSAN', 'HYUNDAI', 'KIA', 'VOLKSWAGEN', 'BMW', 'MERCEDES', 'AUDI', 'LEXUS', 'MAZDA', 'SUBARU', 'JEEP', 'TESLA', 'SUZUKI', 'MITSUBISHI', 'PORSCHE', 'VOLVO', 'LAND ROVER', 'PEUGEOT', 'RENAULT', 'FIAT'];
    makes.forEach(m => {
        if (desc.toUpperCase().includes(m)) compatibilityTags.add(m);
    });

    // Try to find common models in description
    const commonModels = [
        'COROLLA', 'CAMRY', 'RAV4', 'HILUX', 'LAND CRUISER', 'PRADO', 'YARIS', 'HIGHLANDER', 'TACOMA', 'TUNDRA', // Toyota
        'CIVIC', 'ACCORD', 'CR-V', 'PILOT', 'FIT', 'ODYSSEY', 'HR-V', // Honda
        'F-150', 'RANGER', 'EXPLORER', 'FOCUS', 'FIESTA', 'MUSTANG', // Ford
        'GOLF', 'JETTA', 'PASSAT', 'TIGUAN', 'TOUAREG', // VW
        '3 SERIES', '5 SERIES', 'X5', 'X3', '3-SERIES', '5-SERIES', // BMW
        'C-CLASS', 'E-CLASS', 'GLC', 'GLE', 'S-CLASS', // Mercedes
        'ELANTRA', 'TUCSON', 'SANTA FE', 'SONATA', 'ACCENT', // Hyundai
        'RIO', 'SPORTAGE', 'SORENTO', 'CERATO', 'OPTIMA', // Kia
        'SENTRA', 'ALTIMA', 'ROGUE', 'NAVARA', 'PATHFINDER', 'PATROL', // Nissan
        'PAJERO', 'LANCER', 'OUTLANDER', // Mitsubishi
        'IMPREZA', 'FORESTER', 'OUTBACK' // Subaru
    ];

    commonModels.forEach(m => {
        if (desc.toUpperCase().includes(m)) compatibilityTags.add(m);
    });

    const finalCompatibility = Array.from(compatibilityTags);

    // Better Image Assignment
    let image = categoryImages.default;
    for (const [key, val] of Object.entries(categoryImages)) {
        if (normalizedCategory.includes(key) || desc.toUpperCase().includes(key)) {
            image = val;
            break;
        }
    }

    if (brand.toUpperCase().includes('CENTRIC') && partNumber.includes('.')) {
        image = `https://www.rockauto.com/info/Centric/${partNumber}_P_Primary.jpg`;
    } else if (brand.toUpperCase().includes('MANNOL') && code.length > 10) {
        image = `https://www.mannol.de/img/catalog/large/${code}.png`;
    }

    return {
        id: `PROD-${1000 + index}`,
        name: desc,
        category: normalizedCategory,
        price: sellingPrice,
        image: image,
        images: [image], // Initialize gallery with the primary image
        description: desc,
        rating: 4.5 + (Math.random() * 0.5),
        reviews: Math.floor(Math.random() * 20) + 5,
        stock: quantity,
        partNumber: partNumber,
        oemNumber: oemNumber,
        altNumbers: altNumbers,
        brand: brand,
        compatibility: finalCompatibility.length > 0 ? finalCompatibility : ['Universal']
    };
});

const content = `// Auto-generated Product Data from Allproducts.xls
export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    images?: string[];
    description: string;
    rating: number;
    reviews: number;
    stock: number;
    partNumber: string;
    oemNumber: string;
    altNumbers?: string[];
    brand: string;
    compatibility: string[];
}

export const productsByPartNumber: { [key: string]: Product } = {};

export const products: Product[] = ${JSON.stringify(products, null, 4)};

// Pre-index for fast lookup including cross-references
products.forEach(p => {
    if (p.partNumber) productsByPartNumber[p.partNumber] = p;
    if (p.oemNumber) productsByPartNumber[p.oemNumber] = p;
    if (p.altNumbers) {
        p.altNumbers.forEach(alt => {
            productsByPartNumber[alt] = p;
        });
    }
});
`;

fs.writeFileSync(path.join(__dirname, '../src/data/products.ts'), content);
console.log(`Successfully mapped ${products.length} products with advanced OEM/Part cross-referencing.`);
