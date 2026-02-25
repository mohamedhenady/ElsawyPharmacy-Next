"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
    User,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
    ChevronRight,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    Edit2,
    Plus,
    Star,
    ShoppingBag,
    FileText,
    Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCartStore } from "@/store/useCartStore"
import { cn } from "@/lib/utils"

interface Order {
    id: string
    created_at: string
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    items: { name_ar: string; quantity: number; price: number }[]
}

interface Address {
    id: string
    label: string
    address: string
    city: string
    phone: string
    is_default: boolean
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("orders")
    const [orders, setOrders] = useState<Order[]>([])
    const [addresses, setAddresses] = useState<Address[]>([
        { id: '1', label: 'المنزل', address: 'شارع محمد نجيب، حي السلام', city: 'القاهرة', phone: '01024697326', is_default: true },
        { id: '2', label: 'العمل', address: 'برج النور، الدور 5', city: 'القاهرة', phone: '01024697326', is_default: false }
    ])
    const [wishlist, setWishlist] = useState<any[]>([])
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        setOrders([
            { id: 'ORD-001', created_at: '2024-01-15', total: 450, status: 'delivered', items: [{ name_ar: 'باراسيتامول 500mg', quantity: 2, price: 50 }, { name_ar: 'فيتو C اقراص', quantity: 1, price: 350 }] },
            { id: 'ORD-002', created_at: '2024-01-20', total: 280, status: 'shipped', items: [{ name_ar: 'باند戒烟', quantity: 3, price: 30 }, { name_ar: 'غسول كلينيك', quantity: 1, price: 190 }] },
            { id: 'ORD-003', created_at: '2024-01-25', total: 150, status: 'processing', items: [{ name_ar: 'ماء اكسجين', quantity: 2, price: 15 }, { name_ar: 'ضمادات', quantity: 1, price: 120 }] },
            { id: 'ORD-004', created_at: '2024-01-28', total: 520, status: 'pending', items: [{ name_ar: 'فيكس vap rub', quantity: 2, price: 85 }, { name_ar: '斯蒂卡', quantity: 1, price: 350 }] },
        ])
        
