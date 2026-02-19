"use client";

import { useMemo, useState, Suspense } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ui/ProductCard';
import { Filter, SlidersHorizontal, PackageSearch, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

function CatalogPageContent() {
    const { products } = useProducts();
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const makeQuery = searchParams.get('make')?.toLowerCase() || '';
    const modelQuery = searchParams.get('model')?.toLowerCase() || '';
    const yearQuery = searchParams.get('year') || '';

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [sortBy, setSortBy] = useState<string>('featured');

    // unique categories
    const categories = useMemo(() => {
        const cats = new Set(products.map(p => p.category.toLowerCase()));
        return ['all', ...Array.from(cats)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // 1. Text Search
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                const matchesText = product.name.toLowerCase().includes(searchLower) ||
                    product.description.toLowerCase().includes(searchLower) ||
                    (product.partNumber && product.partNumber.toLowerCase().includes(searchLower)) ||
                    (product.oemNumber && product.oemNumber.toLowerCase().includes(searchLower));

                if (!matchesText) return false;
            }

            // 2. Vehicle Search (Make/Model/Year)
            if (makeQuery || modelQuery) {
                const compatibilityString = product.compatibility ? product.compatibility.join(' ').toLowerCase() : '';
                const productText = (product.name + ' ' + product.description).toLowerCase();

                // Check if Make exists in tags OR product text
                const hasMake = !makeQuery || compatibilityString.includes(makeQuery) || productText.includes(makeQuery);

                // Check if Model exists in tags OR product text (stricter check for model to avoid partial matches on common words)
                // We use space padding or boundary checks if possible, but simple includes is a good start for now.
                const hasModel = !modelQuery || compatibilityString.includes(modelQuery) || productText.includes(modelQuery);

                const isCompatible = hasMake && hasModel;
                const isUniversal = product.compatibility ? product.compatibility.some(c => c.toLowerCase() === 'universal') : false;

                if (!isCompatible && !isUniversal) return false;
            }

            // 3. Category Filter
            if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory) return false;

            // 4. Price Filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return 0; // featured (default order)
        });
    }, [products, selectedCategory, priceRange, sortBy, searchQuery, makeQuery, modelQuery]);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 italic uppercase tracking-tight">Auto Parts <span className="text-[#e31e24]">Catalog</span></h1>
                        <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-[10px]">Browsing {filteredProducts.length} Results from the Global Inventory</p>
                        {(makeQuery || searchQuery) && (
                            <div className="flex items-center gap-2 mt-4">
                                <span className="bg-[#e31e24] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">Active Filters</span>
                                <p className="text-xs text-gray-900 font-bold">
                                    {searchQuery && `"${searchQuery}"`} {makeQuery && `Vehicle: ${makeQuery} ${modelQuery} ${yearQuery}`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Sort by</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="h-10 px-4 rounded-xl border-none bg-gray-50 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-[#e31e24]/20 cursor-pointer"
                        >
                            <option value="featured">Most Relevant</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated Only</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-8">
                        {/* Categories */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Filter className="w-4 h-4 text-[#e31e24]" /> Technical Categories
                            </h3>
                            <div className="space-y-3">
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat}
                                                checked={selectedCategory === cat}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="peer appearance-none w-5 h-5 rounded-lg border-2 border-gray-100 checked:border-[#e31e24] checked:bg-[#e31e24] transition-all cursor-pointer"
                                            />
                                            <Check className="absolute w-3 h-3 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                        <span className={cn(
                                            "text-xs font-bold uppercase tracking-widest transition-colors",
                                            selectedCategory === cat ? 'text-[#e31e24]' : 'text-gray-400 group-hover:text-gray-900'
                                        )}>
                                            {cat === 'all' ? 'Browse All' : cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-[#e31e24]" /> Budget (GHS)
                            </h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#e31e24]"
                                />
                                <div className="flex justify-between mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Min</span>
                                        <span className="text-xs font-black text-gray-900">GH₵0</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-gray-400 uppercase">Max</span>
                                        <span className="text-xs font-black text-gray-900">GH₵{priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-20 rounded-3xl border border-gray-100 text-center shadow-sm">
                                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <PackageSearch className="w-10 h-10 text-gray-200" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase italic mb-2 tracking-tight">No Matching Parts</h2>
                                <p className="text-gray-400 font-medium mb-10 max-w-xs mx-auto text-sm leading-relaxed">We couldn&apos;t find any products that match your current search or filter criteria in the catalog.</p>
                                <Button onClick={() => {
                                    setSelectedCategory('all');
                                    setPriceRange([0, 5000]);
                                }} className="bg-[#e31e24] font-black uppercase tracking-widest text-[10px] px-10 py-4 h-auto rounded-2xl active:scale-95 transition-all">
                                    Reset Discovery Catalog
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalog...</div>}>
            <CatalogPageContent />
        </Suspense>
    );
}
