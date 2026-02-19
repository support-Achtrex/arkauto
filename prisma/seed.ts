const { PrismaClient } = require('@prisma/client')
// We'll import product data in a way that works in CommonJS for the seed script
// Or just copy the data structure since importing TS into JS seed can be tricky without ts-node

const prisma = new PrismaClient()

// Copy of Products from src/data/products.ts
// In a real scenario, you might read the JSON file or use ts-node to import directly.
const productsData = [
    {
        "id": "PROD-1000",
        "name": "PQME-08721,300.08721, D872 7747, A0034202520 FRONT BRAKE PAD",
        "category": "BRAKE PAD",
        "price": 800,
        "image": "https://www.rockauto.com/info/Centric/300.08721_P_Primary.jpg",
        "images": [
            "https://www.rockauto.com/info/Centric/300.08721_P_Primary.jpg"
        ],
        "description": "PQME-08721,300.08721, D872 7747, A0034202520 FRONT BRAKE PAD",
        "rating": 4.97,
        "reviews": 11,
        "stock": 3,
        "partNumber": "300.08721",
        "oemNumber": "A0034202520",
        "altNumbers": [
            "PQME-08721",
            "D872",
            "7747"
        ],
        "brand": "PRIME BRAKES AND CENTRIC",
        "compatibility": [
            "MERCEDES-BENZ"
        ]
    },
    {
        "id": "PROD-1004",
        "name": "HENGST E159HD311, A2561840000, PG99638EX, PL41505 OIL FILTER",
        "category": "OIL FILTER",
        "price": 400,
        "image": "https://images.unsplash.com/photo-1590515136814-118833924151?q=80&w=800&auto=format&fit=crop",
        "images": [
            "https://images.unsplash.com/photo-1590515136814-118833924151?q=80&w=800&auto=format&fit=crop"
        ],
        "description": "HENGST E159HD311, A2561840000, PG99638EX, PL41505 OIL FILTER",
        "rating": 4.84,
        "reviews": 10,
        "stock": 100,
        "partNumber": "4030776048360",
        "oemNumber": "PG99638EX",
        "altNumbers": [
            "E159HD311",
            "PL41505"
        ],
        "brand": "Generic",
        "compatibility": [
            "MERCEDES-BENZ",
            "VOLKSWAGEN",
            "AUDI"
        ]
    }
    // Note: We are seeding a few examples. In production, we'd import the full 49k lines.
]

async function main() {
    console.log(`Start seeding ...`)

    for (const p of productsData) {
        const product = await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                name: p.name,
                category: p.category,
                price: p.price,
                image: p.image,
                images: p.images,
                description: p.description,
                rating: p.rating,
                reviews: p.reviews,
                stock: p.stock,
                partNumber: p.partNumber,
                oemNumber: p.oemNumber,
                altNumbers: p.altNumbers,
                brand: p.brand,
                compatibility: p.compatibility
            },
        })
        console.log(`Created product with id: ${product.id}`)
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
