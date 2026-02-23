"use client";

import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import { ArrowLeft, Star, Check, Truck, ShieldCheck, MapPin, Wrench, Settings, Info } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import AddToCartButton from '@/components/features/AddToCartButton';
import AddToWishlistButton from '@/components/features/AddToWishlistButton';
import ProductTabs from '@/components/features/ProductTabs';
import RelatedProducts from '@/components/features/RelatedProducts';
import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function ProductPage() {
    const { id } = useParams();
    const { getProductById } = useProducts();
    const product = useMemo(() => getProductById(id as string), [getProductById, id]);
    const [activeImage, setActiveImage] = useState<string>('');

    useEffect(() => {
        if (product) {
            setActiveImage(product.image);
        }
    }, [product]);

    if (!product) {
        notFound();
    }

    const allImages = [product.image, ...(product.images || [])].filter((img, idx, self) => self.indexOf(img) === idx);

    return (
        <div className="bg-[#f0f0f0] min-h-screen pb-16">
            {/* Breadcrumb Bar */}
            <div className="bg-white border-b border-gray-200 pt-3 pb-3 shadow-sm mb-6">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <Link href="/catalog" className="inline-flex items-center text-[10px] font-black text-gray-500 hover:text-[#e31e24] uppercase tracking-widest transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Catalog
                        </Link>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:block">
                            {product.category} / {product.brand} / {product.partNumber}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {/* Product Core Grid */}
                <div className="bg-white border border-gray-300 shadow-sm flex flex-col lg:flex-row mb-8 rounded">

                    {/* LEFT: Image Gallery */}
                    <div className="w-full lg:w-[400px] xl:w-[480px] p-6 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col relative bg-white shrink-0">
                        {/* Labels */}
                        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                            {product.stock > 0 && (
                                <span className="bg-green-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm">
                                    In Stock
                                </span>
                            )}
                            <span className="bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-widest shadow-sm border border-gray-700">
                                {product.brand}
                            </span>
                        </div>

                        {/* Main Image */}
                        <div className="relative w-full aspect-square border border-gray-100 flex items-center justify-center p-4 mb-4 bg-gray-50 rounded">
                            <img
                                src={activeImage || product.image}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600/f8f9fa/a1a1aa?text=Part+Image'; }}
                            />
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 w-full overflow-x-auto pb-2">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={cn(
                                            "w-16 h-16 shrink-0 border transition-all p-1 bg-white flex items-center justify-center rounded-sm",
                                            activeImage === img ? "border-[#e31e24] shadow-[0_0_0_1px_#e31e24]" : "border-gray-200 hover:border-gray-400"
                                        )}
                                    >
                                        <img src={img} className="w-full h-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* MIDDLE: Engineering & Details */}
                    <div className="flex-1 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 uppercase leading-snug">
                            {product.brand} <span className="font-medium text-gray-700">-</span> {product.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-1">
                                <div className="flex text-[#e31e24]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <span className="text-xs text-blue-600 hover:underline cursor-pointer font-bold ml-1">
                                    {product.reviews || Math.floor(Math.random() * 50) + 15} Reviews
                                </span>
                            </div>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <span className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" /> Authorized Dealer
                            </span>
                        </div>

                        {/* Fitment Banner */}
                        <div className="bg-[#e31e24]/10 border border-[#e31e24]/30 rounded p-3 mb-6 flex items-start gap-3">
                            <Wrench className="w-5 h-5 text-[#e31e24] shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-1">Guaranteed Exact Fit</h3>
                                <p className="text-[11px] text-gray-700 font-medium">This product is engineered to fit specific vehicles. Please verify fitment before purchase or check the compatibility table below.</p>
                            </div>
                        </div>

                        {/* Engineering Specs Data Table */}
                        <div className="mb-6 border border-gray-200 rounded overflow-hidden">
                            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                <h3 className="text-[10px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-1.5">
                                    <Settings className="w-3 h-3" /> Technical Specifications
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-100 text-xs">
                                <div className="grid grid-cols-12 px-4 py-2 hover:bg-gray-50">
                                    <div className="col-span-12 sm:col-span-4 font-bold text-gray-500 mb-1 sm:mb-0">Manufacturer Part Number:</div>
                                    <div className="col-span-12 sm:col-span-8 font-mono text-gray-900 font-bold">{product.partNumber || 'N/A'}</div>
                                </div>
                                <div className="grid grid-cols-12 px-4 py-2 hover:bg-gray-50">
                                    <div className="col-span-12 sm:col-span-4 font-bold text-gray-500 mb-1 sm:mb-0">Replaces OEM Number:</div>
                                    <div className="col-span-12 sm:col-span-8 font-mono font-black text-[#e31e24]">{product.oemNumber || 'None Specified'}</div>
                                </div>
                                <div className="grid grid-cols-12 px-4 py-2 hover:bg-gray-50">
                                    <div className="col-span-12 sm:col-span-4 font-bold text-gray-500 mb-1 sm:mb-0">Brand:</div>
                                    <div className="col-span-12 sm:col-span-8 text-gray-900 font-bold uppercase">{product.brand}</div>
                                </div>
                                <div className="grid grid-cols-12 px-4 py-2 hover:bg-gray-50">
                                    <div className="col-span-12 sm:col-span-4 font-bold text-gray-500 mb-1 sm:mb-0">Category / Department:</div>
                                    <div className="col-span-12 sm:col-span-8 text-gray-900 uppercase">{product.category}</div>
                                </div>
                                <div className="grid grid-cols-12 px-4 py-2 hover:bg-gray-50 bg-yellow-50/50">
                                    <div className="col-span-12 sm:col-span-4 font-bold text-gray-500 flex items-center gap-1 mb-1 sm:mb-0">
                                        <Info className="w-3 h-3 text-orange-500" /> Condition:
                                    </div>
                                    <div className="col-span-12 sm:col-span-8 text-gray-900 font-black text-[10px] uppercase tracking-widest text-emerald-700">100% Brand New</div>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 max-w-none font-medium leading-relaxed text-[13px] border-t border-gray-100 pt-4">
                            <p>{product.description}</p>
                        </div>
                    </div>

                    {/* RIGHT: Pricing & Action Box */}
                    <div className="w-full lg:w-[320px] bg-gray-50 p-6 flex flex-col relative shrink-0">
                        {/* Box header */}
                        <div className="text-center mb-6 pb-4 border-b border-gray-200">
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Our Price</div>
                            <div className="flex items-end justify-center gap-2">
                                <span className="text-4xl font-black text-[#e31e24] tracking-tighter leading-none">
                                    GH₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            <div className="mt-2 text-[10px] text-gray-500 font-bold">
                                List Price: <span className="line-through">GH₵{(product.price * 1.15).toFixed(2)}</span>
                                <span className="ml-2 text-green-600">You Save 15%</span>
                            </div>
                        </div>

                        {/* Stock Status Box */}
                        <div className="bg-white border border-gray-200 p-4 rounded-sm mb-6">
                            {product.stock > 0 ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-sm font-black text-green-700 uppercase tracking-widest">
                                        <Check className="w-5 h-5 bg-green-100 rounded-full p-0.5 text-green-700 shrink-0" /> Available to Order
                                    </div>
                                    <div className="flex items-start gap-2 text-[11px] text-gray-600 font-medium pt-3 border-t border-gray-100">
                                        <Truck className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold text-gray-900 block mb-0.5">Ships within 24 Hours</span>
                                            Order now to receive dispatch tracking immediately.
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest p-2 bg-red-50 border border-red-200 rounded">
                                    Temporarily Out of Stock
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 mt-auto">
                            <AddToCartButton product={product} />
                            <div className="pt-2">
                                <AddToWishlistButton product={product} />
                            </div>
                        </div>

                        <div className="mt-6 text-center border-t border-gray-200 pt-4">
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Secure Checkout
                            </p>
                        </div>
                    </div>
                </div>

                {/* Compatibility Block & existing Tabs */}
                {product.compatibility && product.compatibility.length > 0 && (
                    <div className="bg-white border border-gray-300 shadow-sm mb-8 rounded">
                        <div className="bg-gray-800 text-white px-6 py-4 border-b border-gray-700 flex items-center gap-2 rounded-t">
                            <MapPin className="w-4 h-4 text-[#e31e24]" />
                            <h2 className="text-sm font-black uppercase tracking-widest">Direct Fitment List</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                {product.compatibility.map((car: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-3 py-2 rounded-sm hover:border-[#e31e24] cursor-default transition-colors">
                                        <Check className="w-3 h-3 text-green-600 shrink-0" />
                                        {car}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs Component Box */}
                <div className="bg-white border border-gray-300 shadow-sm p-6 lg:p-10 mb-8 rounded">
                    <ProductTabs product={product} />
                </div>

                {/* Related Products */}
                <RelatedProducts currentProduct={product} />
            </div>
        </div>
    );
}
