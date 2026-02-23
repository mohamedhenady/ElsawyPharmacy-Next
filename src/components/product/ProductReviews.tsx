"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Review {
    id: string
    user_name: string
    rating: number
    comment: string
    date: string
    helpful: number
    verified: boolean
}

const mockReviews: Review[] = [
    { id: '1', user_name: 'أحمد م.', rating: 5, comment: 'منتج ممتاز وفعال جداً. استخدمته لمدة أسبوع ولاحظت تحسن كبير. أنصح به بشدة.', date: '2024-01-20', helpful: 15, verified: true },
    { id: '2', user_name: 'سارة ع.', rating: 4, comment: 'جوده جيدة وسعر مناسب. الشحن كان سريع أيضاً.', date: '2024-01-18', helpful: 8, verified: true },
    { id: '3', user_name: 'محمد ك.', rating: 5, comment: 'افضل منتج استخدمته. نتائج واضحة من اول استخدام. شكراً صيدلية الصاوي', date: '2024-01-15', helpful: 22, verified: true },
    { id: '4', user_name: 'فاطمة ر.', rating: 3, comment: 'منتج عادي غير انه ممتاز. ربما يحتاج وقت اطول للنتائج', date: '2024-01-10', helpful: 3, verified: false },
]

export function ProductReviews({ productId }: { productId?: string }) {
    const [reviews, setReviews] = useState<Review[]>([])
    const [filter, setFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
    const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest')
    const [showAll, setShowAll] = useState(false)

    useEffect(() => {
        setReviews(mockReviews)
    }, [productId])

    const filteredReviews = reviews
        .filter(r => filter === 'all' || r.rating === parseInt(filter))
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime()
            if (sortBy === 'highest') return b.rating - a.rating
            if (sortBy === 'lowest') return a.rating - b.rating
            return b.helpful - a.helpful
        })

    const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3)
    const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0'
    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
    }))

    return (
        <div className="bg-white rounded-[3rem] p-8 shadow-sm border" dir="rtl">
            <h2 className="text-3xl font-black mb-8">التقييمات والمراجعات</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="text-center p-8 bg-slate-50 rounded-[2rem]">
                    <p className="text-6xl font-black text-secondary mb-2">{averageRating}</p>
                    <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={cn(
                                    "w-6 h-6",
                                    star <= Math.round(parseFloat(averageRating)) 
                                        ? "text-amber-400 fill-current" 
                                        : "text-slate-200"
                                )}
                            />
                        ))}
                    </div>
                    <p className="text-slate-500 font-bold">{reviews.length} تقييم</p>
                </div>

                <div className="md:col-span-2 space-y-3">
                    {ratingCounts.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-3">
                            <span className="w-4 font-bold text-slate-600">{rating}</span>
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${percentage}%` }}
                                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                                />
                            </div>
                            <span className="w-12 text-sm text-slate-500 font-bold text-left">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-6 border-b">
                <div className="flex gap-2">
                    {(['all', '5', '4', '3', '2', '1'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-4 py-2 rounded-full font-bold text-sm transition-all",
                                filter === f 
                                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                        >
                            {f === 'all' ? 'الكل' : `${f} نجوم`}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    {[
                        { value: 'newest', label: 'الأحدث' },
                        { value: 'highest', label: 'الأعلى تقييماً' },
                        { value: 'helpful', label: 'الأكثر فائدة' },
                    ].map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setSortBy(s.value as any)}
                            className={cn(
                                "px-4 py-2 rounded-full font-bold text-sm transition-all",
                                sortBy === s.value 
                                    ? "bg-secondary text-white" 
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {displayedReviews.map((review, idx) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 bg-slate-50 rounded-[2rem]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">
                                    {review.user_name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold flex items-center gap-2">
                                        {review.user_name}
                                        {review.verified && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">موثق</span>
                                        )}
                                    </h4>
                                    <p className="text-sm text-slate-400">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={cn(
                                            "w-4 h-4",
                                            star <= review.rating ? "text-amber-400 fill-current" : "text-slate-200"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">{review.comment}</p>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                مفيد ({review.helpful})
                            </button>
                            <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors">
                                <ThumbsDown className="w-4 h-4" />
                                غير مفيد
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredReviews.length > 3 && (
                <div className="text-center mt-8">
                    <Button
                        variant="outline"
                        className="rounded-full font-bold px-8"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? (
                            <>عرض أقل <ChevronUp className="w-4 h-4 mr-2" /></>
                        ) : (
                            <>عرض المزيد ({filteredReviews.length - 3}) <ChevronDown className="w-4 h-4 mr-2" /></>
                        )}
                    </Button>
                </div>
            )}

            <div className="mt-10 p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                <h3 className="font-black text-xl mb-4">شارك بتقييمك</h3>
                <p className="text-slate-600 mb-4">هل استخدمت هذا المنتج؟ شاركنا تجربتك مع الآخرين</p>
                <Button className="rounded-full font-bold px-8">
                    اكتب تقييماً
                </Button>
            </div>
        </div>
    )
}
