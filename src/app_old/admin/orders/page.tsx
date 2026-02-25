"use client"

import { useState, useEffect } from "react"
import { Loader2, Search, Eye, CheckCircle2, Truck, Box, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const statusMap: Record<string, any> = {
    pending: { label: "قيد الانتظار", color: "bg-amber-50 text-amber-600", icon: Box },
    processing: { label: "جارِ التجهيز", color: "bg-blue-50 text-blue-600", icon: Loader2 },
    shipped: { label: "تم الشحن", color: "bg-purple-50 text-purple-600", icon: Truck },
    delivered: { label: "تم التوصيل", color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
    cancelled: { label: "ملغي", color: "bg-red-50 text-red-600", icon: XCircle },
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [updating, setUpdating] = useState(false)

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/orders')
            const data = await res.json()
            setOrders(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const updateStatus = async (id: string, newStatus: string) => {
        setUpdating(true)
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            if (!res.ok) throw new Error('Update failed')
            fetchOrders()
            if (selectedOrder?.id === id) {
                setSelectedOrder({ ...selectedOrder, status: newStatus })
            }
        } catch (err) {
            alert('فشل في تحديث حالة الطلب.')
        } finally {
            setUpdating(false)
        }
    }

    const filteredOrders = orders.filter(o =>
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.shipping_address?.full_name?.includes(searchQuery)
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">إدارة الطلبات</h1>
                <p className="text-muted-foreground">متابعة الطلبات وتحديث حالتها وتحصيل المدفوعات.</p>
            </div>

            <div className="relative max-w-md">
                <Input
                    placeholder="ابحث برقم الطلب أو اسم العميل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 h-12 rounded-xl"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="border rounded-[2rem] bg-white overflow-hidden shadow-sm">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-500">رقم الطلب</th>
                            <th className="px-6 py-4 font-bold text-slate-500">العميل</th>
                            <th className="px-6 py-4 font-bold text-slate-500">الإجمالي</th>
                            <th className="px-6 py-4 font-bold text-slate-500">الحالة</th>
                            <th className="px-6 py-4 font-bold text-slate-500">التاريخ</th>
                            <th className="px-6 py-4 font-bold text-slate-500">العمليات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                </td>
                            </tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-muted-foreground">لا توجد طلبات حالياً.</td>
                            </tr>
                        ) : filteredOrders.map((order) => {
                            const status = statusMap[order.status] || statusMap.pending
                            return (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{order.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 font-bold">{order.shipping_address?.full_name || 'عميل'}</td>
                                    <td className="px-6 py-4 font-black text-secondary">{order.total_price} ر.س</td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 w-fit", status.color)}>
                                            <status.icon className="w-3 h-3" />
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(order.created_at).toLocaleDateString('ar-EG')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)} className="text-primary hover:bg-primary/10 rounded-lg">
                                                    <Eye className="w-5 h-5" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="rounded-[2.5rem] max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-2xl font-bold">تفاصيل الطلب #{order.id.slice(0, 8)}</DialogTitle>
                                                </DialogHeader>
                                                {selectedOrder && (
                                                    <div className="space-y-6 pt-4">
                                                        <div className="grid grid-cols-2 gap-8">
                                                            <div className="space-y-4">
                                                                <h4 className="font-bold text-slate-500 uppercase text-xs tracking-wider">العميل والشحن</h4>
                                                                <div className="space-y-1">
                                                                    <p className="font-black text-lg">{selectedOrder.shipping_address?.full_name}</p>
                                                                    <p className="text-muted-foreground">{selectedOrder.shipping_address?.phone}</p>
                                                                    <p className="text-muted-foreground">{selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.address}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <h4 className="font-bold text-slate-500 uppercase text-xs tracking-wider">حالة الطلب</h4>
                                                                <Select
                                                                    defaultValue={selectedOrder.status}
                                                                    onValueChange={(val) => updateStatus(selectedOrder.id, val)}
                                                                    disabled={updating}
                                                                >
                                                                    <SelectTrigger className="rounded-xl h-11">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {Object.entries(statusMap).map(([key, value]) => (
                                                                            <SelectItem key={key} value={key}>{value.label}</SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <h4 className="font-bold text-slate-500 uppercase text-xs tracking-wider">المنتجات</h4>
                                                            <div className="border rounded-2xl overflow-hidden">
                                                                {selectedOrder.order_items?.map((item: any, i: number) => (
                                                                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 border-b last:border-0">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-10 h-10 rounded-lg bg-white border flex items-center justify-center shrink-0">
                                                                                {item.products?.image_url ? <img src={item.products.image_url} alt="" className="w-full h-full object-contain" /> : "💊"}
                                                                            </div>
                                                                            <div>
                                                                                <p className="font-bold text-sm">{item.products?.name_ar}</p>
                                                                                <p className="text-xs text-muted-foreground">{item.quantity} × {item.price} ر.س</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="font-black">{item.quantity * item.price} ر.س</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-between items-center p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                                                            <p className="font-bold text-xl">الإجمالي النهائي</p>
                                                            <p className="font-black text-3xl text-secondary">{selectedOrder.total_price} ر.س</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
