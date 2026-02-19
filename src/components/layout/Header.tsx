"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, User, Menu, Heart, X } from 'lucide-react';
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
            // Check if it's likely a VIN (17 characters alphanumeric)
            if (query.length === 17 && /^[A-Z0-9]+$/i.test(query)) {
                router.push(`/vin-lookup?vin=${query.toUpperCase()}`);
            } else {
                router.push(`/catalog?q=${encodeURIComponent(query)}`);
            }
            setIsMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Categories', href: '/catalog' },
        { name: 'VIN Lookup', href: '/vin-lookup', badge: 'NEW' },
        { name: 'Brands', href: '/brands' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Left: Mobile Menu Toggle & Logo */}
                    <div className="flex items-center gap-2">
                        <button
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-[#e31e24] transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 shrink-0">
                            <Image
                                src="/logo.png"
                                alt="ArkAuto Logo"
                                width={150}
                                height={40}
                                className="h-8 md:h-10 w-auto object-contain"
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Center: Search Bar - Desktop Only */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search by Part Number, Name or VIN..."
                            className="w-full h-10 pl-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e31e24]"
                        />
                        <button type="submit" className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-[#e31e24]">
                            <Search className="h-5 w-5" />
                        </button>
                    </form>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Link href="/wishlist" className="flex flex-col items-center text-xs text-gray-600 hover:text-[#e31e24] relative p-2">
                            <Heart className="h-6 w-6" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 bg-[#e31e24] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {wishlistCount}
                                </span>
                            )}
                            <span className="hidden md:inline">Wishlist</span>
                        </Link>

                        <Link href="/cart" className="flex flex-col items-center text-xs text-gray-600 hover:text-[#e31e24] relative p-2">
                            <ShoppingCart className="h-6 w-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-1 right-1 bg-[#e31e24] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                    {totalItems}
                                </span>
                            )}
                            <span className="hidden md:inline">Cart</span>
                        </Link>

                        <Link href="/account" className="hidden md:flex flex-col items-center text-xs text-gray-600 hover:text-[#e31e24] p-2">
                            <User className="h-6 w-6" />
                            <span>Account</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar - Mobile Only */}
                <form onSubmit={handleSearch} className="md:hidden py-2 pb-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search parts..."
                            className="w-full h-10 pl-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e31e24] text-sm"
                        />
                        <button type="submit" className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Desktop Secondary Nav */}
            <div className="hidden md:block bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <nav className="flex items-center justify-center gap-8 py-2 text-sm font-medium text-gray-600">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-[#e31e24] flex items-center gap-2 transition-colors"
                            >
                                {link.badge && (
                                    <span className="bg-gray-900 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-tighter uppercase">{link.badge}</span>
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar Content */}
            <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b flex items-center justify-between">
                    <span className="font-black italic text-xl">Ark<span className="text-[#e31e24]">Auto</span></span>
                    <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-black">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-bold transition-colors"
                        >
                            <span>{link.name}</span>
                            {link.badge && (
                                <span className="bg-[#e31e24] text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-black">{link.badge}</span>
                            )}
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        <Link
                            href="/account"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-bold"
                        >
                            <User className="h-5 w-5" />
                            <span>My Account</span>
                        </Link>
                    </div>
                </nav>
                <div className="p-4 bg-gray-50 border-t">
                    <p className="text-xs text-gray-400 text-center font-medium">&copy; {new Date().getFullYear()} ArkAuto Ghana</p>
                </div>
            </div>
        </header>
    );
}
