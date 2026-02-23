"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, LogIn, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            if (!supabase) throw new Error("Supabase is not configured")

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            router.push('/admin')
            router.refresh()
        } catch (err: any) {
            setError(err.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-right">
                        <Badge className="bg-primary/10 text-primary border-none">لوحة التحكم</Badge>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">تسجيل الدخول</h1>
                        <p className="text-muted-foreground font-medium">مرحباً بك مجدداً في صيدلية الشروق.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center">
                                {error}
                            </div>
                        )}
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
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Link href="#" className="text-xs text-primary font-bold hover:underline">نسيت كلمة المرور؟</Link>
                            </div>
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

                        <Button disabled={loading} className="w-full h-14 rounded-2xl text-lg font-black shadow-lg shadow-primary/20">
                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "دخول"}
                            <LogIn className="mr-2 w-5 h-5" />
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            ليس لديك حساب؟{" "}
                            <Link href="/register" className="text-primary font-black hover:underline">
                                إنشاء حساب جديد
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translateY-1/2 -translateX-1/2" />

                <div className="relative z-10 text-center space-y-8 max-w-lg">
                    <div className="w-24 h-24 bg-primary rounded-[2rem] mx-auto flex items-center justify-center text-5xl shadow-2xl rotate-12">
                        💊
                    </div>
                    <h2 className="text-5xl font-black leading-tight">النظام الأذكى لإدارة <br /><span className="text-primary italic">صيدليتك</span></h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">لوحة تحكم احترافية لمتابعة المبيعات، الطلبات، والمخزون في مكان واحد وبكل سهولة.</p>
                </div>
            </div>
        </div>
    )
}
