"use client"

import { Home, Grid, Tag, Receipt, User } from "lucide-react"
import { motion } from "framer-motion"
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
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-900 px-6 py-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] rounded-t-[2.5rem]">
            <div className="flex items-center justify-between max-w-sm mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-2 group transition-all relative px-2",
                                isActive ? "text-[#1FAF5A] scale-110" : "text-slate-300 dark:text-slate-600 hover:text-slate-400"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-2xl transition-all",
                                isActive && "bg-[#1FAF5A]/10 shadow-inner"
                            )}>
                                <item.icon className={cn("w-6 h-6 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                            </div>
                            <span className={cn("text-[9px] uppercase tracking-widest leading-none", isActive ? "font-black opacity-100" : "font-black opacity-0 group-hover:opacity-100")}>
                                {item.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavDot"
                                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1FAF5A] rounded-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
