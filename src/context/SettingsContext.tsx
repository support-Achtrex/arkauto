"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SiteSettings {
    storeName: string;
    supportEmail: string;
    physicalAddress: string;
    phone: string;
    currency: string;
    taxRate: number;
}

interface SettingsContextType {
    settings: SiteSettings;
    updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
    isLoading: boolean;
}

const defaultSettings: SiteSettings = {
    storeName: "ArkAuto Ghana",
    supportEmail: "support@arkauto.com",
    physicalAddress: "123 Motorway View, Accra, Ghana",
    phone: "+233 24 000 0000",
    currency: "GHS",
    taxRate: 15
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('site-settings');
                return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
            } catch (e) {
                return defaultSettings;
            }
        }
        return defaultSettings;
    });

    const updateSettings = async (newSettings: Partial<SiteSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        if (typeof window !== 'undefined') {
            localStorage.setItem('site-settings', JSON.stringify(updated));
        }
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoading: false }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
