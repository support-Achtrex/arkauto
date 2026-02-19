import RequestPartForm from '@/components/features/RequestPartForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-[#111111] text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-gray-400">Get in touch for parts inquiries and support.</p>
            </div>

            {/* Info Grid */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#e31e24]">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
                        <p className="text-gray-600">+233 20 594 3708</p>
                        <p className="text-gray-500 text-sm mt-2">Mon-Sat: 8am - 6pm</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#111111]">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                        <p className="text-gray-600">support@arkauto.com</p>
                        <p className="text-gray-500 text-sm mt-2">24/7 Response</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100">
                        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600">Accra, Ghana</p>
                        <p className="text-gray-500 text-sm mt-2">Main Warehouse</p>
                    </div>
                </div>

                {/* Form */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Send us a Message</h2>
                    <RequestPartForm />
                </div>
            </div>
        </div>
    );
}
