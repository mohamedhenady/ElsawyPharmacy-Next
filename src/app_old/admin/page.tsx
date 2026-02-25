"use client"

import { useState, useEffect } from "react"
import { Loader2, TrendingUp, Package, Users, ShoppingCart } from "lucide-react"

export default function AdminOverview() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        customers: 0
    })
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [ordersRes, productsRes] = await Promise.all([
                    fetch('/api/orders'),
                    fetch('/api/products')
                ])
                const [ordersData, productsData] = await Promise.all([
                    ordersRes.json(),
                    productsRes.json()
                ])

                const totalRevenue = ordersData.reduce((acc: number, o: any) => acc + (o.total_price || 0), 0)
                const totalOrders = ordersData.length
                const totalProducts = productsData.length

                setStats({
                    revenue: totalRevenue,
                    orders: totalOrders,
                    products: totalProducts,
                    customers: new Set(ordersData.map((o: any) => o.user_id)).size || 0
                })
                setOrders(ordersData.slice(0, 5))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        )
    }

    const cards = [
        { label: "إجمالي المبيعات", value: `${stats.revenue} ر.س`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "الطلبات", value: stats.orders, icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "المنتجات", value: stats.products, icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "العملاء", value: stats.customers, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    ]

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900">مرحباً بك، المدير 👋</h1>
                <p className="text-muted-foreground text-lg mt-2 font-medium">إليك أداء المتجر اليوم.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card, i) => (
                    <div key={i} className="rounded-[2.5rem] border bg-white p-8 shadow-sm hover:shadow-xl transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-2xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{card.label}</p>
                        <div className="text-3xl font-black text-slate-900 mt-1">{card.value}</div>
                    </div>
                ))}
            </div>

            <div className="rounded-[3rem] border bg-white shadow-sm overflow-hidden">
                <div className="p-10 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-black">آخر الطلبات</h2>
                    <button className="text-primary font-bold hover:underline">عرض الكل</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-slate-50 text-slate-400 text-sm font-bold">
                            <tr>
                                <th className="px-10 py-4 uppercase">رقم الطلب</th>
                                <th className="px-10 py-4 uppercase">العميل</th>
                                <th className="px-10 py-4 uppercase">الإجمالي</th>
                                <th className="px-10 py-4 uppercase">الحالة</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-20 text-center text-muted-foreground font-bold">لا توجد طلبات لعرضها حالياً.</td>
                                </tr>
                            ) : orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-10 py-6 font-mono text-xs text-slate-400">#{order.id.slice(0, 8)}</td>
                                    <td className="px-10 py-6 font-bold">{order.shipping_address?.full_name || 'عميل'}</td>
                                    <td className="px-10 py-6 font-black text-secondary">{order.total_price} ر.س</td>
                                    <td className="px-10 py-6">
                                        <span className="px-4 py-1 rounded-full bg-slate-100 text-xs font-black">
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

