"use client";

import { useState } from 'react';
import {
    FileText,
    Plus,
    Search,
    Calendar,
    User,
    Eye,
    Edit,
    Trash2,
    MoreVertical,
    ArrowUpRight,
    MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mockPosts = [
    { id: 1, title: 'How to Choose the Right Brake Pads for Your Car', author: 'David Boateng', status: 'Published', date: 'Feb 10, 2026', views: '2.4k', comments: 12, image: 'https://placehold.co/600x400/e31e24/ffffff?text=Brake+Pads' },
    { id: 2, title: '5 Essential Maintenance Tips for the Rainy Season', author: 'Sarah Owusu', status: 'Published', date: 'Feb 05, 2026', views: '1.8k', comments: 8, image: 'https://placehold.co/600x400/003366/ffffff?text=Car+Maintenance' },
    { id: 3, title: 'Understanding Your Engine: A Beginners Guide', author: 'David Boateng', status: 'Draft', date: 'Feb 12, 2026', views: '0', comments: 0, image: 'https://placehold.co/600x400/333333/ffffff?text=Engine+Guide' },
    { id: 4, title: 'The Future of Electric Vehicle Parts in Ghana', author: 'Ama Serwaa', status: 'Published', date: 'Jan 28, 2026', views: '3.1k', comments: 24, image: 'https://placehold.co/600x400/00aa00/ffffff?text=EV+Ghana' },
];

export default function AdminBlog() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-500">Create and manage education content and news for your customers.</p>
                </div>
                <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">
                    <Plus className="h-5 w-5" />
                    <span>Write New Post</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase mr-2">Filter Status:</span>
                    {['All', 'Published', 'Draft'].map(s => (
                        <button key={s} className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                            s === 'All' ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-100 hover:bg-gray-50"
                        )}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4">
                                <span className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                                    post.status === 'Published' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                                )}>
                                    {post.status}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow-sm">
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:bg-white transition-colors shadow-sm">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                                <span className="flex items-center gap-1.5"><User className="h-3 w-3" /> {post.author}</span>
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                                {post.title}
                            </h2>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                                    <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {post.views}</span>
                                    <span className="flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> {post.comments}</span>
                                </div>
                                <button className="flex items-center gap-1.5 text-xs font-black text-red-600 uppercase tracking-widest hover:underline">
                                    View Post <ArrowUpRight className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
