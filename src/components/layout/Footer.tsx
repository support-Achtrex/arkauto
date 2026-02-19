"use client";

import Link from 'next/link';
import NextImage from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            {/* Newsletter Section */}
            <div className="container mx-auto px-4 md:px-6 mb-16">
                <div className="bg-[#e31e24] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-red-900/20">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic mb-2">Join the ArkAuto Club</h2>
                        <p className="text-white/80 font-medium">Subscribe for exclusive deals, maintenance tips, and new arrival alerts.</p>
                    </div>
                    <form className="flex w-full md:w-auto gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-white/20 flex-grow md:w-64 placeholder:text-white/50"
                        />
                        <button className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {/* Brand & About */}
                <div>
                    <h2 className="text-2xl font-black mb-4 uppercase italic">Ark<span className="text-[#e31e24]">Auto</span></h2>
                    <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        Ghana's premier destination for genuine automotive parts. We bridge the gap between global manufacturers and local vehicle owners.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e31e24] transition-all">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e31e24] transition-all">
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e31e24] transition-all">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#e31e24] transition-all">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-2 inline-block">Quick Links</h3>
                    <ul className="space-y-3 text-gray-400 text-sm font-medium">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/catalog" className="hover:text-white transition-colors">Shop All Parts</Link></li>
                        <li><Link href="/vin-lookup" className="hover:text-white transition-colors">VIN & OEM Lookup</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Expert</Link></li>
                        <li><Link href="/track-order" className="hover:text-white transition-colors">Order Status</Link></li>
                        <li><Link href="/admin" className="text-gray-600 hover:text-red-500 transition-colors text-xs mt-6 block border border-gray-800 rounded-lg p-2 text-center">Admin Portal</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-2 inline-block">Support</h3>
                    <ul className="space-y-3 text-gray-400 text-sm font-medium">
                        <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                        <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-2 inline-block">Headquarters</h3>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                            <MapPin className="h-5 w-5 text-[#e31e24] mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">Weija (Next to Shell),<br />Accra-Winneba Road,<br />Accra, Ghana</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-[#e31e24] flex-shrink-0" />
                            <span className="font-bold">+233 30 291 5463</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-[#e31e24] flex-shrink-0" />
                            <span>info@arkautoshop.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 text-xs font-medium italic">&copy; {new Date().getFullYear()} ArkAuto. Powered by AchtRex LLC.</p>
                <div className="flex gap-4 opacity-30 grayscale items-center">
                    <NextImage src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} className="h-4 w-auto" />
                    <NextImage src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={20} className="h-6 w-auto" />
                    <span className="text-[10px] font-black tracking-widest uppercase ml-2">MoMo</span>
                </div>
            </div>
        </footer>
    );
}
