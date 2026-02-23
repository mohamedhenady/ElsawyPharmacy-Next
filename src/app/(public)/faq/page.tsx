"use client"

import { motion } from "framer-motion"
import {
    Plus,
    Minus,
    HelpCircle,
    CheckCircle2,
    Truck,
    CreditCard,
    ShieldAlert
} from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const faqs = [
    {
        id: "item-1",
        category: "الطلبات والتوصيل",
        icon: Truck,
        question: "ما هي مدة التوصيل داخل القاهرة؟",
        answer: "نحن نوفر خدمة توصيل فائقة السرعة، حيث تصل طلباتك في غضون ساعة إلى ساعتين كحد أقصى داخل نطاق مدينة نصر، ومن ساعتين إلى أربع ساعات لباقي مناطق القاهرة."
    },
    {
        id: "item-2",
        category: "الدفع والأمان",
        icon: CreditCard,
        question: "هل يمكنني الدفع بالفيزا عند الاستلام؟",
        answer: "نعم بالتأكيد، جميع مناديبنا يحملون أجهزة دفع إلكتروني (POS) لدفع طلباتك بالفيزا أو كاش عند باب المنزل."
    },
    {
        id: "item-3",
        category: "جودة المنتجات",
        icon: CheckCircle2,
        question: "هل المنتجات المباعة أصلية ومرخصة؟",
        answer: "جميع الأدوية والمستحضرات المباعة في صيدلية الصاوي أصلية 100% ويتم الحصول عليها مباشرة من الوكلاء المعتمدين وتخزن وفقاً لأعلى المعايير الصحية."
    },
    {
        id: "item-4",
        category: "سياسة الإرجاع",
        icon: ShieldAlert,
        question: "كيف يمكنني إرجاع منتج قمت بشرائه؟",
        answer: "يمكنك إرجاع المستحضرات غير الطبية خلال 14 يوماً من تاريخ الشراء بشرط أن تكون في حالتها الأصلية ومغلفة. يرجى ملاحظة أن الأدوية لا يتم إرجاعها أو استبدالها وفقاً لتعليمات وزارة الصحة."
    }
]

export default function FAQPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4">
                <header className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <Badge className="bg-secondary/10 text-secondary border-none px-6 py-2 text-sm font-bold">الأسئلة الشائعة</Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">كل ما تود <span className="text-secondary italic">معرفته</span></h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">إجابات سريعة وشاملة لأكثر الأسئلة التي قد تدور في ذهنك حول خدماتنا ومنتجاتنا.</p>
                </header>

                <div className="max-w-4xl mx-auto space-y-12">
                    <Accordion type="single" collapsible className="space-y-6">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <AccordionItem value={faq.id} className="bg-white rounded-[2.5rem] border px-10 py-4 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-6 text-right">
                                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0">
                                                <faq.icon className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <Badge variant="outline" className="mb-2 text-[10px] font-bold border-secondary/20 text-secondary uppercase tracking-tighter">
                                                    {faq.category}
                                                </Badge>
                                                <p className="text-xl md:text-2xl font-black text-slate-900">{faq.question}</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-8 pr-20 text-lg text-slate-600 leading-loose">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="p-12 rounded-[3.5rem] bg-primary text-white text-center space-y-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                        <h2 className="text-3xl font-black">لم تجد إجابة لاستفسارك؟</h2>
                        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-medium">نحن متاحون على مدار الـ 24 ساعة للرد على كافة استفساراتكم الطبية والتقنية.</p>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" className="rounded-full px-12 h-16 bg-white text-primary hover:bg-slate-50 font-black text-xl shadow-2xl">تواصل عبر واتساب</Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
