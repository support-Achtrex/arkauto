"use client";

import Link from 'next/link';
import { ShoppingCart, Star, Heart, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
        <div className="group bg-white border border-gray-200 hover:border-[#e31e24] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col h-full relative p-3 rounded">
            {/* Top Labels */}
            <div className="flex justify-between items-start mb-2 relative z-10">
                {product.stock > 0 ? (
                    <span className="text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 border border-green-200 font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> In Stock
                    </span>
                ) : (
                    <span className="text-[10px] text-red-700 bg-red-50 px-1.5 py-0.5 border border-red-200 font-bold uppercase tracking-wider">
                        Out of Stock
                    </span>
                )}

                <button
                    onClick={handleWishlist}
                    className="p-1.5 text-gray-400 hover:text-[#e31e24] transition-colors bg-white rounded-full hover:bg-red-50 border border-transparent hover:border-red-100"
                >
                    <Heart className={cn("w-4 h-4", isWishlisted && "fill-current text-[#e31e24]")} />
                </button>
            </div>

            {/* Image Area */}
            <div className="relative aspect-square w-full bg-white flex items-center justify-center mb-3">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-2 mix-blend-multiply"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-4xl font-black text-gray-200 uppercase">{product.category.slice(0, 2)}</span>
                    </div>
                )}
            </div>

            {/* Content & Details */}
            <div className="flex flex-col flex-grow">
                {/* Brand & Stars */}
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        {product.brand}
                    </span>
                    <div className="flex items-center gap-1">
                        <div className="flex text-[#e31e24]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">({product.reviews || Math.floor(Math.random() * 50) + 5})</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={`/product/${product.id}`} className="block group-hover:text-[#e31e24] transition-colors mb-2">
                    <h3 className="font-semibold text-[#0055aa] text-sm leading-tight line-clamp-2">{product.name}</h3>
                </Link>

                {/* Technical Details (Dense) */}
                <div className="mt-auto mb-3 bg-gray-50 border border-gray-100 p-2 rounded-sm space-y-1">
                    {product.partNumber && (
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Part No:</span>
                            <span className="text-[11px] font-mono text-gray-900">{product.partNumber}</span>
                        </div>
                    )}
                    {product.oemNumber && (
                        <div className="flex justify-between items-center border-t border-gray-200 pt-1 mt-1">
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Replaces OEM:</span>
                            <span className="text-[11px] font-black font-mono text-[#e31e24]">{product.oemNumber}</span>
                        </div>
                    )}
                </div>

                {/* Guaranteed Fit or Delivery Note */}
                <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold text-gray-600">
                    <Truck className="w-3.5 h-3.5 text-gray-400" /> Ships Tomorrow
                </div>

                {/* Price & Action */}
                <div className="flex items-end justify-between gap-2 pt-3 border-t border-gray-200 mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest line-through mb-0.5">GH₵{(product.price * 1.15).toFixed(2)}</span>
                        <span className="text-lg font-black text-gray-900 leading-none">GH₵{product.price.toFixed(2)}</span>
                    </div>

                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={cn(
                            "rounded font-bold uppercase tracking-wider text-[10px] px-3 h-8 shadow-sm transition-all",
                            product.stock > 0
                                ? "bg-[#e31e24] hover:bg-red-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        )}
                    >
                        {product.stock > 0 ? (
                            <span className="flex items-center gap-1"><ShoppingCart className="w-3 h-3" /> Add</span>
                        ) : 'Out Of Stock'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
