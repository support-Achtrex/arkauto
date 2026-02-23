"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, Heart, X, Phone, HelpCircle, Package, Car, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Header() {
    const { totalItems } = useCart();
    const { totalItems: wishlistCount } = useWishlist();
    const [searchValue, setSearchValue] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchValue.trim();
        if (query) {
            if (query.length === 17 && /^[A-Z0-9]+$/i.test(query)) {
                router.push(`/vin-lookup?vin=${query.toUpperCase()}`);
            } else {
                router.push(`/catalog?q=${encodeURIComponent(query)}`);
            }
            setIsMenuOpen(false);
        }
    };

    const categories = [
        { name: 'REPLACEMENT PARTS', href: '/catalog' },
        { name: 'PERFORMANCE', href: '/catalog?category=performance' },
        { name: 'ACCESSORIES', href: '/catalog?category=accessories' },
        { name: 'FLUIDS & CHEMICALS', href: '/catalog?category=fluids' },
        { name: 'TOOLS & GARAGE', href: '/catalog?category=tools' },
        { name: 'WHEELS & TIRES', href: '/catalog?category=wheels' },
        { name: 'LIGHTING', href: '/catalog?category=lighting' },
    ];

    return (
        <header className="w-full bg-white flex flex-col z-50 shadow-md">
            {/* Top Utility Bar */}
            <div className="bg-[#f0f0f0] border-b border-gray-200 hidden md:block">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-8 items-center justify-between text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1 hover:text-[#e31e24] cursor-pointer transition-colors">
                                <Phone className="h-3 w-3" /> Tech Support: +233 (0) 555 123 456
                            </span>
                            <span className="text-gray-400">|</span>
                            <span>M-F 8AM - 6PM GMT</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="/help" className="flex items-center gap-1 hover:text-[#e31e24] transition-colors">
                                <HelpCircle className="h-3 w-3" /> Help Center
                            </Link>
                            <Link href="/account/orders" className="flex items-center gap-1 hover:text-[#e31e24] transition-colors">
                                <Package className="h-3 w-3" /> Track Order
                            </Link>
                            <Link href="/returns" className="hover:text-[#e31e24] transition-colors">Returns</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-20 items-center justify-between gap-4 md:gap-8">
                        {/* Mobile Menu Toggle & Logo */}
                        <div className="flex items-center gap-3">
                            <button
                                className="md:hidden p-1 text-gray-700 hover:text-[#e31e24] transition-colors"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu className="h-7 w-7" />
                            </button>
                            <Link href="/" className="flex items-center shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="ArkAuto Logo"
                                    width={180}
                                    height={45}
                                    className="h-8 md:h-12 w-auto object-contain"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Desktop Search Bar (Massive) */}
                        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-3xl relative">
                            <div className="flex w-full group shadow-sm rounded-lg overflow-hidden border-2 border-gray-300 focus-within:border-[#e31e24] focus-within:ring-4 focus-within:ring-[#e31e24]/10 transition-all">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Enter Keyword, Part Number, or VIN..."
                                    className="w-full h-11 pl-4 pr-4 bg-white focus:outline-none text-gray-800 font-medium placeholder-gray-400"
                                />
                                <button type="submit" className="h-11 px-8 bg-[#e31e24] hover:bg-red-700 flex items-center justify-center text-white transition-colors">
                                    <Search className="h-5 w-5 font-bold" />
                                </button>
                            </div>
                        </form>

                        {/* Select Vehicle Button & Right Actions */}
                        <div className="flex items-center gap-2 md:gap-6 shrink-0">
                            {/* "My Garage" / Vehicle Selector */}
                            <button className="hidden xl:flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 px-4 py-2 rounded-lg transition-colors group">
                                <div className="bg-[#e31e24] p-1.5 rounded-md text-white group-hover:bg-red-700 transition-colors">
                                    <Car className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col items-start px-1">
                                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">My Garage</span>
                                    <span className="text-sm font-bold text-gray-900 leading-tight">Select Vehicle</span>
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
                            </button>

                            <div className="flex items-center gap-1 md:gap-3">
                                <Link href="/account" className="flex flex-col items-center justify-center text-gray-700 hover:text-[#e31e24] p-2 transition-colors">
                                    <User className="h-6 w-6 mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Sign In</span>
                                </Link>

                                <Link href="/wishlist" className="flex flex-col items-center justify-center text-gray-700 hover:text-[#e31e24] relative p-2 transition-colors">
                                    <div className="relative">
                                        <Heart className="h-6 w-6 mb-1" />
                                        {wishlistCount > 0 && (
                                            <span className="absolute -top-1 -right-2 bg-[#e31e24] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                                                {wishlistCount}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Saved</span>
                                </Link>

                                <Link href="/cart" className="flex flex-col items-center justify-center text-gray-700 hover:text-[#e31e24] relative p-2 transition-colors">
                                    <div className="relative">
                                        <ShoppingCart className="h-6 w-6 mb-1" />
                                        {totalItems > 0 && (
                                            <span className="absolute -top-1 -right-2 bg-[#e31e24] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                                                {totalItems}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Cart</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Mobile/Tablet Search */}
                    <form onSubmit={handleSearch} className="lg:hidden pb-4">
                        <div className="flex w-full group shadow-sm rounded-lg overflow-hidden border-2 border-gray-300 focus-within:border-[#e31e24]">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Part Number, Keyword, VIN..."
                                className="w-full h-10 pl-3 pr-3 bg-white focus:outline-none text-gray-800 text-sm font-medium"
                            />
                            <button type="submit" className="h-10 px-4 bg-[#e31e24] text-white flex items-center justify-center">
                                <Search className="h-4 w-4 font-bold" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Dense Category Navigation Bar */}
            <div className="hidden md:block bg-[#111111] border-b-4 border-[#e31e24]">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center justify-start xl:justify-center gap-0 overflow-x-auto whitespace-nowrap hide-scrollbar">
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                href={cat.href}
                                className="px-5 py-3.5 text-[12px] font-bold text-white uppercase tracking-wider hover:bg-[#e31e24] transition-colors border-r border-gray-800 last:border-r-0"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Content */}
            <div className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 bg-[#111111] text-white flex items-center justify-between border-b-2 border-[#e31e24]">
                    <span className="font-black italic text-xl">Ark<span className="text-[#e31e24]">Auto</span></span>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-300 hover:text-white transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Garage Feature */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <button className="w-full flex items-center justify-between bg-white border border-gray-300 p-3 rounded-lg hover:border-[#e31e24] transition-colors shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#e31e24] p-2 rounded-md text-white">
                                <Car className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs uppercase font-bold text-gray-500">My Garage</span>
                                <span className="text-sm font-bold text-gray-900">Select Vehicle</span>
                            </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto w-full">
                    <div className="py-2">
                        <div className="px-4 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Departments</div>
                        {categories.map((cat, index) => (
                            <Link
                                key={index}
                                href={cat.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 text-gray-800 font-bold border-b border-gray-100 text-sm"
                            >
                                <span>{cat.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="py-2 mt-2 bg-gray-50 border-t border-gray-200">
                        <Link
                            href="/account"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 text-gray-700 font-bold text-sm border-b border-gray-200"
                        >
                            <User className="h-5 w-5 text-gray-500" />
                            <span>My Account</span>
                        </Link>
                        <Link
                            href="/vin-lookup"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100 text-[#e31e24] font-black text-sm"
                        >
                            <Search className="h-5 w-5" />
                            <span>VIN Lookup</span>
                        </Link>
                    </div>
                </nav>
                <div className="p-4 bg-[#111111] text-center border-t border-gray-800">
                    <p className="text-xs text-gray-400 font-bold tracking-wider">&copy; {new Date().getFullYear()} ArkAuto Ghana</p>
                </div>
            </div>
        </header>
    );
}
