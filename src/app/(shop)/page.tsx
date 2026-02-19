"use client";

import VehicleSelector from '@/components/features/VehicleSelector';
import RequestPartForm from '@/components/features/RequestPartForm';
import FeaturedCategories from '@/components/features/FeaturedCategories';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ui/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Truck, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { products } = useProducts();

  const benefits = [
    { title: 'Genuine Parts', text: '100% original manufacturer parts', icon: ShieldCheck },
    { title: 'Fast Delivery', text: 'Shipping across Ghana', icon: Truck },
    { title: 'Expert Support', text: 'Technical assistance available', icon: Wrench },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white pb-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight uppercase italic">
              Premium Auto Parts<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e31e24]">Across Ghana</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl font-medium leading-relaxed opacity-90">
              The nation's most trusted global parts bridge. Source 100% genuine components with expert technical verification.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link href="/catalog">
                <Button size="lg" className="h-auto py-5 px-10 rounded-2xl font-black uppercase tracking-widest text-xs bg-[#e31e24] hover:bg-white hover:text-black border-none text-white shadow-2xl shadow-red-500/40 transition-all active:scale-95">
                  Browse Catalog
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-auto py-5 px-10 rounded-2xl text-white border-2 border-white/20 hover:bg-white hover:text-black font-black uppercase tracking-widest text-xs backdrop-blur-md transition-all active:scale-95">
                  Technical Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Selector (Overlapping Hero) */}
      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <VehicleSelector />
      </div>

      {/* USP Bar */}
      <section className="bg-white border-b border-gray-100 py-10 shadow-sm relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:divide-x divide-gray-100">
            <div className="flex flex-col items-center gap-4 group cursor-pointer p-4 rounded-3xl hover:bg-gray-50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-[#e31e24] transition-all">
                <Truck className="w-7 h-7 text-[#e31e24] group-hover:text-white transition-transform" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tighter italic text-sm">Express Logistics</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">24h Intra-City Delivery</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer p-4 rounded-3xl hover:bg-gray-50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-[#e31e24] transition-all">
                <ShieldCheck className="w-7 h-7 text-[#e31e24] group-hover:text-white transition-transform" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tighter italic text-sm">Seal of Authenticity</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Manufacturer Certified</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer p-4 rounded-3xl hover:bg-gray-50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-[#e31e24] transition-all">
                <Wrench className="w-7 h-7 text-[#e31e24] group-hover:text-white transition-transform" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tighter italic text-sm">Parts Engineering</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Free Technical Audit</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 group cursor-pointer p-4 rounded-3xl hover:bg-gray-50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-[#e31e24] transition-all">
                <span className="text-[#e31e24] font-black text-2xl group-hover:text-white transition-transform">30</span>
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tighter italic text-sm">Hassle-Free Returns</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ghana-Wide Policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories (Bento Grid) */}
      <FeaturedCategories />

      {/* Featured Products from New Database */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase italic">Featured <span className="text-[#e31e24]">Inventory</span></h2>
              <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-[10px]">Real-time Global Stock Levels • Updated Hourly</p>
            </div>
            <Link href="/catalog" className="flex items-center gap-2 text-[#e31e24] font-black uppercase tracking-widest text-xs hover:translate-x-2 transition-transform">
              Digital Showroom <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
            {products.filter(p => (p.rating || 5) >= 4.5).slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/catalog">
              <Button size="lg" className="h-auto bg-gray-900 hover:bg-[#e31e24] text-white px-16 py-7 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:shadow-red-500/30 transition-all active:scale-95">
                Explore 10,000+ Parts Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Banner */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e31e24] skew-x-[-20deg] translate-x-1/2 opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tight">
                Why Shop at Ark<span className="text-[#e31e24]">Auto</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
                We bridge the gap between global manufacturers and vehicle owners in Ghana. Our mission is to provide 100% genuine parts at competitive prices with unparalleled local support.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-[#e31e24] group-hover:bg-[#e31e24] group-hover:text-white transition-all">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Certified Genuine</span>
                </div>
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-[#e31e24] group-hover:bg-[#e31e24] group-hover:text-white transition-all">
                    <Truck className="h-6 w-6" />
                  </div>
                  <span className="text-white font-bold uppercase tracking-widest text-xs">Express Ghana Shipping</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl group hover:border-[#e31e24]/50 transition-all">
                <div className="text-5xl font-black text-[#e31e24] mb-2 font-mono group-hover:scale-110 transition-transform origin-left">10k+</div>
                <div className="text-white font-black uppercase tracking-widest text-sm mb-2">Parts Catalog</div>
                <div className="text-gray-500 text-xs font-medium">Covering 95% of vehicle models in the Ghanaian market.</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl group hover:border-[#e31e24]/50 transition-all">
                <div className="text-5xl font-black text-[#e31e24] mb-2 font-mono group-hover:scale-110 transition-transform origin-left">24h</div>
                <div className="text-white font-black uppercase tracking-widest text-sm mb-2">Order Processing</div>
                <div className="text-gray-500 text-xs font-medium">From checkout to dispatch in under a day.</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl group hover:border-[#e31e24]/50 transition-all">
                <div className="text-5xl font-black text-[#e31e24] mb-2 font-mono group-hover:scale-110 transition-transform origin-left">4.9</div>
                <div className="text-white font-black uppercase tracking-widest text-sm mb-2">User Experience</div>
                <div className="text-gray-500 text-xs font-medium">Average rating from over 5,000 verified Ghanaian customers.</div>
              </div>
              <div className="bg-[#e31e24] p-8 rounded-3xl shadow-2xl shadow-red-900/20 flex flex-col justify-center items-center text-center group cursor-pointer active:scale-95 transition-all">
                <p className="text-white font-black uppercase tracking-widest text-xs mb-4">Start Shopping Now</p>
                <Link href="/catalog" className="text-white font-black italic text-2xl group-hover:underline flex items-center gap-2">
                  GO TO SHOP <ArrowRight className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands - Scrolling */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-[#e31e24] pl-4">Premium Brands</h2>
            <Link href="/brands" className="text-sm font-bold text-[#e31e24] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Reusing existing brand images */}
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/toyota.svg" alt="Toyota" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/honda.svg" alt="Honda" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/bosch.svg" alt="Bosch" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/denso.svg" alt="Denso" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/mobil1.svg" alt="Mobil 1" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
            <div className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <Image src="/brands/ngk.svg" alt="NGK" width={100} height={50} className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Footer */}
      <section className="py-12 bg-gray-100 text-gray-600 text-sm leading-relaxed">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-bold text-gray-900 mb-4">Car Parts Online Shop - ArkAuto Ghana</h2>
          <p className="mb-4">
            Maintaining your vehicle is essential for safety and longevity. At ArkAuto, we understand the importance of quality, which is why we only stock genuine parts from the world's most trusted manufacturers. Whether you are looking for brake pads, spark plugs, motor oil, or suspension components, our extensive catalog covers all major makes and models found in Ghana.
          </p>
          <p>
            Our user-friendly platform allows you to find the exact part you need by simply selecting your vehicle make, model, and year. With our fast delivery network across Accra and beyond, you can get back on the road sooner. Trust ArkAuto for all your automotive maintenance needs.
          </p>
        </div>
      </section>

      {/* Request Part Form */}
      <RequestPartForm />
    </div>
  );
}
