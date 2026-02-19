"use client";

import { useState } from 'react';
import {
    Users,
    Search,
    UserPlus,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    Shield,
    Clock,
    CheckCircle2,
    XCircle,
    Trash2,
    MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    status: 'Active' | 'Pending' | 'Banned';
    joined: string;
    spent: string;
    role: 'Admin' | 'Customer';
}

const initialUsers: User[] = [
    {
        id: 'USR-001',
        name: 'Kofi Mensah',
        email: 'kofimensah@example.com',
        phone: '+233 24 555 1234',
        location: 'Accra, Ghana',
        status: 'Active',
        joined: 'Jan 12, 2026',
        spent: 'GH₵ 4,250.00',
        role: 'Customer'
    },
    {
        id: 'USR-002',
        name: 'Ama Serwaa',
        email: 'aserwaa@testmail.com',
        phone: '+233 50 123 4567',
        location: 'Kumasi, Ghana',
        status: 'Pending',
        joined: 'Feb 05, 2026',
        spent: 'GH₵ 0.00',
        role: 'Customer'
    },
    {
        id: 'USR-003',
        name: 'David Boateng',
        email: 'david.b@arkauto.com',
        phone: '+233 20 999 8888',
        location: 'Accra, Ghana',
        status: 'Active',
        joined: 'Dec 20, 2025',
        spent: 'GH₵ 12,800.00',
        role: 'Admin'
    },
    {
        id: 'USR-004',
        name: 'Sarah Owusu',
        email: 'sarah.o@gmail.com',
        phone: '+233 24 111 2222',
        location: 'Tamale, Ghana',
        status: 'Banned',
        joined: 'Jan 28, 2026',
        spent: 'GH₵ 850.00',
        role: 'Customer'
    },
    {
        id: 'USR-005',
        name: 'James Wilson',
        email: 'jwilson@exp.com',
        phone: '+44 7700 900000',
        location: 'London, UK',
        status: 'Active',
        joined: 'Feb 10, 2026',
        spent: 'GH₵ 520.00',
        role: 'Customer'
    },
];

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const deleteUser = (id: string) => {
        if (confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const updateStatus = (id: string, status: User['status']) => {
        setUsers(users.map(u => u.id === id ? { ...u, status } : u));
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customer Base</h1>
                    <p className="text-gray-500 text-sm">View and manage your registered users and their activity.</p>
                </div>
                <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                    <UserPlus className="h-5 w-5" />
                    <span>Invite New User</span>
                </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search users by name, ID or email..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-red-100 transition-all group relative overflow-hidden">
                        {/* Background Accent */}
                        <div className={cn(
                            "absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-8 -mt-8 rounded-full",
                            user.role === 'Admin' ? "bg-red-500" : "bg-blue-500"
                        )}></div>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className={cn(
                                    "h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold border-2 shadow-sm",
                                    user.role === 'Admin' ? "bg-red-50 border-red-200 text-red-600" : "bg-gray-50 border-gray-100 text-gray-700"
                                )}>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                                        {user.role === 'Admin' && (
                                            <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded">
                                                <Shield className="h-2.5 w-2.5" /> Staff
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-1">
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Mail className="h-3.5 w-3.5" /> {user.email}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Phone className="h-3.5 w-3.5" /> {user.phone}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <MapPin className="h-3.5 w-3.5" /> {user.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-8 w-full md:w-auto">
                                <div className="flex flex-col items-center md:items-end">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Lifetime Spend</p>
                                    <p className="text-lg font-black text-gray-900 leading-tight">{user.spent}</p>
                                </div>

                                <div className="flex flex-col items-center md:items-end">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Status</p>
                                    <div className="relative group/status">
                                        <div className={cn(
                                            "flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mt-1 cursor-pointer transition-all border",
                                            user.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                user.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                    "bg-red-50 text-red-600 border-red-100"
                                        )}>
                                            {user.status === 'Active' ? <CheckCircle2 className="h-3.5 w-3.5" /> :
                                                user.status === 'Pending' ? <Clock className="h-3.5 w-3.5" /> :
                                                    <XCircle className="h-3.5 w-3.5" />}
                                            {user.status}
                                        </div>
                                        {/* Status Toggle Picker */}
                                        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-20 hidden group-hover/status:block min-w-[120px]">
                                            {['Active', 'Pending', 'Banned'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateStatus(user.id, s as any)}
                                                    className="w-full text-left px-3 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase hover:bg-gray-50 text-gray-600 transition-colors"
                                                >
                                                    Set to {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="h-10 w-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-gray-100"
                                        title="Remove User"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <button className="h-10 w-10 flex items-center justify-center bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-100">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                            <span>Customer Since: {user.joined}</span>
                            <span>Customer ID: {user.id}</span>
                        </div>
                    </div>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                        <Users className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No users found</h3>
                        <p className="text-gray-500">Try searching with a different term.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
