"use client"

import { Bell, ShoppingCart, Search, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export function MobileHeader() {
    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-4">
                <Link href="/home" className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-full flex items-center justify-center text-white">
                        <PlusCircle className="w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-extrabold tracking-tight text-primary">Elsawy</h1>
                </Link>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary">
                        <Bell className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">2</span>
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="ابحث عن أدوية، مستحضرات تجميل..."
                    className="w-full bg-white dark:bg-slate-800 border-none rounded-full py-6 pl-12 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
                />
            </div>
        </header>
    )
}
