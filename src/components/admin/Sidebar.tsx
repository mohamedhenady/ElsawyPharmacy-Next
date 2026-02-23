"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ListTree,
    ShoppingCart,
    FileUp,
    Settings,
    LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"

const adminLinks = [
    { name: "الطلبات", nameEn: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "المنتجات", nameEn: "Products", href: "/admin/products", icon: Package },
    { name: "التصنيفات", nameEn: "Categories", href: "/admin/categories", icon: ListTree },
    { name: "استيراد", nameEn: "Import", href: "/admin/import", icon: FileUp },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="flex flex-col w-64 border-l bg-muted/20 min-h-screen">
            <div className="p-6">
                <h2 className="text-xl font-bold text-primary">لوحة التحكم</h2>
                <p className="text-sm text-muted-foreground">صيدلية الشروق</p>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {adminLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{link.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary p-2"
                >
                    <Settings className="w-4 h-4" />
                    <span>العودة للمتجر</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 p-2 w-full text-right"
                >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                </button>
            </div>
        </div>
    )
}

