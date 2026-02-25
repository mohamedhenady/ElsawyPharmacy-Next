"use client"

import { motion } from "framer-motion"
import { PrescriptionUploadForm } from "@/components/prescription/PrescriptionUploadForm"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Clock, Truck } from "lucide-react"

export default function PrescriptionPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9f9] via-white to-primary/5 py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Intro Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 mb-12"
                >
                    <Badge variant="outline" className="px-6 py-1.5 border-primary/30 text-primary font-bold text-base">خدمة الروشتة</Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                        أرسل روشتتك <br />
                        <span className="text-primary italic">في ثوانٍ</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        سهلنا عليك الأمر، ارفع صورة الروشتة وسيقوم المتخصصون لدينا بتوفير أدويتك وتوصيلها حتى باب منزلك.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Benefits Sidebar */}
                    <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "آمنة وموثوقة",
                                desc: "يتم فحص روشتتك من قبل صيادلة متخصصين ومرخصين."
                            },
                            {
                                icon: Clock,
                                title: "رد سريع",
                                desc: "سنتواصل معك في أقل من 15 دقيقة من رفع الروشتة."
                            },
                            {
                                icon: Truck,
                                title: "توصيل للمنزل",
                                desc: "توصيل آمن وسريع لجميع أدويتك في نفس اليوم."
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="glass-card p-6 rounded-3xl flex gap-4 text-right"
                                dir="rtl"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 text-primary h-fit">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-lg">{benefit.title}</h3>
                                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Upload Form */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <PrescriptionUploadForm />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
