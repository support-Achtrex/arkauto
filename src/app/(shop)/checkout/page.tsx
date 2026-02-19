"use client";

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, CreditCard, Truck, ClipboardList, ShieldCheck } from 'lucide-react';
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                        <ClipboardList className="w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900">Your cart is empty</h1>
                    <p className="text-gray-500 mb-8">Add components to your cart to begin the checkout process.</p>
                    <Link href="/catalog">
                        <Button className="w-full bg-[#111] hover:bg-black">Return to Catalog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12 overflow-x-auto pb-4">
                    <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'shipping' ? 'text-[#e31e24] font-bold' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'shipping' ? 'border-[#e31e24] bg-red-50' : 'border-gray-200'}`}>1</div>
                        <span className="text-xs md:text-sm">Shipping</span>
                    </div>
                    <div className="w-8 md:w-12 h-px bg-gray-200 mx-2 md:mx-4"></div>
                    <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'review' ? 'text-[#e31e24] font-bold' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'review' ? 'border-[#e31e24] bg-red-50' : 'border-gray-200'}`}>2</div>
                        <span className="text-xs md:text-sm">Review</span>
                    </div>
                    <div className="w-8 md:w-12 h-px bg-gray-200 mx-2 md:mx-4"></div>
                    <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'payment' ? 'text-[#e31e24] font-bold' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'payment' ? 'border-[#e31e24] bg-red-50' : 'border-gray-200'}`}>3</div>
                        <span className="text-xs md:text-sm">Payment</span>
                    </div>
                    <div className="w-8 md:w-12 h-px bg-gray-200 mx-2 md:mx-4"></div>
                    <div className={`flex items-center gap-2 whitespace-nowrap ${step === 'confirmation' ? 'text-green-600 font-bold' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'confirmation' ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>4</div>
                        <span className="text-xs md:text-sm">Done</span>
                    </div>
                </div>

                {step === 'confirmation' ? (
                    <div className="max-w-xl mx-auto bg-white p-12 rounded-2xl shadow-xl text-center border border-gray-100">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Thank you for your purchase. We have received your order (<strong>{orderId}</strong>) and are processing it.
                            A confirmation email has been sent to <span className="font-bold text-gray-900">{formData.email}</span>.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/catalog" className="flex-1">
                                <Button className="w-full bg-[#e31e24] hover:bg-red-700 text-white">Continue Shopping</Button>
                            </Link>
                            <Link href="/account" className="flex-1">
                                <Button variant="outline" className="w-full">Track Order</Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {step === 'shipping' && (
                                <form onSubmit={handleSubmitShipping} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="bg-red-50 p-2 rounded-lg"><Truck className="w-5 h-5 text-[#e31e24]" /></div>
                                        <span>Shipping Details</span>
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                            <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                                            <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                    </div>

                                    <div className="space-y-1 mb-6">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Delivery Address</label>
                                        <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">City / Town</label>
                                            <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Region</label>
                                            <select className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 font-bold text-gray-600">
                                                <option>Greater Accra</option>
                                                <option>Ashanti Region</option>
                                                <option>Western Region</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-gray-50">
                                        <Button type="submit" size="lg" className="bg-[#111] hover:bg-black text-white px-12 h-14 rounded-2xl font-bold shadow-xl shadow-gray-200">
                                            Review My Order
                                        </Button>
                                    </div>
                                </form>
                            )}

                            {step === 'review' && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                            <div className="bg-amber-50 p-2 rounded-lg"><ClipboardList className="w-5 h-5 text-amber-600" /></div>
                                            <span>Review Order</span>
                                        </h2>
                                        <button onClick={() => setStep('shipping')} className="text-sm font-bold text-[#e31e24] hover:underline">Edit Shipping</button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-6 bg-gray-50 rounded-2xl">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Customer Details</p>
                                            <p className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</p>
                                            <p className="text-sm text-gray-500">{formData.email}</p>
                                            <p className="text-sm text-gray-500">{formData.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Shipping Information</p>
                                            <p className="text-sm text-gray-700 font-medium">{formData.address}</p>
                                            <p className="text-sm text-gray-700 font-medium">{formData.city}, Ghana</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl mb-12">
                                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">All items are in stock and ready for immediate shipping.</p>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 pt-6 border-t border-gray-50">
                                        <button onClick={() => setStep('shipping')} className="text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" /> Go Back
                                        </button>
                                        <Button onClick={() => setStep('payment')} size="lg" className="bg-[#e31e24] hover:bg-red-700 text-white px-12 h-14 rounded-2xl font-bold shadow-xl shadow-red-200">
                                            Proceed to Payment
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 'payment' && (
                                <form onSubmit={handlePlaceOrder} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg"><CreditCard className="w-5 h-5 text-blue-600" /></div>
                                        <span>Payment Details</span>
                                    </h2>

                                    <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex flex-col items-center gap-4 text-center border-2 border-dashed border-gray-200">
                                        <div className="bg-white p-3 rounded-full shadow-sm"><ShieldCheck className="w-8 h-8 text-emerald-500" /></div>
                                        <div>
                                            <p className="font-bold text-gray-900">Secure Payment Simulation</p>
                                            <p className="text-xs text-gray-500 max-w-xs mt-1">This is a demonstration. Your card will not be charged. Click below to complete the simulated transaction.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6 mb-12">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Number</label>
                                            <div className="relative">
                                                <input required placeholder="0000 0000 0000 0000" className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 font-mono" />
                                                <div className="absolute right-4 top-3 text-gray-300"><CreditCard className="w-6 h-6" /></div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Expiry</label>
                                                <input required placeholder="MM/YY" className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CVC</label>
                                                <input required placeholder="123" className="w-full h-12 px-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 pt-6 border-t border-gray-50">
                                        <button type="button" onClick={() => setStep('review')} className="text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" /> Review
                                        </button>
                                        <Button type="submit" size="lg" disabled={isLoading} className="bg-[#111] hover:bg-black text-white px-12 h-14 rounded-2xl font-bold shadow-xl shadow-gray-200 min-w-[200px]">
                                            {isLoading ? 'Processing...' : `Pay GH₵ ${totalPrice.toLocaleString()}`}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                                <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center justify-between">
                                    <span>Summary</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{items.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                                </h3>
                                <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4 text-sm">
                                            <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
                                                <img src={item.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-gray-900 line-clamp-1">{item.name}</p>
                                                <div className="flex justify-between text-gray-500 mt-1 font-medium">
                                                    <span>x{item.quantity}</span>
                                                    <span className="text-gray-900 italic">GH₵{item.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-50 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900">GH₵ {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest bg-emerald-50 px-2 rounded">Free</span>
                                    </div>
                                    <div className="flex justify-between font-black text-2xl text-gray-900 border-t border-gray-50 mt-4 pt-6">
                                        <span className="text-base uppercase tracking-widest text-gray-400">Total</span>
                                        <span>GH₵ {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
