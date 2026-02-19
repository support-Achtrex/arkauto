"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: 'Pending Approval' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
    paymentMethod: string;
}

interface OrderContextType {
    orders: Order[];
    updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
    addOrder: (order: Order) => void;
    updateOrder: (order: Order) => void;
    deleteOrder: (orderId: string) => void;
    getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrders: Order[] = [
    {
        id: '#ORD-7829',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+233 24 123 4567',
        shippingAddress: 'Plot 42, Spintex Road, Accra',
        items: [
            { id: 'item-1', productId: 'PROD-1000', name: 'Front Brake Pad', price: 800, quantity: 1, image: 'https://www.rockauto.com/info/Centric/300.08721_P_Primary.jpg' },
            { id: 'item-2', productId: 'PROD-1004', name: 'Oil Filter', price: 400, quantity: 1, image: 'https://www.rockauto.com/info/Hengst/E159HD311_P_Primary.jpg' }
        ],
        subtotal: 1200,
        tax: 50,
        total: 1250,
        status: 'Processing',
        date: 'Feb 13, 2026',
        paymentMethod: 'Debit Card'
    },
    {
        id: '#ORD-7828',
        customerName: 'Sarah Smith',
        customerEmail: 'sarah@example.com',
        customerPhone: '+233 20 987 6543',
        shippingAddress: 'House 15, East Legon, Accra',
        items: [
            { id: 'item-3', productId: 'PROD-1013', name: 'Spark Plug', price: 320, quantity: 1, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop' }
        ],
        subtotal: 320,
        tax: 0,
        total: 320,
        status: 'Shipped',
        date: 'Feb 12, 2026',
        paymentMethod: 'M-Pesa'
    }
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('arkauto-orders');
                return saved ? JSON.parse(saved) : initialOrders;
            } catch (e) {
                return initialOrders;
            }
        }
        return initialOrders;
    });

    const saveOrders = React.useCallback((newOrders: Order[]) => {
        setOrders(newOrders);
        if (typeof window !== 'undefined') {
            localStorage.setItem('arkauto-orders', JSON.stringify(newOrders));
        }
    }, []);

    const updateOrderStatus = React.useCallback((orderId: string, newStatus: Order['status']) => {
        setOrders(prevOrders => {
            const updated = prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
            if (typeof window !== 'undefined') localStorage.setItem('arkauto-orders', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const deleteOrder = React.useCallback((orderId: string) => {
        setOrders(prevOrders => {
            const updated = prevOrders.filter(o => o.id !== orderId);
            if (typeof window !== 'undefined') localStorage.setItem('arkauto-orders', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const getOrderById = React.useCallback((id: string) => {
        return orders.find(o => o.id === id);
    }, [orders]);

    const addOrder = React.useCallback((order: Order) => {
        setOrders(prevOrders => {
            const updated = [order, ...prevOrders];
            if (typeof window !== 'undefined') localStorage.setItem('arkauto-orders', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const updateOrder = React.useCallback((order: Order) => {
        setOrders(prevOrders => {
            const updated = prevOrders.map(o => o.id === order.id ? order : o);
            if (typeof window !== 'undefined') localStorage.setItem('arkauto-orders', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const value = useMemo(() => ({
        orders,
        updateOrderStatus,
        addOrder,
        updateOrder,
        deleteOrder,
        getOrderById
    }), [orders, updateOrderStatus, addOrder, updateOrder, deleteOrder, getOrderById]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
}
