"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Phone, Minimize2, Maximize2, User, Bot, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: 'user' | 'bot'
    content: string
    timestamp: Date
}

const quickQuestions = [
    "كيف أطلب دواء بوصفة طبية؟",
    "ما هي طرق الدفع المتاحة؟",
    "كيف أتتبع طلبي؟",
    "ما هي سياسة الإرجاع؟",
    "هل تقدمون استشارة صيدلية؟",
    "ما هي ساعات العمل؟",
]

export function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: '1',
                    role: 'bot',
                    content: 'مرحباً! 👋\nأنا المساعد الصغير لصيدلية الصاوي.\nكيف يمكنني مساعدتك اليوم؟',
                    timestamp: new Date()
                }
            ])
        }
    }, [isOpen])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            const botResponses: Record<string, string> = {
                'وصفة': 'لطلب دواء بوصفة طبية، يرجى رفع صورة الوصفة عند إتمام الطلب أو إرسالها عبر واتساب.سيقومالصيدلي بمراجعتها والتواصل معك.',
                'دفع': 'نقبل جميع طرق الدفع:\n• cash on delivery (الدفع عند الاستلام)\n• البطاقات الائتمانية\n• Apple Pay\n• STC Pay',
                'تتبع': 'يمكنك تتبع طلبك من خلال:\n1. رقم الطلب المرسل لك SMS\n2. صفحة "تتبع الطلب" في الموقع\n3. التواصل معنا على واتساب',
                'إرجاع': 'نتيح إرجاع المنتجات غير المستخدمة خلال 14 يوماً من تاريخ الاستلام، مع الحفاظ على المنتج في حالته الأصلية.',
                'استشارة': 'نعم بالطبع! 💊\nيتوفر لدينا صيدلي متخصص للاستشارة مجاناً عبر الدردشة أو يمكنك الحضور للصيدلية.',
                'default': 'شكراً لتواصلك معنا! 📱\nسيتم الرد عليك خلال دقائق.\nللاستفسارات العاجلة، يمكنك الاتصال بنا: 01024697326'
            }

            const response = Object.entries(botResponses).find(([key]) => 
                inputValue.toLowerCase().includes(key)
            )?.[1] || botResponses.default

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: response,
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botMessage])
        }, 1500)
    }

    const handleQuickQuestion = (question: string) => {
        setInputValue(question)
    }

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-2xl flex items-center justify-center text-white"
            >
                <MessageCircle className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">1</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className={cn(
                            "fixed z-50 bg-white rounded-[2rem] shadow-2xl overflow-hidden",
                            isMinimized ? "bottom-6 left-6 w-80 h-14" : "bottom-6 left-6 w-96 h-[600px]"
                        )}
                    >
                        <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">صيدلية الصاوي</h3>
                                    <p className="text-xs text-white/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        متصل الآن
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[420px] bg-slate-50">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn(
                                                "flex",
                                                msg.role === 'user' ? "justify-end" : "justify-start"
                                            )}
                                        >
                                            <div className={cn(
                                                "max-w-[80%] rounded-2xl p-4",
                                                msg.role === 'user' 
                                                    ? "bg-primary text-white" 
                                                    : "bg-white border shadow-sm"
                                            )}>
                                                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                                                <p className={cn(
                                                    "text-xs mt-2",
                                                    msg.role === 'user' ? "text-white/60" : "text-slate-400"
                                                )}>
                                                    {msg.timestamp.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border shadow-sm rounded-2xl p-4 flex gap-1">
                                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {messages.length <= 1 && (
                                    <div className="px-4 pb-2">
                                        <p className="text-xs text-slate-500 mb-2 font-bold">أسئلة شائعة:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {quickQuestions.slice(0, 3).map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleQuickQuestion(q)}
                                                    className="text-xs bg-white border rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-colors"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="p-4 bg-white border-t">
                                    <div className="flex gap-2">
                                        <Input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="اكتب رسالتك..."
                                            className="rounded-full"
                                        />
                                        <Button onClick={handleSend} className="rounded-full px-4">
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-3">
                                        <button className="text-xs text-slate-500 flex items-center gap-1 hover:text-primary">
                                            <Phone className="w-3 h-3" />
                                            اتصال
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
