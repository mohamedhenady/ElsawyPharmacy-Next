"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/store/useCartStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Truck, CreditCard, Banknote } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore()
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
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
            // 1. Create the order in Supabase
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
            const order = await response.json()

            // 2. If payment is card, initiate Paymob
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

                // Redirect to Paymob Iframe
                window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${payment_token}`
                return
            }

            // 3. For Cash, just go to success
            clearCart()
            router.push('/checkout/success')
        } catch (err) {
            alert('حدث خطأ أثناء إتمام الطلب. يرجى المحاولة مرة أخرى.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <h1 className="text-4xl font-black mb-12">إتمام الطلب</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Truck className="w-5 h-5" />
                            </div>
                            بيانات التوصيل
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">الاسم بالكامل</Label>
                                <Input
                                    id="full_name"
                                    required
                                    placeholder="أحمد محمد..."
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="example@mail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone">رقم الهاتف</Label>
                                <Input
                                    id="phone"
                                    required
                                    placeholder="01xxxxxxxxx"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">المدينة</Label>
                                <Input
                                    id="city"
                                    disabled
                                    value="القاهرة (التوصيل متاح حالياً للقاهرة فقط)"
                                    className="rounded-xl h-12 bg-slate-50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">العنوان بالتفصيل</Label>
                            <Input
                                id="address"
                                required
                                placeholder="رقم العمارة، اسم الشارع، المنطقة..."
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="rounded-xl h-12"
                            />
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Lock className="w-5 h-5" />
                            </div>
                            طريقة الدفع
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <label
                                className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.payment_method === 'card' ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    className="hidden"
                                    onChange={() => setFormData({ ...formData, payment_method: 'card' })}
                                />
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.payment_method === 'card' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">بطاقة بنكية</p>
                                    <p className="text-xs text-muted-foreground">دفع آمن عبر Paymob</p>
                                </div>
                            </label>

                            <label
                                className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.payment_method === 'cash' ? 'border-secondary bg-secondary/5 shadow-inner' : 'border-slate-100 hover:border-slate-200'}`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    className="hidden"
                                    onChange={() => setFormData({ ...formData, payment_method: 'cash' })}
                                />
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${formData.payment_method === 'cash' ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    <Banknote className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">عند الاستلام</p>
                                    <p className="text-xs text-muted-foreground">ادفع نقداً عند التوصيل</p>
                                </div>
                            </label>
                        </div>
                    </section>

                    <Button
                        disabled={loading}
                        className="w-full h-16 rounded-full text-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                جاري المعالجة...
                            </div>
                        ) : (
                            `تأكيد الطلب (${getTotalPrice()} ر.س)`
                        )}
                    </Button>
                </form>

                {/* Summary */}
                <div className="space-y-8 lg:sticky lg:top-24">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl space-y-8">
                        <h3 className="text-2xl font-black flex items-center gap-2">
                            ملخص الطلب
                            <span className="text-sm font-normal text-muted-foreground">({items.length} منتجات)</span>
                        </h3>
                        <div className="max-h-[300px] overflow-y-auto space-y-6 pr-4 custom-scrollbar">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 group">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                                        <span className="text-2xl">💊</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold line-clamp-1 text-slate-800">{item.name_ar}</p>
                                        <p className="text-sm text-muted-foreground">{item.quantity} × {item.price} ر.س</p>
                                    </div>
                                    <p className="font-black text-slate-900">{item.price * item.quantity} ر.س</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4 pt-6 border-t font-bold">
                            <div className="flex justify-between text-muted-foreground">
                                <span>المجموع الفرعي</span>
                                <span>{getTotalPrice()} ر.س</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>مصاريف الشحن</span>
                                <span className="text-emerald-500">مجاني</span>
                            </div>
                            <div className="flex justify-between text-3xl font-black pt-4 text-slate-900">
                                <span>الإجمالي</span>
                                <span className="text-secondary">{getTotalPrice()} ر.س</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex gap-4 items-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                            <Lock className="w-6 h-6" />
                        </div>
                        <p className="text-sm text-emerald-800 font-medium leading-relaxed">بياناتك مشفرة وآمنة تماماً. نستخدم أعلى معايير الحماية لضمان سلامة عمليات الدفع.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Loader2({ className }: { className?: string }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
}

