"use client";

import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import { ArrowLeft, Star, Check, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import AddToCartButton from '@/components/features/AddToCartButton';
import AddToWishlistButton from '@/components/features/AddToWishlistButton';
import ProductTabs from '@/components/features/ProductTabs';
import RelatedProducts from '@/components/features/RelatedProducts';
import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

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
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Breadcrumb / Back */}
                <div className="mb-8">
                    <Link href="/catalog" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#e31e24] transition-all group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        BACK TO GLOBAL CATALOG
                    </Link>
                </div>

                <div className="bg-white rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                        {/* Product Image Cluster */}
                        <div className="bg-white p-8 lg:p-12 border-r border-b lg:border-b-0 border-gray-100 flex flex-col items-center gap-8">
                            <div className="relative w-full aspect-square flex items-center justify-center">
                                <div className="absolute top-0 left-0 z-10">
                                    <span className="bg-[#e31e24] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20 italic">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="relative w-full h-full">
                                    <img
                                        src={activeImage || product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x600?text=Part+Image'; }}
                                    />
                                </div>
                            </div>

                            {/* Gallery Thumbnails */}
                            {allImages.length > 1 && (
                                <div className="flex flex-wrap justify-center gap-3 w-full">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={cn(
                                                "w-16 h-16 rounded-2xl border-2 transition-all overflow-hidden p-1 bg-white scale-100 active:scale-90",
                                                activeImage === img ? "border-[#e31e24] shadow-lg shadow-red-500/10" : "border-gray-100 hover:border-gray-300"
                                            )}
                                        >
                                            <img src={img} className="w-full h-full object-cover rounded-lg" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Details - Middle */}
                        <div className="p-10 lg:p-14 lg:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.brand}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PN: {product.partNumber || 'N/A'}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight uppercase italic tracking-tighter">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-amber-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400 font-bold hover:text-[#e31e24] cursor-pointer underline decoration-dotted uppercase tracking-widest">{product.reviews || 0} Professional Reviews</span>
                            </div>

                            <div className="prose prose-sm text-gray-500 mb-10 max-w-none font-medium leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <div className="space-y-4 bg-gray-50 p-6 rounded-[30px] border border-gray-100">
                                <h3 className="text-xs font-black text-gray-900 flex items-center gap-2 uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4 text-[#e31e24]" />
                                    Vehicle Compatibility
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.compatibility?.map((car: string, index: number) => (
                                        <span key={index} className="text-[10px] font-bold bg-white text-gray-600 px-3 py-1 rounded-lg border border-gray-200">
                                            {car}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart / Price - Right */}
                        <div className="p-10 lg:p-14 bg-gray-50 lg:bg-white flex flex-col justify-center">
                            <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-2xl shadow-gray-200/50">
                                <div className="mb-8">
                                    <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">MSRP Inclusive Tax</span>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-5xl font-black text-gray-900 tracking-tighter italic">GH₵{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        <span className="text-sm text-gray-300 line-through font-bold">GH₵{(product.price * 1.15).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                        <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Guaranteed Stock Available</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                        <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                                            <Truck className="w-5 h-5 text-[#e31e24]" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 uppercase tracking-tighter">Fast Express Delivery</span>
                                            <span className="text-[10px] text-gray-400 font-medium">Free within Accra Metropolis</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                        <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-900 uppercase tracking-tighter">Genuine Assurance</span>
                                            <span className="text-[10px] text-gray-400 font-medium">100% Original Manufacturer Part</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <AddToCartButton product={product} />
                                    <AddToWishlistButton product={product} />
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Need Technical Assistance?</p>
                                <a href="/contact" className="text-[#e31e24] text-xs font-black uppercase tracking-widest hover:underline mt-1 block">Speak with a Parts Specialist</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16 bg-white rounded-[40px] border border-gray-100 shadow-sm p-10">
                    <ProductTabs product={product} />
                </div>

                {/* Related Products */}
                <RelatedProducts currentProduct={product} />
            </div>
        </div>
    );
}