        setWishlist([
            { id: 'w1', name_ar: 'فيتو C اقراص فوار', price: 350, image_url: null, rating: 4.8 },
            { id: 'w2', name_ar: 'لوريال سيروم revitalift', price: 420, image_url: null, rating: 4.5 },
            { id: 'w3', name_ar: 'بانadol اكسترا', price: 65, image_url: null, rating: 4.9 },
        ])
    }, [])

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700'
            case 'processing': return 'bg-blue-100 text-blue-700'
            case 'shipped': return 'bg-purple-100 text-purple-700'
            case 'delivered': return 'bg-green-100 text-green-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'قيد الانتظار'
            case 'processing': return 'جاري التجهيز'
            case 'shipped': return 'تم الشحن'
            case 'delivered': return 'تم التوصيل'
            case 'cancelled': return 'ملغي'
            default: return status
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />
            case 'processing': return <Package className="w-4 h-4" />
            case 'shipped': return <Truck className="w-4 h-4" />
            case 'delivered': return <CheckCircle className="w-4 h-4" />
            case 'cancelled': return <XCircle className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-black text-slate-900">حسابي</h1>
                    <p className="text-slate-500 mt-2">مرحباً بك في لوحة التحكم الخاصة بك</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <Card className="rounded-[2rem] border-0 shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                                    <div className="w-16 h-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center">
                                        <User className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">أحمد محمد</h3>
                                        <p className="text-sm text-slate-500">ahmed@example.com</p>
                                        <Badge className="mt-1 bg-amber-100 text-amber-700 text-xs">عضو ذهبي</Badge>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    {[
                                        { icon: Package, label: 'الطلبات', value: 'orders', count: 4 },
                                        { icon: Heart, label: 'المفضلة', value: 'wishlist', count: 3 },
                                        { icon: MapPin, label: 'العناوين', value: 'addresses', count: 2 },
                                        { icon: FileText, label: 'العروض', value: 'offers', count: 2 },
                                        { icon: Bell, label: 'الإشعارات', value: 'notifications', count: 5 },
                                        { icon: Settings, label: 'الإعدادات', value: 'settings' },
                                    ].map((item) => (
                                        <button
                                            key={item.value}
                                            onClick={() => setActiveTab(item.value)}
                                            className={cn(
                                                "w-full flex items-center justify-between p-4 rounded-2xl transition-all font-bold",
                                                activeTab === item.value
                                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                    : "hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5" />
                                                <span>{item.label}</span>
                                            </div>
                                            {'count' in item && item.count && (
                                                <Badge className={cn(
                                                    "rounded-full",
                                                    activeTab === item.value ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                                                )}>
                                                    {item.count}
                                                </Badge>
                                            )}
                                        </button>
                                    ))}
                                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-red-500 hover:bg-red-50">
                                        <LogOut className="w-5 h-5" />
                                        <span>تسجيل الخروج</span>
                                    </button>
                                </nav>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black">طلباتي</h2>
                                    <div className="flex gap-2">
                                        <Badge className="bg-amber-100 text-amber-700 px-4 py-2">
                                            <Star className="w-4 h-4 ml-1 fill-current" />
                                            250 نقطة
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {orders.map((order, idx) => (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white rounded-[2rem] p-8 shadow-sm border hover:shadow-lg transition-all"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-black text-lg">{order.id}</span>
                                                        <Badge className={cn("rounded-full font-bold", getStatusColor(order.status))}>
                                                            {getStatusIcon(order.status)}
                                                            <span className="mr-1">{getStatusText(order.status)}</span>
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-slate-500">{new Date(order.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-2xl font-black text-secondary">{order.total} <span className="text-sm">ر.س</span></p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 mb-6">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="flex justify-between text-sm">
                                                        <span className="text-slate-600">{item.name_ar} × {item.quantity}</span>
                                                        <span className="font-bold">{item.price * item.quantity} ر.س</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex gap-3">
                                                <Button className="rounded-full flex-1 font-bold">
                                                    تتبع الطلب
                                                    <Truck className="w-4 h-4 mr-2" />
                                                </Button>
                                                <Button variant="outline" className="rounded-full font-bold">
                                                    إعادة طلب
                                                    <ChevronRight className="w-4 h-4 mr-2" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">قائمة أمنياتي</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {wishlist.map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white rounded-[2rem] p-6 shadow-sm border flex gap-6 hover:shadow-lg transition-all"
                                        >
                                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.name_ar} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-4xl">💊</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg mb-1">{item.name_ar}</h3>
                                                <div className="flex items-center gap-1 mb-2">
                                                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                                                    <span className="text-sm font-bold">{item.rating}</span>
                                                </div>
                                                <p className="text-xl font-black text-secondary mb-3">{item.price} ر.س</p>
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="rounded-full font-bold flex-1" onClick={() => addItem(item)}>
                                                        <ShoppingBag className="w-4 h-4 ml-1" />
                                                        إضافة للسلة
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="rounded-full">
                                                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black">عناويني</h2>
                                    <Button className="rounded-full font-bold">
                                        <Plus className="w-4 h-4 ml-2" />
                                        إضافة عنوان جديد
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addresses.map((addr, idx) => (
                                        <motion.div
                                            key={addr.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={cn(
                                                "bg-white rounded-[2rem] p-8 shadow-sm border-2 relative overflow-hidden",
                                                addr.is_default ? "border-primary" : "border-transparent"
                                            )}
                                        >
                                            {addr.is_default && (
                                                <Badge className="absolute top-4 left-4 bg-primary text-white rounded-full">
                                                    افتراضي
                                                </Badge>
                                            )}
                                            <div className="mb-4">
                                                <h3 className="font-black text-xl">{addr.label}</h3>
                                            </div>
                                            <div className="space-y-2 text-slate-600 mb-4">
                                                <p className="font-bold">{addr.address}</p>
                                                <p className="font-bold">{addr.city}</p>
                                                <p className="font-bold">{addr.phone}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="rounded-full font-bold flex-1">
                                                    <Edit2 className="w-4 h-4 ml-1" />
                                                    تعديل
                                                </Button>
                                                <Button variant="ghost" size="sm" className="rounded-full text-red-500 hover:bg-red-50">
                                                    حذف
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'offers' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">العروض المتاحة لك</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-[2rem] p-8 border border-amber-200"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <Star className="w-6 h-6 text-amber-500 fill-current" />
                                            <span className="font-black text-xl">Points</span>
                                        </div>
                                        <p className="text-4xl font-black text-amber-600 mb-2">250 نقطة</p>
                                        <p className="text-sm text-amber-700 mb-4"> Worth 25 SAR towards your next order</p>
                                        <Button className="rounded-full bg-amber-500 hover:bg-amber-600 font-bold w-full">
                                            استبدال النقاط
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-[2rem] p-8 border border-primary/20"
                                    >
                                        <div className="flex items-center gap-2 mb-4">
                                            <Gift className="w-6 h-6 text-primary" />
                                            <span className="font-black text-xl">Coupon</span>
                                        </div>
                                        <p className="text-4xl font-black text-primary mb-2">15% OFF</p>
                                        <p className="text-sm text-primary/70 mb-4">On vitamins & supplements</p>
                                        <Button className="rounded-full font-bold w-full">
                                            نسخ الكود
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">الإشعارات</h2>
                                <div className="space-y-4">
                                    {[
                                        { title: 'تم توصيل طلبك', desc: 'تم توصيل طلبك ORD-001 بنجاح', time: 'منذ ساعتين', read: false },
                                        { title: 'عرض جديد!', desc: 'خصم 20% على جميع الفيتامينات', time: 'منذ يوم', read: false },
                                        { title: 'شكراً لطلبك', desc: 'تم تأكيد طلبك ORD-004', time: 'منذ 3 أيام', read: true },
                                    ].map((notif, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className={cn(
                                                "bg-white rounded-2xl p-6 shadow-sm border cursor-pointer hover:shadow-md transition-all",
                                                !notif.read && "border-r-4 border-r-primary"
                                            )}
                                        >
                                            <div className="flex justify-between mb-2">
                                                <h3 className="font-bold">{notif.title}</h3>
                                                <span className="text-xs text-slate-400">{notif.time}</span>
                                            </div>
                                            <p className="text-sm text-slate-500">{notif.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">الإعدادات</h2>
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border space-y-6">
                                    <div className="flex items-center justify-between py-4 border-b">
                                        <div>
                                            <h3 className="font-bold text-lg">الإشعارات_push</h3>
                                            <p className="text-sm text-slate-500">Receive notifications about orders and offers</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full bg-green-100 text-green-700 border-green-200 font-bold">
                                            مفعل
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b">
                                        <div>
                                            <h3 className="font-bold text-lg">الرسائل النصية</h3>
                                            <p className="text-sm text-slate-500">Receive SMS about order updates</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full bg-green-100 text-green-700 border-green-200 font-bold">
                                            مفعل
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <div>
                                            <h3 className="font-bold text-lg">النشرة البريدية</h3>
                                            <p className="text-sm text-slate-500">Receive weekly newsletters with offers</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full bg-green-100 text-green-700 border-green-200 font-bold">
                                            مفعل
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

function Gift({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12v10H4V12" />
            <path d="M2 7h20v5H2z" />
            <path d="M12 22V7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
    )
}
