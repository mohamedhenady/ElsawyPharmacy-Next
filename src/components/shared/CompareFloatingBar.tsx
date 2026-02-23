"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCompareStore } from "@/store/useCompareStore"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function CompareFloatingBar() {
    const { items, removeItem } = useCompareStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || items.length === 0) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-0 left-0 right-0 z-50 p-4"
            >
                <div className="bg-slate-900 text-white rounded-[2rem] shadow-2xl p-4 max-w-4xl mx-auto">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                                <GitCompare className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold">{items.length} products selected</p>
                                <p className="text-sm text-slate-400">Compare up to 4 products</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto max-w-[300px]">
                            {items.map((item) => (
                                <div key={item.id} className="relative group shrink-0">
                                    <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center overflow-hidden">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt="" className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-2xl">💊</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            {items.length < 4 && (
                                <Link href="/products" className="w-14 h-14 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-colors">
                                    <span className="text-2xl">+</span>
                                </Link>
                            )}
                        </div>

                        <Link href="/compare">
                            <Button className="rounded-2xl font-bold bg-primary hover:bg-primary/90">
                                Compare
                                <ArrowRight className="w-4 h-4 mr-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
