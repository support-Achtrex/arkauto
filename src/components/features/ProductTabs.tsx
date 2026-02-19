"use client";

import { useState } from 'react';
import { Product } from '@/data/products';
import { Star, User } from 'lucide-react';

export default function ProductTabs({ product }: { product: Product }) {
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

    return (
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`px-8 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'description' ? 'border-[#e31e24] text-[#e31e24]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('specifications')}
                    className={`px-8 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'specifications' ? 'border-[#e31e24] text-[#e31e24]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                >
                    Specifications
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-8 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'reviews' ? 'border-[#e31e24] text-[#e31e24]' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
                >
                    Reviews ({product.reviews})
                </button>
            </div>

            <div className="p-8">
                {activeTab === 'description' && (
                    <div className="prose max-w-none text-gray-600">
                        <p className="text-lg mb-4">{product.description}</p>
                        <p>
                            This genuine {product.brand} part (ID: {product.id}) is designed to meet or exceed original equipment specifications.
                            Manufactured with high-quality materials to ensure durability and performance.
                            Whether you are replacing a worn-out component or upgrading your vehicle, this part offers the perfect balance of quality and value.
                        </p>
                        <h4 className="font-bold text-gray-900 mt-6 mb-2">Key Features:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Direct fit replacement for easy installation.</li>
                            <li>Engineered for long-lasting reliability.</li>
                            <li>Tested to ensure performance under extreme conditions.</li>
                            <li>Backed by manufacturer warranty.</li>
                        </ul>
                    </div>
                )}

                {activeTab === 'specifications' && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Brand</span>
                                <span className="font-medium text-gray-900">{product.brand}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Part Number</span>
                                <span className="font-medium text-gray-900">{product.id.toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Category</span>
                                <span className="font-medium text-gray-900 capitalize">{product.category}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Condition</span>
                                <span className="font-medium text-gray-900">New</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Warranty</span>
                                <span className="font-medium text-gray-900">2 Years</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Material</span>
                                <span className="font-medium text-gray-900">Premium Grade</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex flex-col md:flex-row gap-12">
                            <div className="md:w-1/3">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="text-5xl font-black text-gray-900">{product.rating}</div>
                                    <div>
                                        <div className="flex text-yellow-500 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500">Based on {product.reviews} reviews</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-2 text-sm">
                                            <span className="w-3">{stars}</span>
                                            <Star className="w-3 h-3 text-gray-400" />
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-yellow-500 rounded-full"
                                                    style={{ width: stars === 5 ? '70%' : stars === 4 ? '20%' : '5%' }}
                                                ></div>
                                            </div>
                                            <span className="w-8 text-right text-gray-400">{stars === 5 ? '70%' : stars === 4 ? '20%' : '5%'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                {[1, 2, 3].map((review) => (
                                    <div key={review} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-gray-900">John Doe</span>
                                            </div>
                                            <span className="text-sm text-gray-400">2 months ago</span>
                                        </div>
                                        <div className="flex text-yellow-500 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                        <p className="text-gray-600">Great product! Exactly what I needed for my car. Shipping was super fast and the part fits perfectly.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
