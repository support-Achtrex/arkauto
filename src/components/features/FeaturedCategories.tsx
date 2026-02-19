
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Car } from 'lucide-react';

const CategoryCard = ({ href, image, title, className, children }: { href: string; image?: string; title?: string; className?: string; children?: React.ReactNode }) => (
    <Link href={href} className={`relative group overflow-hidden rounded-3xl transition-all duration-300 hover:shadow-xl ${className}`}>
        {image && (
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title || 'Category'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            </div>
        )}
        <div className="relative h-full flex flex-col p-6 z-10">
            {children}
        </div>
    </Link>
);

const PillButton = ({ text }: { text: string }) => (
    <div className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm inline-flex items-center gap-2 group-hover:bg-gray-100 transition-colors shadow-sm">
        {text} <ArrowRight className="w-4 h-4" />
    </div>
)

export default function FeaturedCategories() {
    return (
        <section className="py-12 container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-[#e31e24] rounded-full inline-block"></span>
                Our Range
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-auto md:h-[600px]">
                {/* Column 1: Cleaning & Maintenance - Tall Vertical */}
                <CategoryCard
                    href="/category/maintenance"
                    image="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80"
                    title="Cleaning and maintenance"
                    className="md:col-span-1 h-[300px] md:h-full"
                >
                    <div className="mt-auto self-center">
                        <PillButton text="Cleaning and maintenance" />
                    </div>
                </CategoryCard>

                {/* Column 2: Tools & Oil - Stacked */}
                <div className="md:col-span-1 flex flex-col gap-5 h-full">
                    <CategoryCard
                        href="/category/accessories"
                        image="https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=800&auto=format&fit=crop"
                        className="flex-1 min-h-[200px]"
                    >
                        <div className="mt-auto self-center">
                            <PillButton text="Tools and consumables" />
                        </div>
                    </CategoryCard>

                    <CategoryCard
                        href="/category/engine"
                        image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80"
                        className="flex-1 min-h-[200px]"
                    >
                        <div className="mt-auto self-center">
                            <PillButton text="Engine oil" />
                        </div>
                    </CategoryCard>
                </div>

                {/* Column 3 & 4: Promo & Interior */}
                <div className="md:col-span-2 flex flex-col gap-5 h-full">
                    {/* Large Red Promo Card */}
                    <CategoryCard
                        href="/catalog"
                        className="flex-[2] min-h-[250px] bg-[#e31e24] border-none"
                    >
                        {/* Abstract Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                        {/* Content */}
                        <div className="flex flex-col items-center justify-center h-full text-center text-white space-y-4">
                            <div className="grid grid-cols-4 gap-2 mb-2 opacity-80">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                ))}
                            </div>

                            <Car className="w-16 h-16 opacity-90" />

                            <h3 className="text-3xl md:text-4xl font-bold max-w-xs leading-tight">
                                2.5 million auto parts
                            </h3>

                            <div className="mt-4">
                                <PillButton text="All our car parts" />
                            </div>
                        </div>
                    </CategoryCard>

                    {/* Bottom Wide Card: Mats etc */}
                    <CategoryCard
                        href="/category/accessories"
                        image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
                        className="flex-[1] min-h-[200px]"
                    >
                        <div className="mt-auto self-end mr-6">
                            <PillButton text="Mats, covers and seats" />
                        </div>
                    </CategoryCard>
                </div>

            </div>
        </section>
    );
}
