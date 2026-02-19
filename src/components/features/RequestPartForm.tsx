"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, Phone } from 'lucide-react';

export default function RequestPartForm() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Format message for WhatsApp
        const message = `*NEW PART REQUEST* 🛠️\n\n` +
            `*Part:* ${data.partName}\n` +
            `*Vehicle:* ${data.year} ${data.make} ${data.model} ${data.trim}\n` +
            `*VIN:* ${data.vin || 'N/A'}\n\n` +
            `*Contact:* ${data.contactName}\n` +
            `*Phone:* ${data.contactPhone}`;

        const whatsappNumber = "233205943708";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        window.open(url, '_blank');
        setSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    <div className="bg-[#111111] p-8 md:p-12 text-white md:w-1/3 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">Can't Find Your Part?</h2>
                        <p className="text-gray-400 mb-8">
                            Our experts can help you locate even the rarest parts. Fill out the form and we'll get back to you instantly via WhatsApp.
                        </p>
                        <div className="flex items-center gap-4 text-gray-400">
                            <Phone className="w-6 h-6" />
                            <span className="font-semibold text-lg">+233 20 594 3708</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 md:w-2/3">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Request a Part</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                                    <input name="make" required className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" placeholder="e.g. Toyota" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                    <input name="model" required className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" placeholder="e.g. Corolla" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <input name="year" required className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" placeholder="e.g. 2015" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trim / Engine</label>
                                    <input name="trim" className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" placeholder="e.g. LE 1.8L" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Part Name / Description</label>
                                <textarea name="partName" required rows={3} className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" placeholder="Describe the part you need..."></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input name="contactName" required className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                                    <input name="contactPhone" required className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#e31e24] outline-none" />
                                </div>
                            </div>

                            <Button type="submit" disabled={submitting} className="w-full bg-green-600 hover:bg-green-700 text-white">
                                {submitting ? 'Sending...' : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Request via WhatsApp
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
