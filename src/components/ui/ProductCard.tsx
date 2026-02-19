"use client";

import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const { addItem: addToWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem(product);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        addToWishlist(product);
    };

    const isWishlisted = isInWishlist(product.id);

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden flex flex-col h-full relative">
            {/* Wishlist Button */}
            <button
                onClick={handleWishlist}
                className={cn(
                    "absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-sm",
                    isWishlisted
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white/80 border-gray-100 text-gray-400 hover:text-red-500 hover:scale-110"
                )}
            >
                <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
            </button>

            {/* Image Area */}
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-6"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop';
                    }}
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded">
                        {product.brand}
                    </span>
                    {product.stock > 0 ? (
                        <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> In Stock
                        </span>
                    ) : (
                        <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">Out of Stock</span>
                    )}
                </div>

                <Link href={`/product/${product.id}`} className="block group-hover:text-[#e31e24] transition-colors mb-3">
                    <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] leading-snug">{product.name}</h3>
                </Link>

                <div className="flex flex-col gap-1 mb-4">
                    {product.partNumber && (
                        <p className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span> PN: {product.partNumber}
                        </p>
                    )}
                    {product.oemNumber && (
                        <p className="text-[10px] font-black text-[#e31e24] uppercase flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-red-400"></span> OEM: {product.oemNumber}
                        </p>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-200'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">({product.reviews || 0})</span>
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Price</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black text-gray-900 tracking-tight">GH₵{product.price.toFixed(2)}</span>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        className="bg-gray-900 hover:bg-[#e31e24] text-white rounded-xl transition-all w-11 h-11 p-0 flex items-center justify-center shrink-0 shadow-lg hover:shadow-red-500/20 active:scale-90"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
