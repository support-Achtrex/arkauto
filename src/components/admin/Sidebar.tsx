"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Mail,
    FileText,
    Settings,
    LogOut,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Inventory', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/users' },
    { icon: Mail, label: 'Marketing', href: '/admin/marketing' },
    { icon: FileText, label: 'Blog Posts', href: '/admin/blog' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col sticky top-0">
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <div className="bg-[#e31e24] p-1.5 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-tight">ArkAuto</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Admin Portal</p>
                </div>
            </div>

            <nav className="flex-grow p-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-[#e31e24] text-white shadow-lg shadow-red-900/20"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-gray-400")} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-all duration-200 group">
                    <LogOut className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

// Helper for Tailwind classes from the project
// Handled by @/lib/utils
