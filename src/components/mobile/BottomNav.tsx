"use client"

import { Home, Grid, Tag, Receipt, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { icon: Home, label: "الرئيسية", href: "/home" },
    { icon: Grid, label: "الأقسام", href: "/categories" },
    { icon: Tag, label: "العروض", href: "/offers" },
    { icon: Receipt, label: "طلباتي", href: "/orders" },
    { icon: User, label: "حسابي", href: "/profile" },
]

export function MobileBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-3 z-[60] shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-around">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 transition-colors",
                                isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
                            <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
