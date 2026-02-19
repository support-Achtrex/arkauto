"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products as initialProducts, Product } from '@/data/products';

interface ProductContextType {
    products: Product[];
    refreshProducts: () => void;
    updateProducts: (newProducts: Product[]) => void;
    getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    // Lazy initialization for products to avoid useEffect state setting
    const [products, setProducts] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('arkauto-products');
                if (saved) {
                    return JSON.parse(saved);
                }
            } catch (e) {
                console.error("Failed to parse products from storage", e);
            }
        }
        return initialProducts;
    });

    const loadProducts = React.useCallback(() => {
        const saved = localStorage.getItem('arkauto-products');
        if (saved) {
            try {
                setProducts(JSON.parse(saved));
            } catch (e) {
                setProducts(initialProducts);
            }
        } else {
            setProducts(initialProducts);
        }
    }, []);

    useEffect(() => {
        // Only listen for storage changes
        const handleStorageChange = () => loadProducts();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadProducts]);

    const updateProducts = React.useCallback((newProducts: Product[]) => {
        setProducts(newProducts);
        localStorage.setItem('arkauto-products', JSON.stringify(newProducts));
    }, []);

    const getProductById = React.useCallback((id: string) => {
        return products.find(p => p.id === id);
    }, [products]);

    const value = useMemo(() => ({
        products,
        refreshProducts: loadProducts,
        updateProducts,
        getProductById
    }), [products, loadProducts, updateProducts, getProductById]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
