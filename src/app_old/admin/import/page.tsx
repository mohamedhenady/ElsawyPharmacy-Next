"use client"

import { useState } from "react"
import { FileUp, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setError(null)
            setResult(null)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setLoading(true)
        setError(null)
        setResult(null)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const resp = await fetch("/api/import/products", {
                method: "POST",
                body: formData,
            })

            const data = await resp.json()
            if (resp.ok) {
                setResult(data)
            } else {
                setError(data.error || "فشل استيراد الملف")
            }
        } catch (err) {
            setError("حدث خطأ أثناء الاتصال بالخادم")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">استيراد المنتجات</h1>
                <p className="text-muted-foreground">قم برفع ملف إكسل (Excel) لتحديث منتجات الصيدلية والمخزن.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>رفع الملف</CardTitle>
                    <CardDescription>
                        يجب أن يحتوي الملف على الأعمدة التالية: sku, name_en, name_ar, price, category, subcategory, image_url, description
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors hover:border-primary/50">
                        <FileUp className="w-12 h-12 text-muted-foreground mb-4" />
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            id="excel-upload"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="excel-upload"
                            className="cursor-pointer text-sm font-medium hover:text-primary underline"
                        >
                            {file ? file.name : "اضغط هنا لاختيار الملف"}
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">يرجى التأكد من تنسيق الملف قبل الرفع.</p>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleUpload}
                        disabled={!file || loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                جاري المعالجة...
                            </>
                        ) : (
                            "بدء الاستيراد"
                        )}
                    </Button>
                </CardContent>
            </Card>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>خطأ</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && (
                <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">تم الاستيراد بنجاح</AlertTitle>
                        <AlertDescription className="text-green-700">
                            تمت معالجة {result.success + result.failed} سطر بنجاح.
                        </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background border rounded-lg">
                            <p className="text-sm text-muted-foreground">المنتجات التي تم استيرادها</p>
                            <p className="text-2xl font-bold text-green-600">{result.success}</p>
                        </div>
                        <div className="p-4 bg-background border rounded-lg">
                            <p className="text-sm text-muted-foreground">الأسطر الفاشلة</p>
                            <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                        </div>
                    </div>

                    {result.errors.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">قائمة الأخطاء</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="text-xs text-red-500 space-y-1">
                                    {result.errors.map((err: string, idx: number) => (
                                        <li key={idx}>• {err}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}
