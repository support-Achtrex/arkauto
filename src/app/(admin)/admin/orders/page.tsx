"use client";

import { useState, useMemo } from 'react';
import { useOrders, Order, OrderItem } from '@/context/OrderContext';
import { useProducts } from '@/context/ProductContext';
import {
    ShoppingCart,
    Search,
    Filter,
    Calendar,
    Download,
    Eye,
    Truck,
    CheckCircle2,
    Clock,
    AlertCircle,
    MoreHorizontal,
    XCircle,
    Package,
    X,
    MapPin,
    Phone,
    Mail,
    User,
    CreditCard,
    Trash2,
    FileText,
    MailPlus,
    Plus,
    Edit3,
    ArrowRight,
    ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

const generateItemId = () => `item-${Date.now()}`;
const generateOrderId = () => `#ORD-${Math.floor(Math.random() * 9000) + 1000}`;

export default function AdminOrders() {
    // ... existing hook calls ...
    const { orders, updateOrderStatus, addOrder, updateOrder, deleteOrder } = useOrders();
    const { products } = useProducts();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showActionsDropdown, setShowActionsDropdown] = useState<string | null>(null);

    // Order Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [formStep, setFormStep] = useState(1);
    const [orderForm, setOrderForm] = useState<Partial<Order>>({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        shippingAddress: '',
        items: [],
        status: 'Pending Approval',
        paymentMethod: 'Bank Transfer'
    });

    const filteredOrders = orders.filter(o => {
        const matchesStatus = filter === 'All' || o.status === filter;
        const matchesSearch = o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const handleActionClick = (orderId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setShowActionsDropdown(showActionsDropdown === orderId ? null : orderId);
    };

    const handleOpenAddModal = () => {
        setEditingOrder(null);
        setOrderForm({
            customerName: '',
            customerEmail: '',
            customerPhone: '',
            shippingAddress: '',
            items: [],
            status: 'Pending Approval',
            paymentMethod: 'Bank Transfer',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        });
        setFormStep(1);
        setIsFormOpen(true);
    };

    const handleOpenEditModal = (order: Order) => {
        setEditingOrder(order);
        setOrderForm({ ...order });
        setFormStep(1);
        setIsFormOpen(true);
        setShowActionsDropdown(null);
    };

    const addItemToForm = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = (orderForm.items || []).find(item => item.productId === productId);
        if (existingItem) {
            updateItemQuantity(productId, existingItem.quantity + 1);
            return;
        }

        const newItem: OrderItem = {
            id: generateItemId(),
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        };

        setOrderForm(prev => ({
            ...prev,
            items: [...(prev.items || []), newItem]
        }));
    };

    const removeItemFromForm = (productId: string) => {
        setOrderForm(prev => ({
            ...prev,
            items: (prev.items || []).filter(item => item.productId !== productId)
        }));
    };

    const updateItemQuantity = (productId: string, qty: number) => {
        if (qty < 1) return;
        setOrderForm(prev => ({
            ...prev,
            items: (prev.items || []).map(item => item.productId === productId ? { ...item, quantity: qty } : item)
        }));
    };

    const formTotals = useMemo(() => {
        const subtotal = (orderForm.items || []).reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    }, [orderForm.items]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalOrder: Order = {
            id: editingOrder?.id || generateOrderId(),
            customerName: orderForm.customerName || 'Walk-in Customer',
            customerEmail: orderForm.customerEmail || '',
            customerPhone: orderForm.customerPhone || '',
            shippingAddress: orderForm.shippingAddress || '',
            items: orderForm.items || [],
            subtotal: formTotals.subtotal,
            tax: formTotals.tax,
            total: formTotals.total,
            status: orderForm.status || 'Pending Approval',
            date: orderForm.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            paymentMethod: orderForm.paymentMethod || 'Bank Transfer'
        };

        if (editingOrder) {
            updateOrder(finalOrder);
        } else {
            addOrder(finalOrder);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                    <p className="text-gray-500 font-medium">Track, process, and manage customer orders.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all border border-gray-200 active:scale-95">
                        <Download className="h-4 w-4" />
                        <span>Export CSV</span>
                    </button>
                    <button
                        onClick={handleOpenAddModal}
                        className="flex items-center gap-2 bg-[#e31e24] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-red-500/10 active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Register Order</span>
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full text-gray-400 focus-within:text-[#e31e24] transition-colors">
                    <Search className="h-4 w-4 absolute left-3 top-3 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by ID or customer..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 font-bold text-gray-700 placeholder:text-gray-400 placeholder:font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {['All', 'Pending Approval', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                filter === status
                                    ? "bg-[#e31e24] text-white shadow-lg shadow-red-500/20"
                                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100">
                                <th className="px-6 py-5">Order ID</th>
                                <th className="px-6 py-5">Customer</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Items</th>
                                <th className="px-6 py-5">Total</th>
                                <th className="px-6 py-5">Date</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs font-black text-[#e31e24] uppercase">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500 uppercase">
                                                {order.customerName.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{order.customerName}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.customerEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="relative group/status flex items-center" onClick={(e) => e.stopPropagation()}>
                                            <div className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer",
                                                order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                    order.status === 'Processing' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                        order.status === 'Shipped' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                                            order.status === 'Cancelled' ? "bg-gray-50 text-gray-400 border-gray-100" :
                                                                "bg-amber-50 text-amber-600 border-amber-100"
                                            )}>
                                                {order.status === 'Delivered' ? <CheckCircle2 className="h-3 w-3" /> :
                                                    order.status === 'Shipped' ? <Truck className="h-3 w-3" /> :
                                                        order.status === 'Processing' ? <Clock className="h-3 w-3" /> :
                                                            order.status === 'Cancelled' ? <XCircle className="h-3 w-3" /> :
                                                                <AlertCircle className="h-3 w-3" />}
                                                {order.status}
                                            </div>
                                            {/* Quick Status Picker */}
                                            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 z-[60] hidden group-hover/status:block min-w-[180px] animate-in fade-in slide-in-from-top-2">
                                                {['Pending Approval', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => updateOrderStatus(order.id, s as any)}
                                                        className="w-full text-left px-3 py-2.5 rounded-lg text-[10px] font-black tracking-widest uppercase hover:bg-gray-50 text-gray-600 transition-colors flex items-center justify-between"
                                                    >
                                                        {s}
                                                        {order.status === s && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-600 font-bold uppercase tracking-tighter">{order.items.length} Units</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-gray-900 tracking-tighter italic">GH₵{order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{order.paymentMethod}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-tight">{order.date}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 px-2 relative" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-900 transition-all rounded-xl border border-gray-100 hover:border-black"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => handleActionClick(order.id, e)}
                                                    className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-900 transition-all rounded-xl border border-gray-100 hover:border-black"
                                                    title="Actions"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                                {showActionsDropdown === order.id && (
                                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[70] animate-in fade-in slide-in-from-top-2">
                                                        <button
                                                            onClick={() => handleOpenEditModal(order)}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all"
                                                        >
                                                            <Edit3 className="h-4 w-4 text-blue-500" /> Modify Order
                                                        </button>
                                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                                                            <FileText className="h-4 w-4" /> Print Invoice
                                                        </button>
                                                        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
                                                            <MailPlus className="h-4 w-4" /> Send Update
                                                        </button>
                                                        <div className="h-px bg-gray-50 my-2" />
                                                        <button
                                                            onClick={() => {
                                                                if (confirm("Confirm order deletion?")) deleteOrder(order.id);
                                                            }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
                                                        >
                                                            <Trash2 className="h-4 w-4" /> Delete Order
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* REGISTER / EDIT ORDER MODAL */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border border-white/20">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl">
                                    <Plus className="h-6 w-6 text-[#e31e24]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">
                                        {editingOrder ? 'Modify Registry' : 'Register Service Order'}
                                    </h2>
                                    <div className="flex items-center gap-4 mt-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Step {formStep} of 2</p>
                                        <div className="flex gap-1">
                                            <div className={cn("h-1 w-8 rounded-full transition-all", formStep >= 1 ? "bg-[#e31e24]" : "bg-gray-100")}></div>
                                            <div className={cn("h-1 w-8 rounded-full transition-all", formStep >= 2 ? "bg-[#e31e24]" : "bg-gray-100")}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsFormOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all active:scale-90">
                                <X className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 overflow-y-auto p-10 lg:p-14 scrollbar-hide">
                            <form className="space-y-12 h-full">
                                {formStep === 1 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4 duration-500">
                                        {/* Left Side: Customer Info */}
                                        <div className="space-y-8">
                                            <div className="space-y-6">
                                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <User className="h-4 w-4 text-[#e31e24]" />
                                                    Identity Profile
                                                </h3>
                                                <div className="space-y-5">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Trade Name / Full Name</label>
                                                        <input
                                                            type="text"
                                                            value={orderForm.customerName}
                                                            onChange={e => setOrderForm({ ...orderForm, customerName: e.target.value })}
                                                            placeholder="John Doe Enterprises"
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-black focus:ring-2 focus:ring-red-500/20"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Secure Email</label>
                                                            <input
                                                                type="email"
                                                                value={orderForm.customerEmail}
                                                                onChange={e => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                                                                placeholder="contact@email.com"
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-red-500/20"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Primary Line</label>
                                                            <input
                                                                type="text"
                                                                value={orderForm.customerPhone}
                                                                onChange={e => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                                                                placeholder="+233..."
                                                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-red-500/20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-[#e31e24]" />
                                                    Service Destination
                                                </h3>
                                                <textarea
                                                    rows={3}
                                                    value={orderForm.shippingAddress}
                                                    onChange={e => setOrderForm({ ...orderForm, shippingAddress: e.target.value })}
                                                    placeholder="Plot No. 42A, Spintex, Accra..."
                                                    className="w-full bg-gray-50 border-none rounded-[32px] px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-red-500/20 scrollbar-hide"
                                                />
                                            </div>
                                        </div>

                                        {/* Right Side: Order Metrics */}
                                        <div className="space-y-8">
                                            <div className="space-y-6">
                                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <CreditCard className="h-4 w-4 text-[#e31e24]" />
                                                    Transaction Logistics
                                                </h3>
                                                <div className="space-y-5">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Workflow Status</label>
                                                        <select
                                                            value={orderForm.status}
                                                            onChange={e => setOrderForm({ ...orderForm, status: e.target.value as any })}
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-red-500/20"
                                                        >
                                                            {['Pending Approval', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                                                                <option key={s} value={s}>{s}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Settlement Mode</label>
                                                        <select
                                                            value={orderForm.paymentMethod}
                                                            onChange={e => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                                                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-red-500/20"
                                                        >
                                                            {['Bank Transfer', 'Debit Card', 'PayPal', 'Cash on Delivery', 'M-Pesa'].map(m => (
                                                                <option key={m} value={m}>{m}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full gap-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                                            {/* Left: Product Selector */}
                                            <div className="space-y-6 flex flex-col">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                        <ShoppingCart className="h-4 w-4 text-[#e31e24]" />
                                                        Inventory Catalog
                                                    </h3>
                                                    <div className="relative">
                                                        <Search className="h-3 w-3 absolute left-3 top-2.5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="Quick find..."
                                                            className="pl-8 pr-4 py-1.5 bg-gray-50 border-none rounded-full text-[10px] font-bold focus:ring-1 focus:ring-red-500/20"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide max-h-[400px]">
                                                    {products.slice(0, 15).map(p => (
                                                        <div key={p.id} className="bg-gray-50/50 p-3 rounded-2xl border border-gray-100 flex items-center justify-between hover:bg-white hover:border-[#e31e24]/20 transition-all group shadow-sm">
                                                            <div className="flex items-center gap-4">
                                                                <div className="h-10 w-10 bg-white rounded-xl p-1.5 border border-gray-100 shrink-0">
                                                                    <img src={p.image} className="w-full h-full object-contain" />
                                                                </div>
                                                                <div className="max-w-[180px]">
                                                                    <p className="text-[10px] font-black text-gray-900 uppercase line-clamp-1">{p.name}</p>
                                                                    <p className="text-[9px] text-[#e31e24] font-black italic tracking-tighter">GH₵{p.price.toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => addItemToForm(p.id)}
                                                                className="h-8 w-8 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-900 transition-all active:scale-90"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Selected Items Line-up */}
                                            <div className="space-y-6 flex flex-col">
                                                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                                    <Package className="h-4 w-4 text-[#e31e24]" />
                                                    Service Basket Line-up
                                                </h3>
                                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide max-h-[350px]">
                                                    {orderForm.items?.length === 0 && (
                                                        <div className="p-12 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                                                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Basket is Empty</p>
                                                        </div>
                                                    )}
                                                    {orderForm.items?.map(item => (
                                                        <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-[28px] shadow-xl">
                                                            <div className="flex items-center gap-4">
                                                                <div className="h-10 w-10 bg-white rounded-xl p-1.5 shrink-0">
                                                                    <img src={item.image} className="w-full h-full object-contain" />
                                                                </div>
                                                                <div className="max-w-[120px]">
                                                                    <p className="text-[10px] font-black uppercase line-clamp-1">{item.name}</p>
                                                                    <p className="text-[9px] text-[#e31e24] font-black italic">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center bg-white/10 rounded-xl px-2">
                                                                    <button type="button" onClick={() => updateItemQuantity(item.productId, item.quantity - 1)} className="p-1 hover:text-[#e31e24]"><ArrowLeft className="h-3 w-3" /></button>
                                                                    <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                                                                    <button type="button" onClick={() => updateItemQuantity(item.productId, item.quantity + 1)} className="p-1 hover:text-[#e31e24]"><ArrowRight className="h-3 w-3" /></button>
                                                                </div>
                                                                <button type="button" onClick={() => removeItemFromForm(item.productId)} className="p-2 text-white/40 hover:text-red-500 transition-colors"><X className="h-4 w-4" /></button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Totals Box */}
                                                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-3">
                                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        <span>Subtotal</span>
                                                        <span className="text-gray-900">GH₵{formTotals.subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        <span>Estimated Tax (15%)</span>
                                                        <span className="text-gray-900">GH₵{formTotals.tax.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                        <span className="text-xs font-black text-[#e31e24] uppercase italic">Service Total</span>
                                                        <span className="text-2xl font-black italic text-gray-900 tracking-tighter">GH₵{formTotals.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <button
                                onClick={() => formStep === 2 ? setFormStep(1) : setIsFormOpen(false)}
                                className="px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-all"
                            >
                                {formStep === 2 ? 'Previous Stage' : 'Abandon Registration'}
                            </button>
                            <div className="flex items-center gap-3">
                                {formStep === 1 ? (
                                    <button
                                        onClick={() => setFormStep(2)}
                                        className="bg-gray-900 text-white px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-black transition-all flex items-center gap-3 active:scale-95"
                                    >
                                        Configure Line Items <ArrowRight className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleFormSubmit}
                                        className="bg-[#e31e24] text-white px-12 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-red-500/20 hover:bg-black transition-all flex items-center gap-3 active:scale-95"
                                    >
                                        Commit to Registry <CheckCircle2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Details Modal (View Only) */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl">
                                    <ShoppingCart className="h-6 w-6 text-[#e31e24]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Order Details</h2>
                                        <span className="text-xs font-black bg-gray-100 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest">{selectedOrder.id}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Placed on {selectedOrder.date} via {selectedOrder.paymentMethod}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                                <X className="h-6 w-6 text-gray-400 hover:text-black" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Order Status & Summary */}
                                <div className="lg:col-span-2 space-y-10">
                                    {/* Items List */}
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <Package className="h-4 w-4 text-[#e31e24]" />
                                            Product Line-items
                                        </h3>
                                        <div className="space-y-4">
                                            {selectedOrder.items.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-3xl border border-gray-100 group">
                                                    <div className="flex items-center gap-5">
                                                        <div className="h-16 w-16 bg-white rounded-2xl p-2 border border-gray-100 flex-shrink-0">
                                                            <img src={item.image} className="w-full h-full object-contain" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity} • GH₵{item.price.toFixed(2)} / unit</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm font-black text-gray-900 italic tracking-tighter mr-2">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Calculations */}
                                    <div className="bg-gray-900 rounded-[35px] p-8 text-white">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span>Subtotal</span>
                                                <span className="text-white">GH₵{selectedOrder.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span>Estimated Tax (15%)</span>
                                                <span className="text-white">GH₵{selectedOrder.tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest pb-4 border-b border-white/10">
                                                <span>Shipping & Handling</span>
                                                <span className="text-emerald-400">FREE</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-sm font-black uppercase tracking-widest text-[#e31e24] italic">Grand Total</span>
                                                <span className="text-3xl font-black italic tracking-tighter">GH₵{selectedOrder.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer & Shipping sidebar */}
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <User className="h-4 w-4 text-[#e31e24]" />
                                            Customer Profile
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-gray-400 uppercase">Trade Name</span>
                                                <p className="text-sm font-black uppercase text-gray-900">{selectedOrder.customerName}</p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-gray-400 uppercase">Contact Email</span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 lowercase group cursor-pointer hover:underline">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {selectedOrder.customerEmail}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-black text-gray-400 uppercase">Phone Line</span>
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                    <Phone className="h-3.5 w-3.5 text-[#e31e24]" />
                                                    {selectedOrder.customerPhone}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-50" />

                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-[#e31e24]" />
                                            Shipping Destination
                                        </h3>
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-start gap-3">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                            <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase">{selectedOrder.shippingAddress}</p>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-50" />

                                    <div className="space-y-6">
                                        <h1 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-[#e31e24]" />
                                            Payment Metrics
                                        </h1>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">
                                                PAID FULL
                                            </div>
                                            <span className="text-xs font-bold text-gray-400 uppercase">{selectedOrder.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workflow State:</span>
                                <div className="flex items-center gap-2">
                                    {['Pending Approval', 'Processing', 'Shipped', 'Delivered'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => updateOrderStatus(selectedOrder.id, s as any)}
                                            className={cn(
                                                "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all",
                                                selectedOrder.status === s
                                                    ? "bg-[#e31e24] text-white border-[#e31e24] shadow-lg shadow-red-500/20"
                                                    : "bg-white text-gray-400 border-gray-100 hover:bg-gray-100"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-black transition-all active:scale-95"
                            >
                                Close Portal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
