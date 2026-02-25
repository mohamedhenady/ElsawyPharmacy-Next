import type { Metadata, Viewport } from "next";
import { Noto_Sans_Arabic, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const notoArabic = Noto_Sans_Arabic({
    subsets: ["arabic"],
    variable: "--font-noto-arabic",
});

export const metadata: Metadata = {
    title: "صيدلية الصاوي",
    description: "خدمات صيدلانية متكاملة بين يديك",
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Sawy Pharmacy",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" className={cn(manrope.variable, notoArabic.variable)}>
            <body className="bg-slate-100 min-h-screen">
                <main className="mobile-container">
                    {children}
                </main>
            </body>
        </html>
    );
}
