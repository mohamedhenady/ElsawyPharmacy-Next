"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    ShoppingCart,
    Search,
    Menu,
    X,
    User,
    PhoneCall,
    MapPin,
    Heart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useCartStore } from "@/store/useCartStore"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const itemCount = useCartStore((state) => state.getItemCount())

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="sticky top-0 z-50 w-full glass-card border-b bg-background/60" dir="rtl">
            {/* Top Bar */}
            <div className="bg-primary/90 backdrop-blur-sm py-2 text-primary-foreground text-xs font-medium">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <PhoneCall className="w-3 h-3" />
                            01024697326
                        </span>
                        <span className="flex items-center gap-1 hidden md:flex">
                            <MapPin className="w-3 h-3" />
                            مدينة نصر، القاهرة
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/track" className="text-xs hover:underline">تتبع طلبك</Link>
                        <Link href="/dashboard" className="text-xs hover:underline">حسابي</Link>
                        <Link href="/compare" className="text-xs hover:underline">مقارنة</Link>
                        <Link href="/admin" className="text-xs hover:underline">لوحة التحكم</Link>
                        <span>العربية | EN</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative w-12 h-12 overflow-hidden rounded-xl border bg-white shadow-sm">
                            <Image
                                src="/logo.png"
                                alt="Sawy Pharmacy Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight text-primary leading-none">صيدلية</span>
                            <span className="text-sm font-semibold text-muted-foreground leading-none">الصاوي</span>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl relative">
                        <Input
                            placeholder="ابحث عن أدوية، فيتامينات، أو مستلزمات العناية..."
                            className="pr-10 rounded-full bg-muted/50 focus-visible:ring-primary h-11"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full hover:bg-primary/10 transition-colors">
                            <Heart className="w-6 h-6 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
                            <User className="w-6 h-6 text-primary" />
                        </Button>
                        <Link href="/cart">
                            <Button variant="default" className="rounded-full gap-2 px-6 h-11 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="hidden sm:inline">السلة</span>
                                {mounted && (
                                    <span className="bg-primary-foreground text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>

                {/* Categories Nav - Desktop */}
                <nav className="hidden md:flex items-center gap-10 py-4 border-t text-sm font-bold">
                    <Link href="/products" className="text-foreground hover:text-primary transition-all relative group">
                        المنتجات
                        <span className="absolute -bottom-4 right-0 w-0 h-1 bg-primary transition-all group-hover:w-full rounded-full" />
                    </Link>
                    <Link href="/categories" className="text-foreground hover:text-primary transition-all relative group">
                        التصنيفات
                        <span className="absolute -bottom-4 right-0 w-0 h-1 bg-primary transition-all group-hover:w-full rounded-full" />
                    </Link>
                    <Link href="/products?category=medicines" className="text-foreground hover:text-primary transition-all hover:bg-primary/5 px-3 py-1 rounded-lg">الأدوية</Link>
                    <Link href="/products?category=cosmetics" className="text-foreground hover:text-primary transition-all hover:bg-primary/5 px-3 py-1 rounded-lg">العناية والجمال</Link>
                    <Link href="/products?category=baby" className="text-foreground hover:text-primary transition-all hover:bg-primary/5 px-3 py-1 rounded-lg">الطفل والرضع</Link>
                    <Link href="/products?category=offers" className="text-red-500 font-black hover:text-red-600 px-3 py-1 bg-red-50 rounded-lg animate-pulse">العروض الحصرية</Link>
                </nav>
            </div>

            {/* Mobile Navigation */}
            <div className={cn(
                "md:hidden absolute top-full left-0 w-full bg-background border-b shadow-xl transition-all duration-300 overflow-hidden",
                isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="p-4 space-y-4">
                    <Input placeholder="ابحث..." className="w-full" />
                    <nav className="flex flex-col gap-2">
                        <Link href="/" className="font-bold p-3 hover:bg-slate-50 rounded-xl">الرئيسية</Link>
                        <Link href="/products" className="font-bold p-3 hover:bg-slate-50 rounded-xl">المنتجات</Link>
                        <Link href="/categories" className="font-bold p-3 hover:bg-slate-50 rounded-xl">التصنيفات</Link>
                        <hr className="my-2" />
                        <Link href="/products?category=medicines" className="font-medium p-3 hover:bg-slate-50 rounded-xl">الأدوية</Link>
                        <Link href="/products?category=cosmetics" className="font-medium p-3 hover:bg-slate-50 rounded-xl">العناية والجمال</Link>
                        <Link href="/products?category=baby" className="font-medium p-3 hover:bg-slate-50 rounded-xl">الطفل والرضع</Link>
                        <Link href="/products?category=offers" className="font-black text-red-500 p-3 hover:bg-red-50 rounded-xl">العروض</Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}

