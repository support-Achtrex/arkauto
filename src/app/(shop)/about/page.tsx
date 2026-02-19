import { Building2, Users, Wrench } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About ArkAuto</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your trusted partner for genuine auto parts in Ghana. We bridge the gap between quality manufacturers and your vehicle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center shrink-0 text-[#e31e24]">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                                <p className="text-gray-600">To provide every vehicle owner with access to genuine, high-quality spare parts at competitive prices, ensuring safety and longevity on the road.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-[#111111]">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
                                <p className="text-gray-600">Our team consists of automotive experts who understand the intricacies of every vehicle make and model, ready to assist you in finding the perfect part.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0 text-green-600">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                                <p className="text-gray-600">We source directly from manufacturers and authorized distributors to guarantee 100% authenticity on every part we sell.</p>
                            </div>
                        </div>
                    </div>
                    {/* Placeholder for About Image */}
                    <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                        <span className="text-gray-400 font-bold text-2xl">Team / Warehouse Image</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
