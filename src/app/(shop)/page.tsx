"use client";

import VehicleSelector from '@/components/features/VehicleSelector';
import RequestPartForm from '@/components/features/RequestPartForm';
import FeaturedCategories from '@/components/features/FeaturedCategories';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ui/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, Wrench, ArrowRight, Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { products } = useProducts();

  return (
    <div className="bg-[#f8f8f8] min-h-screen">

      {/* 1. Split Hero Section (CARiD Style) */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left Box: Vehicle Selector (My Garage) */}
            <div className="w-full lg:w-[420px] shrink-0 bg-[#111111] rounded-lg shadow-xl border border-gray-800 flex flex-col overflow-hidden relative z-10">
              <div className="bg-[#e31e24] p-5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-10 rotate-45 transform translate-x-8 -translate-y-8" />
                <h2 className="text-white font-black uppercase text-[22px] tracking-tight leading-none mb-1">Select Your Vehicle</h2>
                <p className="text-red-100 text-xs font-bold tracking-widest uppercase">To Find Exact Fit Parts</p>
              </div>
              <div className="p-6 flex-1 bg-gradient-to-b from-[#1a1a1a] to-[#111111]">
                <VehicleSelector />
              </div>
            </div>

            {/* Right Box: Hero Banner */}
            <div className="flex-1 rounded-lg overflow-hidden relative shadow-md bg-gray-900 min-h-[400px]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_0%,transparent_100%)] z-10"></div>

              {/* Fallback abstract background if no image */}
              <div className="absolute inset-0 bg-[#111] mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#111111] via-[#331111] to-[#e31e24]/40 opacity-50 block mix-blend-color-dodge"></div>

              <div className="relative z-20 h-full flex flex-col justify-center p-8 lg:p-14">
                <div className="inline-block px-3 py-1 mb-6 border-2 border-[#e31e24] text-[#e31e24] font-black text-xs uppercase tracking-widest rounded">Factory Direct</div>
                <h1 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4 leading-none">
                  Unleash Your <br /> <span className="text-[#e31e24]">Performance</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8 max-w-md font-medium">Browse massive inventory of parts engineered for perfect fitment, extreme durability, and ultimate power.</p>
                <div className="flex gap-4">
                  <Link href="/catalog">
                    <Button className="bg-[#e31e24] hover:bg-red-700 text-white px-8 py-6 rounded font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-red-500/30">
                      Shop Top Parts
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Utilitarian Trust Bar */}
      <section className="bg-white border-b border-gray-200 shadow-sm relative z-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 group cursor-pointer hover:bg-gray-50 transition-colors rounded">
              <CheckCircle className="w-8 h-8 text-[#e31e24] group-hover:scale-110 transition-transform" />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight pt-1">Guaranteed Fit</h3>
                <p className="text-[11px] text-gray-500">100% Accurate Selection</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 group cursor-pointer hover:bg-gray-50 transition-colors rounded">
              <Truck className="w-8 h-8 text-[#e31e24] group-hover:scale-110 transition-transform" />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight pt-1">Fast Shipping</h3>
                <p className="text-[11px] text-gray-500">Express Delivery Nationwide</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 group cursor-pointer hover:bg-gray-50 transition-colors rounded">
              <ShieldCheck className="w-8 h-8 text-[#e31e24] group-hover:scale-110 transition-transform" />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight pt-1">Authorized Dealer</h3>
                <p className="text-[11px] text-gray-500">Genuine OEM & Aftermarket</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 group cursor-pointer hover:bg-gray-50 transition-colors rounded">
              <ThumbsUp className="w-8 h-8 text-[#e31e24] group-hover:scale-110 transition-transform" />
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight pt-1">Easy Returns</h3>
                <p className="text-[11px] text-gray-500">Hassle-free 30 Days Policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Department (Using FeaturedCategories if adapted, or wrapping it) */}
      <div className="my-10">
        <FeaturedCategories />
      </div>

      {/* 4. Dense Featured Products Grid (Similar to CARiD's Best Sellers) */}
      <section className="py-12 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b-2 border-gray-100 pb-4">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic flex items-center gap-3">
              <span className="w-2 h-8 bg-[#e31e24] block"></span>
              Top Selling <span className="text-[#e31e24]">Parts</span>
            </h2>
            <Link href="/catalog" className="mt-4 md:mt-0 text-sm font-bold text-gray-600 hover:text-[#e31e24] uppercase tracking-wider flex items-center gap-1 transition-colors">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.filter(p => (p.rating || 5) >= 4.5).slice(0, 10).map(product => (
              <div key={product.id} className="border border-gray-200 hover:border-[#e31e24] hover:shadow-lg transition-all rounded bg-white p-3 flex flex-col group">
                <div className="w-full aspect-square bg-gray-50 rounded mb-3 flex items-center justify-center p-4 relative">
                  <span className="text-4xl font-bold text-gray-200 uppercase">{product.category.slice(0, 2)}</span>
                  {product.rating && product.rating >= 4.8 && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> BEST SELLER
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${product.id}`} className="text-[#0055aa] hover:text-[#e31e24] hover:underline text-sm font-semibold line-clamp-2 leading-tight mb-2">
                      {product.name}
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-400 text-[10px] ml-1">({Math.floor(Math.random() * 200) + 15})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="font-black text-gray-900">GH₵{product.price.toFixed(2)}</span>
                    <span className="text-[#e31e24] text-[10px] font-bold uppercase tracking-wider">In Stock</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brands Carousel Strip (Dense presentation) */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h3 className="text-center font-bold text-gray-500 uppercase tracking-widest text-xs mb-6">Explore Our Premium Brand Selection</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 items-center justify-items-center gap-6 md:gap-12 opacity-70">
            <Image src="/brands/toyota.svg" alt="Toyota" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/brands/honda.svg" alt="Honda" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/brands/bosch.svg" alt="Bosch" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/brands/denso.svg" alt="Denso" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/brands/mobil1.svg" alt="Mobil 1" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
            <Image src="/brands/ngk.svg" alt="NGK" width={80} height={40} className="h-8 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer" />
          </div>
        </div>
      </section>

      {/* SEO & Request Section */}
      <section className="py-12 bg-white text-gray-600 text-[13px] border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-black text-gray-900 mb-4 uppercase text-lg">Your Trusted Auto Parts Source in Ghana</h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                From performance upgrades to essential maintenance components, ArkAuto offers an unparalleled selection of premium auto parts tailored for the Ghanaian market. Our extensive catalog uses advanced fitment data to ensure that when you enter your Year, Make, and Model, the parts displayed are guaranteed to fit perfectly.
              </p>
              <p>
                We partner directly with leading OEM and aftermarket manufacturers globally, stripping away the middleman to provide you with the most competitive pricing alongside comprehensive technical support. Experience the power of our state-of-the-art catalog engine today.
              </p>
            </div>
          </div>
          <div>
            <RequestPartForm />
          </div>
        </div>
      </section>
    </div>
  );
}
