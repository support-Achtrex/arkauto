"use client";

import { useState, useEffect } from 'react';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/data/products';
import {
    Package,
    Search,
    Plus,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle2,
    XCircle,
    Image as ImageIcon,
    X,
    Upload,
    Check,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminProducts() {
    const { products, updateProducts } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showSuccess, setShowSuccess] = useState<string | null>(null);

    const [formProduct, setFormProduct] = useState<Partial<Product>>({
        name: '',
        price: 0,
        category: 'maintenance',
        brand: '',
        stock: 10,
        partNumber: '',
        oemNumber: '',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
        images: []
    });

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.partNumber && p.partNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.oemNumber && p.oemNumber.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', 'brakes', 'engine', 'suspension', 'electrical', 'maintenance', 'batteries', 'accessories', 'cooling', 'exhaust', 'steering', 'transmission'];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Reset to page 1 when search or category changes for accuracy
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setFormProduct({
            name: '',
            price: 0,
            category: 'maintenance',
            brand: '',
            stock: 10,
            partNumber: '',
            oemNumber: '',
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
            images: []
        });
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product: Product) => {
        setEditingProduct(product);
        setFormProduct({ ...product, images: product.images || [] });
        setIsModalOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Limit total images to 5
        const currentImages = formProduct.images || [];
        const availableSlots = 5 - currentImages.length;
        const uploadLimit = Math.min(files.length, availableSlots);

        if (uploadLimit <= 0) {
            alert("You can only upload up to 5 images per product.");
            return;
        }

        const newFiles = files.slice(0, uploadLimit);

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormProduct(prev => {
                    const currentImages = prev.images || [];
                    const isNewUpload = currentImages.length === 0;
                    const isPlaceholder = !prev.image || prev.image.includes('unsplash') || prev.image.includes('placehold.co');

                    return {
                        ...prev,
                        images: [...currentImages, base64String],
                        // Set as main if it's the first image ever or if we are still using a placeholder
                        image: (isNewUpload || isPlaceholder) ? base64String : prev.image
                    };
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setFormProduct(prev => {
            const newImages = [...(prev.images || [])];
            newImages.splice(index, 1);
            return {
                ...prev,
                images: newImages,
                // If we removed the primary image, update it to the next available or back to default
                image: prev.image === prev.images?.[index]
                    ? (newImages[0] || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop')
                    : prev.image
            };
        });
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            // Update existing
            const updatedProducts = products.map(p =>
                p.id === editingProduct.id ? { ...p, ...formProduct } as Product : p
            );
            updateProducts(updatedProducts);
            setShowSuccess(`Product "${formProduct.name}" updated successfully!`);
        } else {
            // Add new
            const product: Product = {
                id: `PROD-${Date.now()}`,
                name: formProduct.name || 'Untitled Product',
                description: formProduct.description || formProduct.name || '',
                price: Number(formProduct.price) || 0,
                category: (formProduct.category as any) || 'maintenance',
                image: formProduct.image || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop',
                images: formProduct.images || [],
                rating: formProduct.rating || 5,
                reviews: formProduct.reviews || 0,
                stock: Number(formProduct.stock) || 0,
                brand: formProduct.brand || 'Generic',
                partNumber: formProduct.partNumber || '',
                oemNumber: formProduct.oemNumber || '',
                compatibility: formProduct.compatibility || ['Universal']
            };
            updateProducts([product, ...products]);
            setShowSuccess(`Product "${product.name}" added to inventory!`);
        }

        setIsModalOpen(false);
        setTimeout(() => setShowSuccess(null), 3000);
    };

    const handleDeleteProduct = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            updateProducts(products.filter(p => p.id !== id));
            setShowSuccess("Product removed from inventory.");
            setTimeout(() => setShowSuccess(null), 3000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                    <p className="text-gray-500 font-medium">Add, edit and manage your global product catalog.</p>
                </div>
                <div className="flex items-center gap-3">
                    {showSuccess && (
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100 animate-in fade-in slide-in-from-right-4">
                            <Check className="h-4 w-4" />
                            {showSuccess}
                        </div>
                    )}
                    <button
                        onClick={handleOpenAddModal}
                        className="flex items-center gap-2 bg-[#e31e24] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#c3191f] transition-all shadow-lg shadow-red-500/20 active:scale-95"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add New Product</span>
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full text-gray-400 focus-within:text-[#e31e24] transition-colors">
                    <Search className="h-4 w-4 absolute left-3 top-3 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, brand or part number..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 font-bold text-gray-700 placeholder:text-gray-400 placeholder:font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Filter className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                        <select
                            className="pl-10 pr-8 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-red-500/20 appearance-none w-full cursor-pointer font-black text-gray-600 capitalize tracking-wider"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-black text-gray-400 border-b border-gray-100">
                                <th className="px-6 py-5">Product Details</th>
                                <th className="px-6 py-5">Category</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Stock</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {paginatedProducts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm p-1">
                                                <img
                                                    src={p.image}
                                                    alt={p.name}
                                                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=Parts'; }}
                                                />
                                            </div>
                                            <div className="max-w-[320px]">
                                                <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{p.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded uppercase">{p.brand}</span>
                                                    <span className="text-[10px] font-mono text-gray-400">ID: {p.id}</span>
                                                </div>
                                                {p.partNumber && <p className="text-[9px] text-[#e31e24] font-black uppercase mt-1">PN: {p.partNumber}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest bg-gray-100 px-2.5 py-1 rounded-full">
                                            {p.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-gray-900 tracking-tighter">GH₵ {p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center justify-between w-24">
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest",
                                                    p.stock > 10 ? "text-emerald-500" : p.stock > 0 ? "text-amber-500" : "text-red-500"
                                                )}>
                                                    {p.stock > 0 ? `${p.stock} Units` : 'Sold Out'}
                                                </span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000",
                                                        p.stock > 10 ? "bg-emerald-500" : p.stock > 0 ? "bg-amber-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${Math.min((p.stock / 20) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 pr-2">
                                            <button
                                                onClick={() => handleOpenEditModal(p)}
                                                className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-900 transition-all rounded-xl border border-gray-100 hover:border-black"
                                                title="Edit Product"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(p.id, p.name)}
                                                className="p-2.5 text-gray-400 hover:text-white hover:bg-[#e31e24] transition-all rounded-xl border border-gray-100 hover:border-[#e31e24]"
                                                title="Delete Product"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredProducts.length === 0 && (
                        <div className="p-24 text-center">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-10 w-10 text-gray-200" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 uppercase">No parts matched your search</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">We couldn't find any products in the inventory with those details. Try a different part number or category.</p>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Showing {Math.min(startIndex + 1, filteredProducts.length)} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-900 font-black tracking-tighter">
                            PAGE {currentPage} / {totalPages || 1}
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in-95">
                    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight italic">
                                    {editingProduct ? 'Update Inventory Item' : 'Register New Part'}
                                </h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                                    {editingProduct ? `Editing ID: ${editingProduct.id}` : 'Fill in the technical specifications'}
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                                <X className="h-6 w-6 text-gray-400 hover:text-black" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Media Assets Column */}
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#e31e24] ml-1 flex items-center gap-2">
                                            <ImageIcon className="h-3 w-3" /> Primary Showcase Asset
                                        </label>
                                        <label className="aspect-square bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 relative overflow-hidden group shadow-inner cursor-pointer hover:border-[#e31e24]/30 transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const base64String = reader.result as string;
                                                        setFormProduct(prev => ({
                                                            ...prev,
                                                            image: base64String,
                                                            images: prev.images?.includes(base64String) ? prev.images : [base64String, ...(prev.images || [])]
                                                        }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }}
                                            />
                                            <img
                                                src={formProduct.image}
                                                className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=Part+Preview'; }}
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                                                <Upload className="h-6 w-6 mb-2" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Replace Primary Image</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 flex items-center justify-between">
                                            <span className="flex items-center gap-2">Technical Gallery ({formProduct.images?.length || 0}/5)</span>
                                            {formProduct.images && formProduct.images.length >= 5 && <span className="text-amber-500">MAX REACHED</span>}
                                        </label>

                                        <div className="grid grid-cols-3 gap-3">
                                            {/* Upload Trigger */}
                                            {(!formProduct.images || formProduct.images.length < 5) && (
                                                <label className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-[#e31e24] cursor-pointer transition-all group scale-100 active:scale-95">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={handleImageUpload}
                                                    />
                                                    <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" />
                                                    <span className="text-[8px] font-black uppercase mt-1">Upload</span>
                                                </label>
                                            )}

                                            {/* Gallery Previews */}
                                            {formProduct.images?.map((img: string, idx: number) => (
                                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-white">
                                                    <img src={img} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormProduct({ ...formProduct, image: img })}
                                                            className="px-3 py-1.5 bg-white text-gray-900 rounded-lg hover:bg-[#e31e24] hover:text-white transition-all flex items-center gap-2 shadow-xl scale-100 active:scale-90"
                                                            title="Set as Main"
                                                        >
                                                            <Check className="h-3 w-3" />
                                                            <span className="text-[8px] font-black uppercase">Main</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="p-1.5 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                                            title="Remove"
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    {formProduct.image === img && (
                                                        <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5">
                                                            <Check className="h-2 w-2" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pt-4 border-t border-gray-50">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manual CDN Link (Optional)</label>
                                        <input
                                            className="w-full h-10 px-4 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-mono focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all"
                                            value={formProduct.image}
                                            onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                {/* Details Columns */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Trade Name / Description</label>
                                        <input
                                            required
                                            className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all placeholder:font-medium"
                                            value={formProduct.name}
                                            onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                                            placeholder="e.g. BREMBO CERAMIC BRAKE PADS - FRONT"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Price (GHS)</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">GH₵</span>
                                                <input
                                                    required
                                                    type="number"
                                                    className="w-full h-12 pl-12 pr-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all"
                                                    value={formProduct.price}
                                                    onChange={(e) => setFormProduct({ ...formProduct, price: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Manufacturer Brand</label>
                                            <input
                                                required
                                                className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all placeholder:font-medium"
                                                value={formProduct.brand}
                                                onChange={(e) => setFormProduct({ ...formProduct, brand: e.target.value })}
                                                placeholder="e.g. BOSCH"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Technical Category</label>
                                            <div className="relative">
                                                <select
                                                    className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black uppercase tracking-widest appearance-none focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all cursor-pointer"
                                                    value={formProduct.category}
                                                    onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value as any })}
                                                >
                                                    {categories.filter(c => c !== 'all').map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                                <Filter className="h-4 w-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Available Units</label>
                                            <input
                                                type="number"
                                                className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all"
                                                value={formProduct.stock}
                                                onChange={(e) => setFormProduct({ ...formProduct, stock: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">EAN / Part Number</label>
                                            <input
                                                className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-mono focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all"
                                                value={formProduct.partNumber}
                                                onChange={(e) => setFormProduct({ ...formProduct, partNumber: e.target.value })}
                                                placeholder="PN-XXXXX"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">OEM Ref Number</label>
                                            <input
                                                className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-mono focus:ring-4 focus:ring-red-500/10 focus:border-[#e31e24] outline-none transition-all"
                                                value={formProduct.oemNumber}
                                                onChange={(e) => setFormProduct({ ...formProduct, oemNumber: e.target.value })}
                                                placeholder="A000-..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-10 py-3 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#e31e24] transition-all active:scale-95 flex items-center gap-2"
                                >
                                    {editingProduct ? <><Check className="h-4 w-4" /> Finalize Changes</> : <><Plus className="h-4 w-4" /> Deploy to Online Shop</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
