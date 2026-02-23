"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, UserPlus, Mail, Lock, User } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    }
                }
            })

            if (error) throw error

            if (data.user) {
                // Create profile
                await supabase.from('profiles').insert([
                    { id: data.user.id, full_name: name, email }
                ])

                alert("تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.")
                router.push('/login')
            }
        } catch (err: any) {
            setError(err.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-primary text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 text-center space-y-8 max-w-lg">
                    <div className="w-24 h-24 bg-white text-primary rounded-[2.5rem] mx-auto flex items-center justify-center text-5xl shadow-2xl skew-y-6">
                        ✨
                    </div>
                    <h2 className="text-5xl font-black leading-tight">انضم إلى <br /><span className="italic text-slate-900 underline decoration-slate-900/30">مجتمعنا الصحي</span></h2>
                    <p className="text-xl text-primary-foreground/80 leading-relaxed font-medium">ابدأ رحلتك معنا اليوم واستمتع بتجربة تسوق طبية فريدة، آمنة، وسريعة.</p>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-right">
                        <Badge className="bg-secondary/10 text-secondary border-none">جديد هنا؟</Badge>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">إنشاء حساب</h1>
                        <p className="text-muted-foreground font-medium">خطوات بسيطة وتبدأ تجربتك المميزة.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">الاسم بالكامل</Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="أحمد محمد"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 pr-4 h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all text-right"
                                />
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 pr-4 h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all text-left"
                                />
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-4 h-14 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all text-left"
                                />
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            </div>
                        </div>

                        <Button disabled={loading} className="w-full h-14 rounded-2xl text-lg font-black bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20">
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "إنشاء الحساب"}
                            <UserPlus className="mr-2 w-5 h-5" />
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            لديك حساب بالفعل؟{" "}
                            <Link href="/login" className="text-primary font-black hover:underline">
                                سجل دخولك الآن
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
