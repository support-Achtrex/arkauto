"use client";

import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Users,
    AlertTriangle,
    ArrowRight,
    Package,
    Clock,
    Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const stats = [
    {
        label: 'Total Revenue',
        value: 'GH₵ 128,450.00',
        change: '+12.5%',
        trend: 'up',
        icon: DollarSign,
        color: 'bg-emerald-50 text-emerald-600'
    },
    {
        label: 'Total Orders',
        value: '456',
        change: '+8.2%',
        trend: 'up',
        icon: ShoppingCart,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        label: 'Active Customers',
        value: '2,840',
        change: '-2.4%',
        trend: 'down',
        icon: Users,
        color: 'bg-purple-50 text-purple-600'
    },
    {
        label: 'Low Stock Items',
        value: '12',
        change: 'Action Required',
        trend: 'neutral',
        icon: AlertTriangle,
        color: 'bg-red-50 text-red-600'
    },
];

const recentOrders = [
    { id: '#ORD-7829', customer: 'John Doe', product: 'Brembo Brake Pads', status: 'Delivered', amount: 'GH₵ 450.00', date: '2 mins ago' },
    { id: '#ORD-7828', customer: 'Sarah Smith', product: 'Mobil 1 Oil 5L', status: 'Processing', amount: 'GH₵ 320.00', date: '15 mins ago' },
    { id: '#ORD-7827', customer: 'Michael Chen', product: 'Philips H11 Bulbs', status: 'Shipped', amount: 'GH₵ 280.00', date: '45 mins ago' },
    { id: '#ORD-7826', customer: 'Kofi Mensah', product: 'NGK Spark Plugs', status: 'Pending', amount: 'GH₵ 240.00', date: '1 hour ago' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening with ArkAuto today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className={cn("p-3 rounded-xl", stat.color)}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-sm font-medium",
                                stat.trend === 'up' ? "text-emerald-600" : stat.trend === 'down' ? "text-red-600" : "text-amber-600"
                            )}>
                                {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : stat.trend === 'down' ? <TrendingDown className="h-4 w-4" /> : null}
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Mockup */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group/chart">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg">Revenue Analysis</h3>
                            <p className="text-xs text-gray-400 font-medium">Daily revenue breakdown for the current period</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                                <TrendingUp className="h-3 w-3" />
                                +12.5%
                            </div>
                            <select className="text-xs border-none bg-gray-50 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-red-100 font-bold text-gray-600 cursor-pointer">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                    </div>

                    <div className="h-72 flex items-end justify-between gap-3 px-2 mb-2">
                        {[45, 65, 40, 80, 55, 90, 70].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 shadow-xl transform translate-y-2 group-hover:translate-y-0 flex flex-col items-center">
                                    <span className="text-gray-400 text-[9px] uppercase font-black tracking-widest block mb-0.5">Revenue</span>
                                    <span className="font-black text-emerald-400">GH₵ {(height * 100).toLocaleString()}</span>
                                    {/* Tooltip Arrow */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                                </div>
                                <div
                                    className={cn(
                                        "w-full rounded-t-xl transition-all duration-500 relative overflow-hidden",
                                        i === 5 ? "bg-[#e31e24] shadow-lg shadow-red-500/30" : "bg-gray-100 group-hover:bg-red-200"
                                    )}
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                </div>
                                <div className="text-[10px] font-black text-gray-400 mt-4 text-center uppercase tracking-widest group-hover:text-red-600 transition-colors">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Recent Activity */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Control Center</h3>
                    <div className="grid grid-cols-1 gap-4 flex-grow">
                        <Link href="/admin/products" className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-red-500 hover:bg-red-50/20 transition-all group/action">
                            <div className="bg-red-50 p-3 rounded-xl text-red-600 group-hover/action:scale-110 transition-transform">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Inventory</p>
                                <p className="text-xs text-gray-500 font-medium">Add or manage parts</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-300 ml-auto group-hover/action:text-red-500 group-hover/action:translate-x-1 transition-all" />
                        </Link>

                        <Link href="/admin/marketing" className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50/20 transition-all group/action">
                            <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover/action:scale-110 transition-transform">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Marketing</p>
                                <p className="text-xs text-gray-500 font-medium">Launch email campaigns</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-300 ml-auto group-hover/action:text-blue-500 group-hover/action:translate-x-1 transition-all" />
                        </Link>

                        <div className="p-5 rounded-2xl bg-gray-50 mt-auto">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Platform Sync</p>
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold text-gray-700">
                                    <span>Cloud Storage</span>
                                    <span className="text-gray-400">85% full</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                    <Link href="/admin/orders" className="text-sm font-semibold text-red-600 hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.map((order, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-semibold text-gray-700">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                {order.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                                <p className="text-[10px] text-gray-400">{order.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                            order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700" :
                                                order.status === 'Processing' ? "bg-blue-100 text-blue-700" :
                                                    order.status === 'Shipped' ? "bg-purple-100 text-purple-700" :
                                                        "bg-amber-100 text-amber-700"
                                        )}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                                            <ArrowRight className="h-5 w-5 ml-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
