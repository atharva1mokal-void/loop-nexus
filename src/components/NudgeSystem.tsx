'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, Info, Heart, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Nudge } from '@/lib/types';

interface NudgeSystemProps {
    nudges: Nudge[];
}

export function NudgeSystem({ nudges }: NudgeSystemProps) {
    const [visibleNudges, setVisibleNudges] = useState(nudges);

    const removeNudge = (id: string) => {
        setVisibleNudges(prev => prev.filter(n => n.id !== id));
    };

    if (visibleNudges.length === 0) return null;

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 max-w-sm w-full">
            <AnimatePresence>
                {visibleNudges.map((nudge) => (
                    <motion.div
                        key={nudge.id}
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600" />

                        <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${nudge.type === 'action' ? 'bg-amber-500/20 text-amber-400' :
                                    nudge.type === 'context' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                {nudge.type === 'action' ? <Zap size={18} /> :
                                    nudge.type === 'context' ? <Info size={18} /> :
                                        <Heart size={18} />}
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        Proactive Nudge
                                    </span>
                                    <button
                                        onClick={() => removeNudge(nudge.id)}
                                        className="text-slate-500 hover:text-white transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>

                                <p className="text-sm font-medium text-white leading-relaxed">
                                    {nudge.message}
                                </p>

                                <div className="flex items-center gap-4 pt-2">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-1 group/btn">
                                        Take Action <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
