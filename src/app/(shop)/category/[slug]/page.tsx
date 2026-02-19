import { products } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params if we want static export (optional but good practice)
export async function generateStaticParams() {
    const categories = Array.from(new Set(products.map(p => p.category)));
    return categories.map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categoryProducts = products.filter(p => p.category.toLowerCase() === slug.toLowerCase());

    if (categoryProducts.length === 0) {
        notFound();
    }

    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="text-gray-500 hover:text-[#e31e24] transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{categoryName} Parts</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
