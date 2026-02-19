"use client"

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { vehicleData, years, allMakes } from '@/data/vehicleData';
import { Search } from 'lucide-react';

export default function VehicleSelector() {
    const [year, setYear] = useState<string>('');
    const [make, setMake] = useState<string>('');
    const [model, setModel] = useState<string>('');

    // Get makes (flattened from all regions)
    const availableMakes = useMemo(() => allMakes, []);

    // Get models based on make (search across all regions)
    const availableModels = useMemo(() => {
        if (!make) return [];
        for (const regionKey in vehicleData) {
            if (vehicleData[regionKey][make]) {
                return vehicleData[regionKey][make];
            }
        }
        return [];
    }, [make]);

    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (make && model) {
            const params = new URLSearchParams();
            params.set('make', make);
            params.set('model', model);
            if (year) params.set('year', year);

            router.push(`/catalog?${params.toString()}`);
        } else {
            alert('Please select a make and model to search.');
        }
    };

    return (
        <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl border border-gray-100 max-w-5xl mx-auto w-full relative z-30 translate-y-1/2">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center gap-2 p-1">
                {/* Year Select */}
                <div className="flex-1 px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 group">
                    <label htmlFor="year" className="text-[10px] font-black uppercase tracking-widest text-[#e31e24] mb-1 block group-hover:translate-x-1 transition-transform">Vehicle Year</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-transparent text-gray-900 font-bold outline-none cursor-pointer appearance-none"
                        required
                    >
                        <option value="">Select Year</option>
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* Make Select */}
                <div className="flex-1 px-6 py-4 md:py-2 border-b md:border-b-0 md:border-r border-gray-100 group">
                    <label htmlFor="make" className="text-[10px] font-black uppercase tracking-widest text-[#e31e24] mb-1 block group-hover:translate-x-1 transition-transform">Brand / Make</label>
                    <select
                        id="make"
                        value={make}
                        onChange={(e) => {
                            setMake(e.target.value);
                            setModel('');
                        }}
                        className="w-full bg-transparent text-gray-900 font-bold outline-none cursor-pointer appearance-none"
                        required
                    >
                        <option value="">Select Make</option>
                        {availableMakes.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Model Select */}
                <div className="flex-1 px-6 py-4 md:py-2 group">
                    <label htmlFor="model" className="text-[10px] font-black uppercase tracking-widest text-[#e31e24] mb-1 block group-hover:translate-x-1 transition-transform">Vehicle Model</label>
                    <select
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full bg-transparent text-gray-900 font-bold outline-none cursor-pointer appearance-none disabled:opacity-30"
                        disabled={!make}
                        required
                    >
                        <option value="">Select Model</option>
                        {availableModels.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="md:w-auto h-16 md:h-20 px-10 bg-gray-900 hover:bg-[#e31e24] text-white font-black text-sm tracking-widest uppercase md:rounded-full rounded-2xl transition-all shadow-xl hover:shadow-red-500/20 active:scale-95 flex items-center justify-center gap-3"
                >
                    <Search className="h-5 w-5" />
                    <span className="md:hidden lg:inline">Find My Parts</span>
                </button>
            </form>
        </div>
    );
}
