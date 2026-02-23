"use client";

import { useMemo, useState, Suspense } from 'react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ui/ProductCard';
import { Filter, SlidersHorizontal, PackageSearch, Check, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

    // unique brands
    const brands = useMemo(() => {
        const brs = new Set(products.map(p => p.brand));
        return Array.from(brs).sort();
    }, [products]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearAllFilters = () => {
        setSelectedCategory('all');
        setPriceRange([0, 5000]);
        setSelectedBrands([]);
    };

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

                const hasMake = !makeQuery || compatibilityString.includes(makeQuery) || productText.includes(makeQuery);
                const hasModel = !modelQuery || compatibilityString.includes(modelQuery) || productText.includes(modelQuery);

                const isCompatible = hasMake && hasModel;
                const isUniversal = product.compatibility ? product.compatibility.some(c => c.toLowerCase() === 'universal') : false;

                if (!isCompatible && !isUniversal) return false;
            }

            // 3. Category Filter
            if (selectedCategory !== 'all' && product.category.toLowerCase() !== selectedCategory) return false;

            // 4. Brand Filter
            if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

            // 5. Price Filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false;

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return 0; // featured (default order)
        });
    }, [products, selectedCategory, selectedBrands, priceRange, sortBy, searchQuery, makeQuery, modelQuery]);

    return (
        <div className="bg-[#f0f0f0] min-h-screen pb-12">

            {/* Breadcrumb & Title Bar */}
            <div className="bg-white border-b border-gray-200 pt-4 pb-6">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                        <Link href="/" className="hover:text-[#e31e24] transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 mx-2" />
                        <span className="text-gray-900">Auto Parts Catalog</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-[#e31e24] pb-2">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                                {makeQuery ? `${yearQuery} ${makeQuery} ${modelQuery} Parts` : 'Auto Parts & Accessories'}
                            </h1>
                            <p className="text-gray-600 font-medium text-sm mt-1">
                                {filteredProducts.length} Results exactly matching your criteria
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Dense Left Sidebar Filters */}
                    <aside className="w-full lg:w-64 shrink-0 space-y-4">

                        {/* Active Filters Summary (If any) */}
                        {(selectedCategory !== 'all' || selectedBrands.length > 0 || priceRange[1] < 5000 || searchQuery || makeQuery) && (
                            <div className="bg-white border border-gray-200 rounded p-4">
                                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Active Filters</h3>
                                    <button onClick={clearAllFilters} className="text-[10px] text-[#e31e24] font-bold uppercase hover:underline">Clear All</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(searchQuery || makeQuery) && (
                                        <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                                            Search: {searchQuery || `${yearQuery} ${makeQuery}`}
                                        </span>
                                    )}
                                    {selectedCategory !== 'all' && (
                                        <span className="bg-[#e31e24]/10 text-[#e31e24] text-[10px] font-bold px-2 py-1 rounded inline-flex items-center gap-1 border border-[#e31e24]/20">
                                            {selectedCategory}
                                            <X className="w-3 h-3 cursor-pointer hover:text-red-700" onClick={() => setSelectedCategory('all')} />
                                        </span>
                                    )}
                                    {selectedBrands.map(b => (
                                        <span key={b} className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                                            {b}
                                            <X className="w-3 h-3 cursor-pointer hover:text-black" onClick={() => toggleBrand(b)} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Categories Box */}
                        <div className="bg-white border border-gray-200 rounded">
                            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    Departments
                                </h3>
                            </div>
                            <div className="p-3 max-h-60 overflow-y-auto">
                                <div className="space-y-1">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 hover:bg-gray-50 rounded">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat}
                                                checked={selectedCategory === cat}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                className="w-3.5 h-3.5 text-[#e31e24] focus:ring-[#e31e24] border-gray-300"
                                            />
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-wider transition-colors",
                                                selectedCategory === cat ? 'text-[#e31e24]' : 'text-gray-600 group-hover:text-gray-900'
                                            )}>
                                                {cat === 'all' ? 'All Departments' : cat}
                                            </span>
                                            <span className="ml-auto text-[10px] text-gray-400">
                                                {cat === 'all' ? products.length : products.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Brands Box */}
                        <div className="bg-white border border-gray-200 rounded">
                            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    Brands
                                </h3>
                            </div>
                            <div className="p-3 max-h-60 overflow-y-auto">
                                <div className="space-y-1">
                                    {brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-2 cursor-pointer group px-2 py-1.5 hover:bg-gray-50 rounded">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleBrand(brand)}
                                                className="w-3.5 h-3.5 text-[#e31e24] rounded-sm focus:ring-[#e31e24] border-gray-300"
                                            />
                                            <span className={cn(
                                                "text-xs font-bold uppercase tracking-wider transition-colors",
                                                selectedBrands.includes(brand) ? 'text-[#e31e24]' : 'text-gray-600 group-hover:text-gray-900'
                                            )}>
                                                {brand}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="bg-white border border-gray-200 rounded">
                            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    Price Range
                                </h3>
                            </div>
                            <div className="p-5">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#e31e24] mb-3"
                                />
                                <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                    <div className="bg-gray-50 border border-gray-200 px-2 py-1 rounded">GH₵ 0</div>
                                    <span>to</span>
                                    <div className="bg-gray-50 border border-gray-200 px-2 py-1 rounded">GH₵ {priceRange[1]}</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Listing Area */}
                    <div className="flex-1 flex flex-col">

                        {/* Top Utility / Sort Bar */}
                        <div className="bg-white border border-gray-200 rounded p-3 mb-4 flex items-center justify-between shadow-sm">
                            <div className="text-xs font-semibold text-gray-600">
                                Showing 1 - {filteredProducts.length} products
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="h-8 px-2 rounded border border-gray-200 bg-white text-xs font-bold text-gray-800 focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24]"
                                >
                                    <option value="featured">Most Relevant</option>
                                    <option value="price-low">Lowest Price</option>
                                    <option value="price-high">Highest Price</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-16 rounded border border-gray-200 text-center shadow-sm flex flex-col items-center">
                                <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">No Parts Found</h2>
                                <p className="text-gray-500 font-medium text-sm mb-6 max-w-md">We couldn't find exact matches for your criteria. Try adjusting your filters or expanding your search.</p>
                                <Button onClick={clearAllFilters} className="bg-[#e31e24] font-bold uppercase tracking-widest text-[11px] px-8 h-10 rounded">
                                    Clear All Filters
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold uppercase text-gray-400 tracking-widest text-sm">Loading Catalog Data...</div>}>
            <CatalogPageContent />
        </Suspense>
    );
}
