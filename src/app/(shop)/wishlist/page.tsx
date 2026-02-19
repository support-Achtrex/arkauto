"use client";

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';

export default function WishlistPage() {
    const { items, removeItem } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (item: any) => {
        addItem(item);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-10 h-10 text-[#e31e24]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Save items you're interested in keeping track of.
                </p>
                <Link href="/catalog">
                    <Button className="font-bold bg-[#e31e24] hover:bg-red-700 text-white px-8">
                        Browse Catalog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist ({items.length})</h1>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                        {items.map((item) => (
                            <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                                {/* Image */}
                                <div className="w-24 h-24 bg-gray-50 rounded-md flex items-center justify-center shrink-0">
                                    <span className="text-2xl font-bold text-gray-300 uppercase">
                                        {item.category.slice(0, 2)}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
                                    <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                        <Link href={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-[#e31e24] transition-colors text-lg">
                                            {item.name}
                                        </Link>
                                        <span className="font-bold text-gray-900 hidden sm:block text-lg">
                                            GH₵{item.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 capitalize">{item.category}</p>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <span className="font-bold text-gray-900 sm:hidden block text-lg">
                                            GH₵{item.price.toFixed(2)}
                                        </span>

                                        <div className="flex gap-3 w-full sm:w-auto">
                                            <Button
                                                onClick={() => handleAddToCart(item)}
                                                className="flex-1 sm:flex-none bg-[#111111] hover:bg-black text-white"
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => removeItem(item.id)}
                                                className="flex-1 sm:flex-none text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
