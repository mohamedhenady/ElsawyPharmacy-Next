"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)

    const [formData, setFormData] = useState({
        name: "",
        name_ar: "",
        slug: ""
    })

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/categories')
            const data = await res.json()
            setCategories(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories'
            const method = editingCategory ? 'PATCH' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error('Action failed')

            setIsDialogOpen(false)
            setEditingCategory(null)
            setFormData({ name: "", name_ar: "", slug: "" })
            fetchCategories()
        } catch (err) {
            alert('حدث خطأ. يرجى المحاولة مرة أخرى.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟')) return
        try {
            const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error('Delete failed')
            fetchCategories()
        } catch (err) {
            alert('فشل في حذف التصنيف.')
        }
    }

    const startEdit = (cat: any) => {
        setEditingCategory(cat)
        setFormData({
            name: cat.name,
            name_ar: cat.name_ar,
            slug: cat.slug
        })
        setIsDialogOpen(true)
    }

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name_ar.includes(searchQuery)
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">إدارة التصنيفات</h1>
                    <p className="text-muted-foreground">إضافة، تعديل، أو حذف أقسام المتجر.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open)
                    if (!open) { setEditingCategory(null); setFormData({ name: "", name_ar: "", slug: "" }) }
                }}>
                    <DialogTrigger asChild>
                        <Button className="rounded-xl gap-2 h-12">
                            <Plus className="w-5 h-5" />
                            تصنيف جديد
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2rem]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                {editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">الاسم (English)</Label>
                                <Input
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name_ar">الاسم (العربية)</Label>
                                <Input
                                    id="name_ar"
                                    required
                                    value={formData.name_ar}
                                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">الرابط (Slug)</Label>
                                <Input
                                    id="slug"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="medicines, cosmetics..."
                                    className="rounded-xl h-12"
                                />
                            </div>
                            <Button disabled={submitting} className="w-full h-12 rounded-xl text-lg font-bold">
                                {submitting ? "جاري الحفظ..." : "حفظ التصنيف"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative max-w-md">
                <Input
                    placeholder="ابحث عن تصنيف..."
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
                            <th className="px-6 py-4 font-bold text-slate-500">الاسم العربي</th>
                            <th className="px-6 py-4 font-bold text-slate-500">English Name</th>
                            <th className="px-6 py-4 font-bold text-slate-500">الرابط</th>
                            <th className="px-6 py-4 font-bold text-slate-500">العمليات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                    <p className="mt-2 text-muted-foreground">جاري التحميل...</p>
                                </td>
                            </tr>
                        ) : filteredCategories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-20 text-center text-muted-foreground">
                                    لا توجد تصنيفات حالياً.
                                </td>
                            </tr>
                        ) : filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold">{cat.name_ar}</td>
                                <td className="px-6 py-4">{cat.name}</td>
                                <td className="px-6 py-4"><code className="bg-slate-100 px-2 py-1 rounded text-xs">{cat.slug}</code></td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => startEdit(cat)} className="text-secondary hover:text-secondary hover:bg-secondary/10 rounded-lg">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-500 hover:bg-red-50 rounded-lg">
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
