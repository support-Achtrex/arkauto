"use client";

import { Product } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedProductsProps {
    currentProduct: Product;
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
    const { products } = useProducts();
    const related = useMemo(() => {
        return products
            .filter(p => p.id !== currentProduct.id && (p.category.toLowerCase() === currentProduct.category.toLowerCase() || p.brand.toLowerCase() === currentProduct.brand.toLowerCase()))
            .slice(0, 4);
    }, [currentProduct, products]);

    if (related.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic">Related Products</h2>
                    <p className="text-gray-500 text-sm font-medium">Customers also viewed these {currentProduct.category} parts</p>
                </div>
                <Link href={`/catalog?category=${currentProduct.category}`} className="text-[#e31e24] font-bold hover:underline flex items-center gap-1 text-sm">
                    View more <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
