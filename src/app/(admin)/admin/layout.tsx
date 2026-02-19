import AdminSidebar from '@/components/admin/Sidebar';
import { Bell, Search, User } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                {/* Admin Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">ArkAuto Control Center</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="bg-gray-100 border-none rounded-full py-1.5 px-4 pl-10 text-sm focus:ring-2 focus:ring-red-500/20 transition-all w-64"
                            />
                            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5 group-focus-within:text-red-500" />
                        </div>
                        <button className="relative text-gray-500 hover:text-red-500 transition-colors">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900 leading-none">Admin User</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Super Admin</p>
                            </div>
                            <div className="h-9 w-9 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                AU
                            </div>
                        </div>
                    </div>
                </header>

                {/* Admin Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
