import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { ProductProvider } from '@/context/ProductContext';
import { OrderProvider } from '@/context/OrderContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArkAuto - Genuine Auto Parts',
  description: 'Your trusted source for genuine auto parts sale and distribution.',
  keywords: 'auto parts, car parts, genuine parts, toyota, honda, bosch, ghana auto parts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SettingsProvider>
          <ProductProvider>
            <OrderProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                </WishlistProvider>
              </CartProvider>
            </OrderProvider>
          </ProductProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
