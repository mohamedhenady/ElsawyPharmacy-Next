"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function SplashScreen() {
    const router = useRouter()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(() => {
                        router.push("/home")
                    }, 500)
                    return 100
                }
                return prev + 2
            })
        }, 30)

        return () => clearInterval(timer)
    }, [router])

    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[#1da177] to-secondary">
            {/* Decorative Background Elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-3xl"
            />

            {/* Main Content Wrapper */}
            <div className="flex flex-col items-center justify-center z-10 px-6">
                {/* Logo Container */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-40 h-40 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 shadow-2xl border border-white/20"
                >
                    <Image
                        src="/logo.png"
                        alt="Elsawy Pharmacy Logo"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain filter brightness-0 invert"
                        priority
                    />
                </motion.div>

                {/* Brand Name */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-4xl font-bold tracking-tight mb-3 text-center"
                >
                    صيدلية الصاوي
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90 text-lg font-medium leading-relaxed text-center"
                >
                    علمنا، داؤنا، صحتك
                </motion.p>
            </div>

            {/* Loader Section */}
            <div className="absolute bottom-16 w-full max-w-xs px-10">
                <div className="flex flex-col gap-4 items-center">
                    <p className="text-white/80 text-sm font-medium animate-pulse">جاري التحميل...</p>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                </div>
            </div>

            {/* Floating Icons Decoration */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-10 opacity-20 text-white text-4xl"
            >
                ⚕️
            </motion.div>
            <motion.div
                animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 left-10 opacity-20 text-white text-4xl"
            >
                💊
            </motion.div>
        </div>
    )
}
