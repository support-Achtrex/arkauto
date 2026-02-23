"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck, Lock, Truck, CreditCard } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, totalItems, totalPrice, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-[#f0f0f0]">
                <div className="bg-white p-12 rounded border border-gray-300 shadow-sm text-center max-w-lg w-full">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">Your Cart is Empty</h1>
                    <p className="text-gray-500 mb-8 text-sm font-medium">
                        You have no parts in your shopping cart. Return to the catalog to find the exact fit for your vehicle.
                    </p>
                    <Link href="/catalog">
                        <Button className="font-bold bg-[#e31e24] hover:bg-red-700 text-white px-8 uppercase tracking-widest text-[11px] h-10 rounded-sm">
                            Return to Global Catalog
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f0f0] min-h-screen pb-16 pt-8">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-300">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Shopping Cart</h1>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Review your selected parts before technical checkout</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 border border-green-200 rounded">
                        <Lock className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">256-Bit Secure Checkout</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items List */}
                    <div className="flex-grow">
                        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden mb-4">

                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 border-b border-gray-300 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                <div className="col-span-6">Item Description</div>
                                <div className="col-span-2 text-center">Unit Price</div>
                                <div className="col-span-2 text-center">Quantity</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">

                                        {/* Product Info */}
                                        <div className="col-span-1 md:col-span-6 flex items-start gap-4">
                                            <div className="w-20 h-20 bg-white border border-gray-200 flex items-center justify-center shrink-0 p-1 relative">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                                ) : (
                                                    <span className="text-xl font-bold text-gray-300 uppercase">{item.category.slice(0, 2)}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center min-h-[5rem]">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.brand}</span>
                                                <Link href={`/product/${item.id}`} className="font-bold text-[#0055aa] hover:text-[#e31e24] hover:underline text-sm leading-tight transition-colors line-clamp-2 mb-2">
                                                    {item.name}
                                                </Link>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
                                                    {item.partNumber && <span>PN: <span className="font-mono text-gray-900">{item.partNumber}</span></span>}
                                                    <span className="text-green-600 flex items-center gap-1"><Truck className="w-3 h-3" /> Ships ASAP</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Price & Qty Toggle */}
                                        <div className="col-span-1 md:hidden flex justify-between items-center bg-gray-50 p-3 border border-gray-200 rounded">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Qty:</span>
                                                <span className="font-bold text-gray-900 border border-gray-300 bg-white px-3 py-1 text-sm">{item.quantity}</span>
                                            </div>
                                            <span className="font-black text-gray-900">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>

                                        {/* Desktop Unit Price */}
                                        <div className="hidden md:block col-span-2 text-center">
                                            <span className="font-bold text-gray-900 text-sm">GH₵{item.price.toFixed(2)}</span>
                                        </div>

                                        {/* Desktop Quantity */}
                                        <div className="hidden md:flex col-span-2 justify-center items-center gap-3">
                                            <span className="font-bold text-gray-900 border border-gray-300 bg-white w-12 h-8 flex items-center justify-center text-sm">{item.quantity}</span>
                                        </div>

                                        {/* Desktop Total & Remove */}
                                        <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
                                            <span className="font-black text-gray-900 text-base">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                                title="Remove Item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Mobile Remove */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="md:hidden text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1 mt-2 mx-auto justify-center"
                                        >
                                            <Trash2 className="w-3 h-3" /> Remove Part
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                                <button onClick={clearCart} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 hover:underline">
                                    Empty Cart
                                </button>
                                <Link href="/catalog" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#0055aa] hover:underline flex items-center gap-1">
                                    Continue Shopping <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                        {/* Trust Banner Under Cart */}
                        <div className="bg-gray-200 border border-gray-300 rounded p-4 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-gray-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Original Parts Warranty</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-gray-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Fast Nationwide Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-gray-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Encrypted Payments</span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-[360px] shrink-0">
                        <div className="bg-white border border-gray-300 rounded shadow-sm sticky top-24">

                            <div className="bg-gray-800 text-white p-4 rounded-t border-b border-gray-700 flex items-center justify-between">
                                <h2 className="text-sm font-black uppercase tracking-widest">Order Summary</h2>
                                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">{totalItems} Parts</span>
                            </div>

                            <div className="p-6">
                                <div className="space-y-3 mb-6 border-b border-gray-200 pb-6 text-sm">
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Merchandise Total</span>
                                        <span>GH₵{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-gray-600">
                                        <span>Estimated Shipping</span>
                                        <span className="text-green-600 uppercase tracking-widest text-[10px]">Free Express</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-gray-600">
                                        <span>Estimated Tax</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">Estimated Total</span>
                                    <span className="font-black text-3xl text-[#e31e24] tracking-tighter leading-none">
                                        GH₵{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </span>
                                </div>

                                <Link href="/checkout" className="block w-full">
                                    <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest shadow-md flex items-center justify-center rounded-sm transition-colors active:scale-95 text-[11px]">
                                        <Lock className="w-4 h-4 mr-2" /> Secure Checkout
                                    </Button>
                                </Link>

                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2">
                                    <Lock className="w-3 h-3 text-gray-400" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Your privacy is guaranteed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
