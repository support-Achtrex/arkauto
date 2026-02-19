"use client";

import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addItem(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <Button
            size="lg"
            onClick={handleAddToCart}
            className="w-full bg-[#111111] hover:bg-black font-bold h-12 transition-all"
        >
            {added ? (
                <span>Added to Cart!</span>
            ) : (
                <>Add to Cart</>
            )}
        </Button>
    );
}
