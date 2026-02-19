"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product } from '@/data/products';

// Define the CartItem based on Product but adding quantity
// We must declare this carefully to avoid circular or missing type issues if Product changes
export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedCart = localStorage.getItem('arkauto-cart');
                return savedCart ? JSON.parse(savedCart) : [];
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        return [];
    });

    // Save cart to local storage whenever it changes (skip initial render if empty?)
    // Actually, saving on every change is fine.
    useEffect(() => {
        // We only save if window exists.
        if (typeof window !== 'undefined') {
            localStorage.setItem('arkauto-cart', JSON.stringify(items));
        }
    }, [items]);

    const addItem = React.useCallback((product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...currentItems, { ...product, quantity: 1 }];
        });
    }, []);

    const removeItem = React.useCallback((productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    }, []);

    const clearCart = React.useCallback(() => {
        setItems([]);
        localStorage.removeItem('arkauto-cart');
    }, []);

    const totalItems = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);
    const totalPrice = useMemo(() => items.reduce((total, item) => total + (item.price * item.quantity), 0), [items]);

    const value = useMemo(() => ({
        items, addItem, removeItem, clearCart, totalItems, totalPrice
    }), [items, addItem, removeItem, clearCart, totalItems, totalPrice]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
