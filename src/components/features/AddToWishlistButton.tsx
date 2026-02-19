"use client";

import { Button } from '@/components/ui/Button';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/data/products';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AddToWishlistButtonProps {
    product: Product;
}

export default function AddToWishlistButton({ product }: AddToWishlistButtonProps) {
    const { addItem, removeItem, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const toggleWishlist = () => {
        if (inWishlist) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    };

    return (
        <Button
            size="lg"
            variant="outline"
            onClick={toggleWishlist}
            className={`w-full h-12 font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 ${inWishlist ? 'text-[#e31e24] border-[#e31e24] bg-red-50' : ''}`}
        >
            <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
            {inWishlist ? 'Saved to Wishlist' : 'Save for Later'}
        </Button>
    );
}
