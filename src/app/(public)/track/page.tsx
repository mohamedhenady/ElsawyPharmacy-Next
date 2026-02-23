"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
    Search,
    Package,
    Truck,
    CheckCircle,
    Clock,
    MapPin,
    Phone,
    ChevronRight,
    Home,
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface OrderStep {
    status: string
    title: string
    description: string
    completed: boolean
    current: boolean
    date?: string
}

const orderSteps: OrderStep[] = [
    { status: 'confirmed', title: 'تم تأكيد الطلب', description: 'تم استلام طلبك بنجاح', completed: true, current: false, date: '2024-01-28 10:30' },
    { status: 'preparing', title: 'جاري التجهيز', description: 'الصيدلية تعد طلبك', completed: true, current: false, date: '2024-01-28 11:45' },
    { status: 'shipped', title: 'تم الشحن', description: 'في الطريق إليك', completed: true, current: true, date: '2024-01-28 14:20' },
    { status: 'out_for_delivery', title: 'في الطريق', description: 'الطلب وصل لمنطقتك', completed: false, current: false },
    { status: 'delivered', title: 'تم التوصيل', description: 'تم تسليم الطلب', completed: false, current: false },
]

export default function TrackOrderPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const orderId = searchParams.get('id')
    const [searchOrderId, setSearchOrderId] = useState(orderId || '')
    const [trackingData, setTrackingData] = useState<any>(null)

    const handleTrack = () => {
        if (!searchOrderId) return
        setTrackingData({
            id: searchOrderId,
            items: [
                { name: 'فيتو C اقراص فوار', quantity: 2, price: 350 },
                { name: 'باراسيتامول 500mg', quantity: 1, price: 25 },
            ],
            total: 725,
            status: 'shipped',
            estimatedDelivery: '2024-01-29',
            address: 'شارع محمد نجيب، حي السلام، مدينة نصر، القاهرة',
            phone: '01024697326',
        })
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">تتبع طلبك</h1>
                    <p className="text-slate-500 text-xl">أدخل رقم الطلب لمعرفة حالة شحنتك</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="rounded-[2rem] border-0 shadow-xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex gap-4">
                                <Input
                                    placeholder="أدخل رقم الطلب (مثال: ORD-001)"
                                    value={searchOrderId}
                                    onChange={(e) => setSearchOrderId(e.target.value)}
                                    className="h-14 rounded-2xl text-lg font-bold"
                                />
                                <Button
                                    onClick={handleTrack}
                                    className="h-14 px-8 rounded-2xl font-bold text-lg shadow-lg"
                                >
                                    <Search className="w-5 h-5 ml-2" />
                                    تتبع
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {trackingData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 max-w-4xl mx-auto"
                    >
                        <div className="bg-white rounded-[3rem] shadow-xl border overflow-hidden">
                            <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <Badge className="bg-white/20 text-white mb-2">الطلب #{trackingData.id}</Badge>
                                        <h2 className="text-3xl font-black">تم الشحن</h2>
                                        <p className="text-white/80">التوصيل المتوقع: {trackingData.estimatedDelivery}</p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-4xl font-black">{trackingData.total} <span className="text-xl">ر.س</span></p>
                                        <p className="text-white/80">مجموع الطلب</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="relative">
                                    <div className="absolute top-0 right-8 bottom-0 w-0.5 bg-slate-200 hidden md:block" />
                                    
                                    <div className="space-y-8">
                                        {orderSteps.map((step, idx) => (
                                            <div key={step.status} className="flex gap-6">
                                                <div className="relative z-10">
                                                    <div className={cn(
                                                        "w-16 h-16 rounded-full flex items-center justify-center",
                                                        step.completed ? "bg-green-500 text-white" :
                                                        step.current ? "bg-primary text-white animate-pulse" :
                                                        "bg-slate-100 text-slate-400"
                                                    )}>
                                                        {step.completed ? <CheckCircle className="w-8 h-8" /> :
                                                         step.current ? <Truck className="w-8 h-8" /> :
                                                         <Clock className="w-8 h-8" />}
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-2">
                                                    <h3 className={cn(
                                                        "font-black text-xl",
                                                        step.completed || step.current ? "text-slate-900" : "text-slate-400"
                                                    )}>
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-slate-500">{step.description}</p>
                                                    {step.date && (
                                                        <p className="text-sm text-slate-400 mt-1">{step.date}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t p-8 bg-slate-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">عنوان التوصيل</h4>
                                            <p className="text-slate-500">{trackingData.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">رقم الهاتف</h4>
                                            <p className="text-slate-500">{trackingData.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <h4 className="font-black text-lg mb-4">المنتجات ({trackingData.items.length})</h4>
                                <div className="space-y-3">
                                    {trackingData.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                            <div className="flex items-center gap-3">
                                                <Package className="w-5 h-5 text-primary" />
                                                <span className="font-bold">{item.name}</span>
                                                <Badge variant="outline">×{item.quantity}</Badge>
                                            </div>
                                            <span className="font-black text-secondary">{item.price} ر.س</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8 justify-center">
                            <Link href="/dashboard">
                                <Button className="rounded-full font-bold px-8">
                                    <Home className="w-4 h-4 ml-2" />
                                    لوحة التحكم
                                </Button>
                            </Link>
                            <Link href="/products">
                                <Button variant="outline" className="rounded-full font-bold px-8">
                                    تسوق مرة أخرى
                                    <ArrowRight className="w-4 h-4 mr-2" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
