"use client";

import { useState, useEffect } from 'react';

import { useSettings } from '@/context/SettingsContext';
import {
    Settings,
    Shield,
    Bell,
    Globe,
    CreditCard,
    Save,
    Lock,
    User,
    Database,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettings() {
    const { settings, updateSettings, isLoading } = useSettings();
    const [activeTab, setActiveTab] = useState('General');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        storeName: settings.storeName,
        supportEmail: settings.supportEmail,
        physicalAddress: settings.physicalAddress,
        phone: settings.phone,
        currency: settings.currency,
        taxRate: settings.taxRate
    });

    // Update form when settings load
    useEffect(() => {
        setFormData({
            storeName: settings.storeName,
            supportEmail: settings.supportEmail,
            physicalAddress: settings.physicalAddress,
            phone: settings.phone,
            currency: settings.currency,
            taxRate: settings.taxRate
        });
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateSettings(formData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'General', icon: Settings },
        { id: 'Security', icon: Shield },
        { id: 'Notifications', icon: Bell },
        { id: 'Payments', icon: CreditCard },
        { id: 'System', icon: Database },
    ];

    if (isLoading) return <div className="p-8 text-center font-bold">Loading Settings...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Portal Settings</h1>
                    <p className="text-gray-500">Configure your store preferences and administrative controls.</p>
                </div>
                {showSuccess && (
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                        <Check className="h-4 w-4" />
                        Settings saved successfully!
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <div className="w-full lg:w-64 space-y-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-sm transition-all",
                                activeTab === tab.id
                                    ? "bg-red-50 text-red-600 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            <tab.icon className="h-5 w-5" />
                            {tab.id}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-8 space-y-8">
                            {activeTab === 'General' && (
                                <>
                                    <section className="space-y-4">
                                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-2">Store Appearance</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Store Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.storeName}
                                                    onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Default Currency</label>
                                                <select
                                                    value={formData.currency}
                                                    onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 font-bold"
                                                >
                                                    <option value="GHS">GHS (GH₵)</option>
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="space-y-4 pt-4">
                                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-2">Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.supportEmail}
                                                    onChange={e => setFormData({ ...formData, supportEmail: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support Phone</label>
                                                <input
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5 pt-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Physical Address</label>
                                            <textarea
                                                rows={3}
                                                value={formData.physicalAddress}
                                                onChange={e => setFormData({ ...formData, physicalAddress: e.target.value })}
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20 font-medium"
                                            />
                                        </div>
                                    </section>
                                </>
                            )}

                            {activeTab === 'Security' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-red-500 text-white p-2 rounded-lg">
                                                <Lock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-red-900">Two-Factor Authentication</p>
                                                <p className="text-xs text-red-700">Add an extra layer of security to your account.</p>
                                            </div>
                                        </div>
                                        <button className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold">Enable</button>
                                    </div>
                                    <section className="space-y-4">
                                        <h3 className="font-bold text-gray-900">Change Password</h3>
                                        <div className="space-y-4">
                                            <input type="password" placeholder="Current Password" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20" />
                                            <input type="password" placeholder="New Password" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20" />
                                            <input type="password" placeholder="Confirm New Password" className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500/20" />
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-[#e31e24] disabled:bg-gray-400 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-red-500/20 active:scale-95 transition-all"
                            >
                                {isSaving ? "Saving..." : <><Save className="h-5 w-5" /> Save Changes</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
