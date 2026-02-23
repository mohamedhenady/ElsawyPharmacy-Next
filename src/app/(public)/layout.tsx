import Link from "next/link"
import { Navbar } from "@/components/shared/Navbar"
import { ChevronLeft, PhoneCall } from "lucide-react"

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col" dir="rtl">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-right">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-lg border border-white/10">
                                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl">صيدلية الصاوي</h3>
                                    <p className="text-primary text-xs font-bold tracking-widest uppercase">ElSawy Pharmacy</p>
                                </div>
                            </div>
                            <p className="text-slate-400 leading-relaxed italic pr-4 border-r-2 border-primary/30">
                                "{"علمنا، دوئنا، صحتك"}"
                            </p>
                            <div className="space-y-4">
                                <p className="text-slate-300 font-bold flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary border border-white/10 italic">#</span>
                                    212 عمارات الضباط - مدينة نصر، القاهرة.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="font-black text-xl border-b border-white/10 pb-4 inline-block">روابط كُبرى</h3>
                            <ul className="space-y-4 font-bold">
                                <li><Link href="/" className="text-slate-400 hover:text-primary transition-all flex items-center gap-2 hover:translate-x-[-8px]">الرئيسية <ChevronLeft className="w-4 h-4" /></Link></li>
                                <li><Link href="/products" className="text-slate-400 hover:text-primary transition-all flex items-center gap-2 hover:translate-x-[-8px]">جميع المنتجات <ChevronLeft className="w-4 h-4" /></Link></li>
                                <li><Link href="/categories" className="text-slate-400 hover:text-primary transition-all flex items-center gap-2 hover:translate-x-[-8px]">التصنيفات <ChevronLeft className="w-4 h-4" /></Link></li>
                                <li><Link href="https://www.facebook.com/share/1JjTzf4dz6/" target="_blank" className="text-slate-400 hover:text-primary transition-all flex items-center gap-2 hover:translate-x-[-8px]">فيسبوك <ChevronLeft className="w-4 h-4" /></Link></li>
                                <li><Link href="https://www.instagram.com/elsawypharmacy?igsh=MWN1ZHVyYW8xNm8yNA==" target="_blank" className="text-slate-400 hover:text-primary transition-all flex items-center gap-2 hover:translate-x-[-8px]">إنستجرام <ChevronLeft className="w-4 h-4" /></Link></li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h3 className="font-black text-xl border-b border-white/10 pb-4 inline-block">خدماتنا</h3>
                            <ul className="space-y-4 font-bold">
                                <li><Link href="/faq" className="text-slate-400 hover:text-primary transition-all">الأسئلة الشائعة</Link></li>
                                <li><Link href="/shipping" className="text-slate-400 hover:text-primary transition-all">سياسة التوصيل</Link></li>
                                <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-all">اتصل بنا</Link></li>
                                <li><Link href="#" className="text-slate-400 hover:text-primary transition-all text-sm opacity-50">برنامج الولاء (قريباً)</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-8 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                            <h3 className="font-black text-xl">تواصل مباشر</h3>
                            <div className="space-y-4">
                                <p className="text-2xl font-black text-primary">01024697326</p>
                                <p className="text-sm text-slate-400">خدمة عملاء مميزة على مدار الساعة</p>
                                <div className="flex gap-4 pt-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                                        <PhoneCall className="w-5 h-5" />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                                        <div className="font-black text-xs">WA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-sm text-slate-500 font-bold">© 2026 جميع الحقوق محفوظة لصيدلية الصاوي - تصميم VIP</p>
                        <div className="flex gap-8 text-xs text-slate-500 font-bold uppercase tracking-widest">
                            <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
                            <Link href="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
