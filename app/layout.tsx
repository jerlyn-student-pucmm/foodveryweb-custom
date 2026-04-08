import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {JsonLdSchema} from '@/components/JsonLdSchema';
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from 'next';
import "./globals.css";

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FoodVery Coffee - Breakfast and Coffee in Las Terrenas, Dominican Republic",
  description: "Breakfast and coffee crafted with care in Las Terrenas, Dominican Republic. Artisanal coffee, tropical bites, and authentic Dominican flavors.",
  keywords: ["coffee", "breakfast", "Las Terrenas", "Dominican Republic", "restaurant", "café", "foodvery"],
  openGraph: {
    title: "FoodVery Coffee - Breakfast and Coffee in Las Terrenas",
    description: "Breakfast and coffee crafted with care in Las Terrenas, Dominican Republic",
    url: "https://foodvery.com.do",
    siteName: "FoodVery Coffee",
    locale: "es_DO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoodVery Coffee - Breakfast and Coffee in Las Terrenas",
    description: "Breakfast and coffee crafted with care in Las Terrenas, Dominican Republic",
  },
  alternates: {
    canonical: "https://foodvery.com.do",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = (await getLocale().catch(() => undefined)) ?? 'es';

  return (
    <html lang="es" className={`scroll-smooth ${playfairDisplay.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="font-sans bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 transition-colors duration-300">
        <JsonLdSchema />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}