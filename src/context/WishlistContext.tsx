"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product } from '@/data/products';

interface WishlistContextType {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedWishlist = localStorage.getItem('arkauto-wishlist');
                return savedWishlist ? JSON.parse(savedWishlist) : [];
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
        return [];
    });

    // Save wishlist to local storage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('arkauto-wishlist', JSON.stringify(items));
        }
    }, [items]);

    const addItem = React.useCallback((product: Product) => {
        setItems(currentItems => {
            if (currentItems.find(item => item.id === product.id)) {
                return currentItems;
            }
            return [...currentItems, product];
        });
    }, []);

    const removeItem = React.useCallback((productId: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== productId));
    }, []);

    const isInWishlist = React.useCallback((productId: string) => {
        return items.some(item => item.id === productId);
    }, [items]);

    const totalItems = items.length;

    const value = useMemo(() => ({
        items, addItem, removeItem, isInWishlist, totalItems
    }), [items, addItem, removeItem, isInWishlist, totalItems]);

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
