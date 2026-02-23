"use client";

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, CreditCard, Truck, ClipboardList, ShieldCheck, Lock, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<'shipping' | 'review' | 'payment' | 'confirmation'>('shipping');
    const [isLoading, setIsLoading] = useState(false);
    const [orderId, setOrderId] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitShipping = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('review');
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setOrderId(`#ARK-${Math.floor(Math.random() * 100000)}`);

        setIsLoading(false);
        setStep('confirmation');
        clearCart();
        window.scrollTo(0, 0);
    };

    if (items.length === 0 && step !== 'confirmation') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0f0f0]">
                <div className="bg-white p-12 rounded border border-gray-300 shadow-sm text-center max-w-lg w-full">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ClipboardList className="w-8 h-8 text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-black mb-2 text-gray-900 uppercase tracking-tight">Checkout Error</h1>
                    <p className="text-gray-500 mb-8 text-sm font-medium">Your cart is currently empty. Please add components to your cart before proceeding to checkout.</p>
                    <Link href="/catalog">
                        <Button className="w-full bg-[#e31e24] hover:bg-red-700 font-bold uppercase tracking-widest text-[11px] h-10 rounded-sm">Return to Catalog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f0f0] min-h-screen py-10">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* Secure Checkout Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b-2 border-gray-300 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
                            <Lock className="w-6 h-6 text-green-700" /> Secure Checkout
                        </h1>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">256-bit encrypted transaction</p>
                    </div>
                    {/* Progress Steps */}
                    <div className="flex items-center gap-1 md:gap-3">
                        <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'shipping' || step === 'review' || step === 'payment' || step === 'confirmation' ? 'text-gray-900 font-black' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 'shipping' ? 'bg-[#e31e24] text-white' : 'bg-gray-200 text-gray-500'} ${(step === 'review' || step === 'payment' || step === 'confirmation') && 'bg-green-600 text-white'}`}>
                                {(step === 'review' || step === 'payment' || step === 'confirmation') ? <Check className="w-3 h-3" /> : '1'}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Shipping</span>
                        </div>
                        <div className="w-4 md:w-8 h-px bg-gray-300"></div>
                        <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'review' || step === 'payment' || step === 'confirmation' ? 'text-gray-900 font-black' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 'review' ? 'bg-[#e31e24] text-white' : 'bg-gray-200 text-gray-500'} ${(step === 'payment' || step === 'confirmation') && 'bg-green-600 text-white'}`}>
                                {(step === 'payment' || step === 'confirmation') ? <Check className="w-3 h-3" /> : '2'}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Review</span>
                        </div>
                        <div className="w-4 md:w-8 h-px bg-gray-300"></div>
                        <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'payment' || step === 'confirmation' ? 'text-gray-900 font-black' : 'text-gray-400'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#e31e24] text-white' : 'bg-gray-200 text-gray-500'} ${step === 'confirmation' && 'bg-green-600 text-white'}`}>
                                {step === 'confirmation' ? <Check className="w-3 h-3" /> : '3'}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest hidden sm:inline">Payment</span>
                        </div>
                    </div>
                </div>

                {step === 'confirmation' ? (
                    <div className="max-w-xl mx-auto bg-white p-10 rounded shadow-sm border border-gray-300 text-center">
                        <div className="w-20 h-20 bg-green-50 rounded border border-green-200 flex items-center justify-center mx-auto mb-6 text-green-700">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Order Confirmed</h1>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">Order ID: <span className="text-gray-900">{orderId}</span></p>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded text-sm text-gray-700 text-left mb-8 shadow-inner">
                            Your order has been logged into our system. You will receive a dispatch notification via email at <strong className="text-gray-900">{formData.email}</strong> once your parts leave our facility.
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Link href="/catalog" className="flex-1">
                                <Button className="w-full bg-gray-900 hover:bg-black text-white rounded-sm font-bold uppercase tracking-widest text-[11px] h-10">Continue Shopping</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {step === 'shipping' && (
                                <form onSubmit={handleSubmitShipping} className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-300">
                                    <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2 border-b border-gray-200 pb-3">
                                        <Truck className="w-5 h-5 text-gray-400" /> Shipping Information
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">First Name <span className="text-red-600">*</span></label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Last Name <span className="text-red-600">*</span></label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Email Address <span className="text-red-600">*</span></label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Phone Number <span className="text-red-600">*</span></label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Delivery Address <span className="text-red-600">*</span></label>
                                        <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">City / Town <span className="text-red-600">*</span></label>
                                            <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Region <span className="text-red-600">*</span></label>
                                            <select className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm uppercase">
                                                <option>Greater Accra</option>
                                                <option>Ashanti Region</option>
                                                <option>Western Region</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4 border-t border-gray-200">
                                        <Button type="submit" className="bg-[#e31e24] hover:bg-red-700 text-white px-8 h-10 rounded-sm font-black uppercase tracking-widest text-[11px]">
                                            Continue to Review
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {step === 'review' && (
                                <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-300">
                                    <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
                                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <ClipboardList className="w-5 h-5 text-gray-400" /> Order Review
                                        </h2>
                                        <button onClick={() => setStep('shipping')} className="text-[10px] font-bold text-[#e31e24] hover:underline uppercase tracking-widest">Edit Details</button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 border border-gray-200 bg-gray-50 rounded-sm">
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 border-b border-gray-200 pb-1">Customer Identifier</h3>
                                            <p className="font-bold text-gray-900 text-sm">{formData.firstName} {formData.lastName}</p>
                                            <p className="text-[11px] text-gray-600 mt-1">{formData.email}</p>
                                            <p className="text-[11px] text-gray-600 mt-0.5">{formData.phone}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 border-b border-gray-200 pb-1">Shipping Destination</h3>
                                            <p className="text-sm text-gray-900 font-medium">{formData.address}</p>
                                            <p className="text-[11px] text-gray-600 mt-1">{formData.city}, Ghana</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 border border-green-200 bg-green-50 rounded-sm mb-8">
                                        <ShieldCheck className="w-5 h-5 text-green-700 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-black text-green-800 uppercase tracking-widest mb-0.5">Authorization Cleared</p>
                                            <p className="text-[11px] text-green-700">All parts confirmed in inventory. Ready for immediate dispatch upon payment completion.</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 pt-4 border-t border-gray-200">
                                        <button onClick={() => setStep('shipping')} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 flex items-center gap-1">
                                            <ArrowLeft className="w-3 h-3" /> Back
                                        </button>
                                        <Button onClick={() => setStep('payment')} className="bg-[#e31e24] hover:bg-red-700 text-white px-8 h-10 rounded-sm font-black uppercase tracking-widest text-[11px]">
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 'payment' && (
                                <form onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-300">
                                    <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest flex items-center gap-2 border-b border-gray-200 pb-3">
                                        <CreditCard className="w-5 h-5 text-gray-400" /> Payment Processing
                                    </h2>

                                    <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-sm mb-6 flex items-start gap-3">
                                        <Lock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-widest text-yellow-800 mb-1">Simulated Gateway</p>
                                            <p className="text-[10px] text-yellow-700 leading-relaxed">This terminal is currently running in demonstration mode. Transactions are not processed. You may submit dummy data below.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Card Number <span className="text-red-600">*</span></label>
                                            <div className="relative">
                                                <input required placeholder="0000 0000 0000 0000" className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm font-mono tracking-widest" />
                                                <div className="absolute right-3 top-2.5 text-gray-400"><CreditCard className="w-5 h-5" /></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Expiration <span className="text-red-600">*</span></label>
                                                <input required placeholder="MM/YY" className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm font-mono" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Security Code <span className="text-red-600">*</span></label>
                                                <input required placeholder="CVC" className="w-full h-10 px-3 bg-white border border-gray-300 rounded-sm text-sm focus:ring-1 focus:ring-[#e31e24] focus:border-[#e31e24] shadow-sm font-mono" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 pt-4 border-t border-gray-200">
                                        <button type="button" onClick={() => setStep('review')} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 flex items-center gap-1">
                                            <ArrowLeft className="w-3 h-3" /> Back
                                        </button>
                                        <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white px-8 h-10 rounded-sm font-black uppercase tracking-widest text-[11px] shadow-sm min-w-[200px]">
                                            {isLoading ? 'Processing...' : `Authorize GH₵ ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded shadow-sm border border-gray-300 sticky top-24 overflow-hidden">
                                <div className="bg-gray-800 text-white p-4 border-b border-gray-700 flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-widest">Order Summary</h3>
                                    <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded">{items.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                                </div>
                                <div className="p-0 border-b border-gray-200 max-h-80 overflow-y-auto">
                                    <div className="divide-y divide-gray-100">
                                        {items.map(item => (
                                            <div key={item.id} className="flex gap-3 p-4 bg-gray-50 hover:bg-white transition-colors">
                                                <div className="w-12 h-12 bg-white border border-gray-300 rounded-sm flex items-center justify-center shrink-0 p-0.5">
                                                    {item.image ? (
                                                        <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                                                    ) : (
                                                        <span className="text-xs font-bold text-gray-300">{item.category.slice(0, 2)}</span>
                                                    )}
                                                </div>
                                                <div className="flex-grow flex flex-col justify-center">
                                                    <p className="font-bold text-[#0055aa] text-xs line-clamp-1">{item.name}</p>
                                                    <div className="flex justify-between text-gray-500 mt-1">
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                                                        <span className="text-xs font-bold text-gray-900">GH₵{item.price.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-white space-y-2">
                                    <div className="flex justify-between text-[11px] text-gray-600 font-bold uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900">GH₵ {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-gray-600 font-bold uppercase tracking-widest">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between font-black text-xl text-gray-900 border-t border-gray-200 mt-3 pt-3">
                                        <span className="text-sm uppercase tracking-widest text-gray-500 mt-1">Total Due</span>
                                        <span className="text-[#e31e24] tracking-tighter">GH₵ {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                                <Lock className="w-3 h-3" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Secure Checkout via ArkAuto</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
