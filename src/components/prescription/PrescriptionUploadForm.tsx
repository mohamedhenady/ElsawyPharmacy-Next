"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, CheckCircle2, AlertCircle, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

export function PrescriptionUploadForm() {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        notes: ""
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)
            setStatus("idle")
        }
    }

    const removeFile = () => {
        setFile(null)
        setPreview(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return

        setIsUploading(true)
        setStatus("idle")

        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `prescriptions/${fileName}`

            if (!supabase) throw new Error("Supabase client not initialized")

            const { error: uploadError, data } = await supabase.storage
                .from('prescriptions')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from('prescriptions')
                .getPublicUrl(filePath)

            // 2. Save to Database via API
            const response = await fetch('/api/prescriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    imageUrl: publicUrl
                }),
            })

            if (!response.ok) throw new Error('Failed to save prescription')

            setStatus("success")
            setFile(null)
            setPreview(null)
            setFormData({ fullName: "", phone: "", address: "", notes: "" })
        } catch (error) {
            console.error('Upload failed:', error)
            setStatus("error")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Card className="glass-card border-white/50 overflow-hidden rounded-[2.5rem] shadow-xl">
            <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary mb-2">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold">رفع الروشتة</h2>
                        <p className="text-muted-foreground">قم برفع صورة الروشتة وسنقوم بالتواصل معك لتأكيد الطلب</p>
                    </div>

                    {/* File Upload Area */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {!preview ? (
                                <motion.label
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    htmlFor="prescription-upload"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/20 rounded-3xl cursor-pointer bg-primary/5 hover:bg-primary/10 transition-colors group"
                                >
                                    <Upload className="w-12 h-12 text-primary/40 group-hover:text-primary transition-colors mb-4" />
                                    <p className="text-lg font-bold">اضغط أو اسحب الصورة هنا</p>
                                    <p className="text-sm text-muted-foreground mt-2">يدعم PNG, JPG (الحد الأقصى 5MB)</p>
                                    <input
                                        id="prescription-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isUploading}
                                    />
                                </motion.label>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative rounded-3xl overflow-hidden h-64 border-2 border-primary"
                                >
                                    <img
                                        src={preview}
                                        alt="Prescription preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right" dir="rtl">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="font-bold text-lg">الاسم بالكامل</Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                placeholder="ادخل اسمك بالكامل"
                                required
                                className="h-14 rounded-2xl bg-white/50 border-white/50 focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="font-bold text-lg">رقم الهاتف</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="01xxxxxxxxx"
                                required
                                className="h-14 rounded-2xl bg-white/50 border-white/50 focus:ring-primary"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="address" className="font-bold text-lg">العنوان بالتفصيل</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="المحافظة، المنطقة، اسم الشارع، رقم العقار"
                                required
                                className="h-14 rounded-2xl bg-white/50 border-white/50 focus:ring-primary"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="notes" className="font-bold text-lg">ملاحظات إضافية</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="أي ملاحظات تود إضافتها للصيدلي"
                                className="min-h-[120px] rounded-2xl bg-white/50 border-white/50 focus:ring-primary resize-none"
                            />
                        </div>
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-green-50 text-green-700 p-4 rounded-2xl border border-green-200 flex items-center gap-3"
                        >
                            <CheckCircle2 className="w-6 h-6 shrink-0" />
                            <p className="font-bold">تم إرسال الروشتة بنجاح! سنتواصل معك قريباً.</p>
                        </motion.div>
                    )}

                    {status === "error" && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 flex items-center gap-3"
                        >
                            <AlertCircle className="w-6 h-6 shrink-0" />
                            <p className="font-bold">حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.</p>
                        </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isUploading || !file}
                        className="w-full h-16 rounded-full text-xl font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
                    >
                        {isUploading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                            />
                        ) : (
                            <>
                                إرسال الروشتة
                                <Camera className="w-6 h-6 rotate-180" />
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
