"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, totalItems, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                <p className="text-gray-500 mb-8 max-w-md">
                    Looks like you haven&apos;t added any parts to your cart yet. Browse our catalog to find what you need.
                </p>
                <Link href="/catalog">
                    <Button className="font-bold bg-[#e31e24] hover:bg-red-700 text-white px-8">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems})</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-grow">
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
                                        <div className="flex-grow text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                                                <Link href={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-[#e31e24] transition-colors">
                                                    {item.name}
                                                </Link>
                                                <span className="font-bold text-gray-900 hidden sm:block">
                                                    GH₵{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 capitalize">{item.category}</p>

                                            <div className="flex items-center justify-center sm:justify-between">
                                                <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                                                    <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Remove
                                                </Button>
                                            </div>
                                            <span className="font-bold text-gray-900 sm:hidden mt-4 block">
                                                GH₵{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <Button variant="ghost" onClick={clearCart} className="text-gray-500 hover:text-red-600">
                                    Clear Cart
                                </Button>
                                <Link href="/catalog" className="font-medium text-[#e31e24] hover:underline hidden sm:block">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>GH₵{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (estimated)</span>
                                    <span>GH₵0.00</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                                    <span>Total</span>
                                    <span>GH₵{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-12 bg-[#e31e24] hover:bg-red-700 text-white font-bold shadow-md flex items-center justify-center">
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                {/* Secure payment icons/text could go here */}
                                <span className="text-xs text-gray-400">Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
