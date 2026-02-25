"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2, Search, ImagePlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        name_ar: "",
        description: "",
        description_ar: "",
        price: 0,
        stock: 0,
        category_id: "",
        image_url: "",
        is_featured: false
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            const [pRes, cRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/categories')
            ])
            const [pData, cData] = await Promise.all([
                pRes.json(),
                cRes.json()
            ])
            setProducts(Array.isArray(pData) ? pData : [])
            setCategories(Array.isArray(cData) ? cData : [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            if (!supabase) {
                alert('تعديل Supabase غير صحيح.')
                return
            }
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `products/${fileName}`

            const { data, error } = await supabase.storage
                .from('pharmacy-bucket')
                .upload(filePath, file)

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage
                .from('pharmacy-bucket')
                .getPublicUrl(filePath)

            setFormData({ ...formData, image_url: publicUrl })
        } catch (err) {
            alert('خطأ في تحميل الصورة. تأكد من وجود Bucket باسم pharmacy-bucket.')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
            const method = editingProduct ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Action failed')

            setIsDialogOpen(false)
            setEditingProduct(null)
            setFormData({
                name: "",
                name_ar: "",
                description: "",
                description_ar: "",
                price: 0,
                stock: 0,
                category_id: "",
                image_url: "",
                is_featured: false
            })
            fetchData()
        } catch (err) {
            alert('حدث خطأ أثناء حفظ المنتج.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return
        try {
            const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Delete failed')
            fetchData()
        } catch (err) {
            alert('فشل في حذف المنتج.')
        }
    }

    const startEdit = (product: any) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            name_ar: product.name_ar,
            description: product.description || "",
            description_ar: product.description_ar || "",
            price: product.price,
            stock: product.stock,
            category_id: product.category_id,
            image_url: product.image_url || "",
            is_featured: product.is_featured
        })
        setIsDialogOpen(true)
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name_ar.includes(searchQuery)
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">إدارة المنتجات</h1>
                    <p className="text-muted-foreground">أضف منتجات جديدة وحدث المخزون والأسعار.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) { setEditingProduct(null); }
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl gap-2 h-12">
                            <Plus className="w-5 h-5" />
                            منتج جديد
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name_ar">الاسم (العربية)</Label>
                                <Input required value={formData.name_ar} onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })} className="rounded-xl h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name (English)</Label>
                                <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-xl h-11" />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label>التصنيف</Label>
                                <Select value={formData.category_id} onValueChange={(val) => setFormData({ ...formData, category_id: val })}>
                                    <SelectTrigger className="rounded-xl h-11">
                                        <SelectValue placeholder="اختر التصنيف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name_ar}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>السعر (ر.س)</Label>
                                <Input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} className="rounded-xl h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>الكمية في المخزن</Label>
                                <Input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} className="rounded-xl h-11" />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <Label>الوصف (العربية)</Label>
                                <Textarea value={formData.description_ar} onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })} className="rounded-xl min-h-[100px]" />
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <Label>صورة المنتج</Label>
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center bg-slate-50 relative overflow-hidden shrink-0">
                                        {formData.image_url ? (
                                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <ImagePlus className="w-8 h-8 text-slate-300" />
                                        )}
                                        {uploading && (
                                            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" id="image-upload" />
                                        <Label htmlFor="image-upload" className="flex items-center gap-2 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors w-full justify-center text-primary font-bold">
                                            تحميل صورة جديدة
                                        </Label>
                                        <p className="text-xs text-muted-foreground text-center">أو أدخل رابط الصورة مباشرة بالأسفل</p>
                                    </div>
                                </div>
                                <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="رابط الصورة (URL)" className="rounded-xl h-11" />
                            </div>

                            <div className="md:col-span-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="w-5 h-5 accent-primary"
                                />
                                <Label htmlFor="is_featured" className="text-lg font-bold">عرض كمنتج مميز</Label>
                            </div>

                            <Button disabled={submitting || uploading} className="md:col-span-2 h-14 rounded-xl text-lg font-bold shadow-lg">
                                {submitting ? "جاري الحفظ..." : "حفظ المنتج المميز"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative max-w-md">
                <Input
                    placeholder="ابحث عن منتج..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 h-12 rounded-xl"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            <div className="border rounded-[2rem] bg-white overflow-hidden shadow-sm">
                <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-500">المنتج</th>
                            <th className="px-6 py-4 font-bold text-slate-500">التصنيف</th>
                            <th className="px-6 py-4 font-bold text-slate-500">السعر</th>
                            <th className="px-6 py-4 font-bold text-slate-500">المخزن</th>
                            <th className="px-6 py-4 font-bold text-slate-500">العمليات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                </td>
                            </tr>
                        ) : filteredProducts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-muted-foreground">لا توجد منتجات حالياً.</td>
                            </tr>
                        ) : filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg border bg-slate-50 flex items-center justify-center shrink-0">
                                            {p.image_url ? <img src={p.image_url} alt="" className="w-full h-full object-contain" /> : "💊"}
                                        </div>
                                        <div>
                                            <p className="font-bold line-clamp-1">{p.name_ar}</p>
                                            <p className="text-xs text-muted-foreground">{p.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                    {p.categories?.name_ar || 'تصنيف عام'}
                                </td>
                                <td className="px-6 py-4 font-bold text-secondary">{p.price} ر.س</td>
                                <td className="px-6 py-4">
                                    <span className={cn("px-2 py-1 rounded-full text-xs font-bold", p.stock > 10 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
                                        {p.stock} قطعة
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => startEdit(p)} className="text-secondary hover:bg-secondary/10 rounded-lg">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
