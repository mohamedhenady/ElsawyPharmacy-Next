"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import {
    ShieldCheck,
    Truck,
    CreditCard,
    Banknote,
    ChevronLeft,
    ShoppingBag,
    Lock,
    MapPin,
    ArrowRight
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore()
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const router = useRouter()

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        address: "",
        city: "القاهرة",
        payment_method: "cash"
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    if (items.length === 0) {
        if (typeof window !== 'undefined') router.push('/cart')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const orderData = {
                total_price: getTotalPrice(),
                shipping_address: `${formData.address}, ${formData.city}`,
                payment_method: formData.payment_method,
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            }

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })

            if (!response.ok) throw new Error('Order creation failed')

            if (formData.payment_method === 'card') {
                const paymobRes = await fetch('/api/paymob', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: getTotalPrice(),
                        items: items.map(i => ({ name: i.name_ar, amount_cents: i.price * 100, quantity: i.quantity })),
                        billing_data: {
                            first_name: formData.full_name.split(' ')[0],
                            last_name: formData.full_name.split(' ')[1] || "User",
                            email: formData.email,
                            phone_number: formData.phone,
                            city: formData.city,
                            street: formData.address
                        }
                    })
                })

                if (!paymobRes.ok) throw new Error('Paymob initiation failed')
                const { payment_token, iframe_id } = await paymobRes.json()
                window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${payment_token}`
                return
            }

            clearCart()
            router.push('/checkout/success')
        } catch (err) {
            alert('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-32 pt-16" dir="rtl">
            <div className="container mx-auto px-4">
                <header className="mb-12 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center text-secondary shadow-inner">
                            <Lock className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900">إتمام الدفع الآمن</h1>
                            <p className="text-slate-500 font-bold italic">خطوات بسيطة للحصول على أدويتك...</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Form Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step Navigation */}
                        <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm w-fit">
                            <button
                                onClick={() => setStep(1)}
                                className={`px-6 py-2 rounded-xl font-black transition-all ${step === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                1. بيانات التوصيل
                            </button>
                            <div className="w-4 h-px bg-slate-200" />
                            <button
                                onClick={() => step > 1 && setStep(2)}
                                className={`px-6 py-2 rounded-xl font-black transition-all ${step === 2 ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-slate-400 hover:bg-slate-50'}`}
                            >
                                2. وسيلة الدفع
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-10"
                                    >
                                        <div className="space-y-6">
                                            <h2 className="text-2xl font-black flex items-center gap-3 text-slate-800">
                                                <MapPin className="text-primary w-6 h-6" />
                                                أين نرسل طلبك؟
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <Label className="font-black pr-2">الاسم بالكامل</Label>
                                                    <Input
                                                        required
                                                        placeholder="محمد أحمد..."
                                                        className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold focus:ring-2 focus:ring-primary transition-all"
                                                        value={formData.full_name}
                                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="font-black pr-2">رقم الهاتف</Label>
                                                    <Input
                                                        required
                                                        placeholder="010XXXXXXXX"
                                                        className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="font-black pr-2">البريد الإلكتروني</Label>
                                                    <Input
                                                        type="email"
                                                        required
                                                        placeholder="email@example.com"
                                                        className="h-16 rounded-2xl bg-slate-50 border-none px-6 font-bold"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="font-black pr-2">المدينة</Label>
                                                    <Input
                                                        disabled
                                                        value="القاهرة (التوصيل متاح للقاهرة فقط حالياً)"
                                                        className="h-16 rounded-2xl bg-slate-100 border-none px-6 font-bold opacity-60 cursor-not-allowed"
                                                    />
                                                </div>
                                                <div className="space-y-3 md:col-span-2">
                                                    <Label className="font-black pr-2">العنوان بالتفصيل</Label>
                                                    <textarea
                                                        required
                                                        placeholder="رقم العمارة، الشارع، علامة مميزة..."
                                                        className="w-full h-32 rounded-3xl bg-slate-50 border-none p-6 font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full h-20 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-2xl font-black shadow-xl shadow-primary/20 group"
                                        >
                                            الاستمرار لاختيار الدفع
                                            <ChevronLeft className="w-7 h-7 group-hover:-translate-x-2 transition-transform mr-2" />
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 space-y-10"
                                    >
                                        <div className="space-y-8">
                                            <h2 className="text-2xl font-black flex items-center gap-3 text-slate-800">
                                                <CreditCard className="text-secondary w-6 h-6" />
                                                اختر وسيلة الدفع المناسبة
                                            </h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <label className={`relative p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${formData.payment_method === 'cash' ? 'border-secondary bg-secondary/5' : 'border-slate-100 opacity-60 hover:opacity-100'}`}>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        className="hidden"
                                                        checked={formData.payment_method === 'cash'}
                                                        onChange={() => setFormData({ ...formData, payment_method: 'cash' })}
                                                    />
                                                    <Banknote className={`w-10 h-10 mb-4 ${formData.payment_method === 'cash' ? 'text-secondary' : 'text-slate-300'}`} />
                                                    <p className="text-xl font-black">عند الاستلام</p>
                                                    <p className="text-sm font-bold text-slate-500">ادفع نقداً أو بالفيزا للمندوب</p>
                                                    {formData.payment_method === 'cash' && <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-secondary shadow-lg shadow-secondary/40 animate-pulse" />}
                                                </label>

                                                <label className={`relative p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all ${formData.payment_method === 'card' ? 'border-primary bg-primary/5' : 'border-slate-100 opacity-60 hover:opacity-100'}`}>
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        className="hidden"
                                                        checked={formData.payment_method === 'card'}
                                                        onChange={() => setFormData({ ...formData, payment_method: 'card' })}
                                                    />
                                                    <CreditCard className={`w-10 h-10 mb-4 ${formData.payment_method === 'card' ? 'text-primary' : 'text-slate-300'}`} />
                                                    <p className="text-xl font-black">بطاقة بنكية / محفظة</p>
                                                    <p className="text-sm font-bold text-slate-500">دفع آمن وسريع عبر Paymob</p>
                                                    {formData.payment_method === 'card' && <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/40 animate-pulse" />}
                                                </label>
                                            </div>

                                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                                <ShieldCheck className="text-emerald-500 w-6 h-6" />
                                                <p className="text-emerald-800 font-bold text-sm">توصيل مجاني لطلبك! سيصلك خلال 120 دقيقة بحد أقصى.</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <Button
                                                disabled={loading}
                                                className="w-full h-20 rounded-[2rem] bg-secondary hover:bg-secondary/90 text-2xl font-black shadow-2xl shadow-secondary/20 transition-all active:scale-95"
                                            >
                                                {loading ? "جاري المعالجة..." : `تأكيد الطلب بمبلغ ${getTotalPrice()} ر.س`}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setStep(1)}
                                                className="h-14 rounded-2xl font-bold text-slate-400 hover:text-slate-600"
                                            >
                                                رجوع لتعديل البيانات
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50 space-y-8 sticky top-32">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <ShoppingBag className="text-primary w-6 h-6" />
                                ملخص طلبك
                            </h3>

                            <div className="max-h-[300px] overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 group">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                                            <span className="text-2xl">💊</span>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="font-black text-sm text-slate-800 line-clamp-1">{item.name_ar}</p>
                                            <p className="text-xs font-bold text-slate-400">{item.quantity} × {item.price} ر.س</p>
                                        </div>
                                        <p className="font-black text-slate-900">{(item.price * item.quantity).toFixed(0)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t space-y-4">
                                <div className="flex justify-between font-bold text-slate-500">
                                    <span>المجموع</span>
                                    <span>{getTotalPrice()} ر.س</span>
                                </div>
                                <div className="flex justify-between font-bold text-slate-500">
                                    <span>الشحن</span>
                                    <span className="text-emerald-500 tracking-tighter">مجـــــــاني</span>
                                </div>
                                <div className="pt-4 flex justify-between font-black text-3xl text-secondary border-t border-slate-100">
                                    <span>الإجمالي</span>
                                    <span>{getTotalPrice()} <span className="text-sm">ر.س</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 space-y-4">
                            <h4 className="font-black text-blue-900 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                ضمان الصاوي
                            </h4>
                            <p className="text-sm text-blue-800/80 font-bold leading-relaxed italic">نلتزم بتوفير أجود أنواع الأدوية والمستلزمات الطبية من مصادرها المعتمدة رسمياً.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
