"use client";

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { User, LogOut, Package, MapPin, CreditCard, Settings, Plus, Trash2, Edit2, CheckCircle, Bell, ShieldCheck, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'orders' | 'addresses' | 'settings';

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState<string | null>(null);
    const router = useRouter();

    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+233 20 123 4567',
        dob: '1990-01-01'
    });

    const handleLogout = () => {
        router.push('/');
    };

    const saveProfile = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            triggerToast('Profile successfully updated!');
        }, 1500);
    };

    const triggerToast = (msg: string) => {
        setShowToast(msg);
        setTimeout(() => setShowToast(null), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-12 relative">
            {/* Toast Notification */}
            <div className={cn(
                "fixed top-24 right-8 z-[100] transition-all duration-500 transform",
                showToast ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0 pointer-events-none"
            )}>
                <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/10">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-sm tracking-wide">{showToast}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full md:w-80 space-y-4">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-fit">
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border-2 border-gray-100 overflow-hidden">
                                    <User className="w-12 h-12" />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                            <h2 className="text-xl font-black text-gray-900">{profile.name}</h2>
                            <p className="text-xs text-gray-400 uppercase tracking-widest font-black mt-1">GHS Tier Member</p>
                        </div>

                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as Tab)}
                                    className={cn(
                                        "w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all",
                                        activeTab === tab.id ? "bg-[#e31e24] text-white shadow-lg shadow-red-100" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <tab.icon className="w-4 h-4" /> <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black mb-2 flex items-center gap-2 italic">
                                ARK <span className="text-[#e31e24] shadow-red-500/20">PREMIUM</span>
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed mb-6">Enjoy free nationwide shipping on all orders and 24/7 technical support.</p>
                            <Button className="w-full bg-[#e31e24] hover:bg-red-700 text-white rounded-xl font-bold h-12 shadow-xl shadow-red-900/40">View Benefits</Button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                            <ShieldCheck className="w-40 h-40" />
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-sm font-black text-gray-400 hover:bg-white hover:text-red-600 transition-all border-2 border-transparent hover:border-red-50"
                    >
                        <LogOut className="w-4 h-4" /> LOG OUT
                    </button>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-10 min-h-[680px]">
                    {activeTab === 'profile' && (
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Profile Information</h2>
                            <p className="text-gray-400 text-sm mb-10">Manage your personal details and how we contact you.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full h-12 px-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full h-12 px-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full h-12 px-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={profile.dob}
                                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                        className="w-full h-12 px-5 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-red-500/20 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-8 border-t border-gray-50">
                                <Button
                                    onClick={saveProfile}
                                    disabled={isSaving}
                                    className="bg-gray-900 hover:bg-black text-white px-10 h-14 rounded-2xl font-black shadow-xl shadow-gray-200 transition-all active:scale-95"
                                >
                                    {isSaving ? "SAVING..." : "SAVE CHANGES"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-3xl font-black text-gray-900">Order History</h2>
                                <span className="bg-gray-100 text-[10px] font-black px-3 py-1 rounded-full text-gray-500">3 ORDERS</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-10">Track your shipments and view past purchases.</p>

                            <div className="space-y-6">
                                {[1, 2, 3].map((order) => (
                                    <div key={order} className="group border border-gray-100 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50/50 transition-all cursor-pointer">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-white group-hover:shadow-md transition-all">
                                                <Package className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-[#e31e24] uppercase tracking-widest mb-1">Delivered</p>
                                                <p className="font-black text-gray-900 text-lg">Order #ARK-{1000 + order}</p>
                                                <p className="text-xs text-gray-400 font-bold">Jan {12 + order}, 2026 • 2 Items</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 md:mt-0 text-right flex flex-col items-end">
                                            <p className="font-black text-gray-900 text-2xl">GH₵{(order * 150 + 50).toLocaleString()}</p>
                                            <Button variant="ghost" className="text-gray-400 hover:text-gray-900 font-black text-[10px] tracking-widest p-0 mt-2">DOWNLOAD INVOICE</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-3xl font-black text-gray-900">Saved Addresses</h2>
                                <Button onClick={() => triggerToast('Address manager coming soon!')} className="bg-white border-2 border-gray-100 hover:border-gray-900 text-gray-900 rounded-2xl px-6 h-12 font-black text-xs gap-3 transition-all">
                                    <Plus className="w-4 h-4" /> ADD NEW
                                </Button>
                            </div>
                            <p className="text-gray-400 text-sm mb-10">Primary addresses used for checkout and billing.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border-2 border-[#e31e24] bg-red-50/10 rounded-3xl p-8 relative">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-[#e31e24] text-white text-[10px] font-black px-3 py-1 rounded-full">HOME</span>
                                        <div className="bg-white p-1.5 rounded-full shadow-sm">
                                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                                        </div>
                                    </div>
                                    <p className="font-black text-gray-900 text-lg mb-4">{profile.name}</p>
                                    <div className="text-sm text-gray-600 font-bold space-y-1">
                                        <p>123 Independence Avenue</p>
                                        <p>Ridge, Accra</p>
                                        <p>Greater Accra, Ghana</p>
                                        <p className="pt-4 text-gray-400 text-xs">{profile.phone}</p>
                                    </div>
                                    <div className="mt-8 flex gap-3">
                                        <button onClick={() => triggerToast('Editing address...')} className="text-[10px] font-black tracking-widest uppercase text-[#e31e24] hover:opacity-70 transition-opacity">Edit</button>
                                    </div>
                                </div>

                                <div className="border-2 border-gray-100 rounded-3xl p-8 hover:border-gray-900 transition-all flex flex-col justify-center items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:bg-gray-100 transition-all">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <p className="text-xs font-black text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-widest">Add Another Address</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Account Settings</h2>
                            <p className="text-gray-400 text-sm mb-10">Control your security preferences and notifications.</p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-8 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-50">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm"><Bell className="w-5 h-5 text-gray-900" /></div>
                                        <div>
                                            <h3 className="font-black text-gray-900">Marketing Emails</h3>
                                            <p className="text-xs text-gray-400 font-bold">Receive updates on new performance parts</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#e31e24]"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-8 bg-gray-50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-50">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm"><ShieldCheck className="w-5 h-5 text-gray-900" /></div>
                                        <div>
                                            <h3 className="font-black text-gray-900">Two-Factor Authentication</h3>
                                            <p className="text-xs text-gray-400 font-bold">Protect your account with SMS verification</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="rounded-xl font-bold border-2 border-gray-100 hover:border-gray-900 px-6">ENABLE</Button>
                                </div>

                                <div className="mt-12 p-10 border-2 border-red-50 rounded-3xl flex items-center justify-between bg-red-50/10">
                                    <div>
                                        <h3 className="font-black text-red-600 mb-1">Delete Account</h3>
                                        <p className="text-xs text-red-600/60 font-medium">This action is permanent and cannot be undone.</p>
                                    </div>
                                    <Button variant="outline" className="border-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-xl font-black px-8">DELETE FOREVER</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
