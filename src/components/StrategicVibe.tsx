'use client';

import { motion } from 'framer-motion';
import { Zap, Activity, Shield, TrendingUp, TrendingDown, Target } from 'lucide-react';

interface StrategicVibeProps {
    score: number;
    summary: string;
    focus: string;
    trend: 'up' | 'down' | 'stable';
}

export function StrategicVibe({ score, summary, focus, trend }: StrategicVibeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 mb-12 relative overflow-hidden group shadow-2xl shadow-purple-500/5"
        >
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-all group-hover:bg-purple-600/20" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                {/* Health Score Circle */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="96" cy="96" r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="96" cy="96" r="88"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={553}
                            initial={{ strokeDashoffset: 553 }}
                            animate={{ strokeDashoffset: 553 - (553 * score) / 100 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="text-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white">{score}</span>
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Health Score</span>
                    </div>
                </div>

                {/* Vibe Summary */}
                <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-widest flex items-center gap-2">
                            <Activity size={12} /> Live Vibe Check
                        </div>
                        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {trend === 'up' ? 'Improving' : 'Stable'}
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white leading-tight">
                        "{summary}"
                    </h2>

                    <div className="flex flex-wrap gap-8 pt-4">
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Bottlenecks</div>
                            <div className="text-xl font-bold text-white flex items-center gap-2">
                                <Shield size={18} className="text-amber-500" /> 2 Critical
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Primary Objective</div>
                            <div className="text-xl font-bold text-white flex items-center gap-2">
                                <Target size={18} className="text-blue-500" /> {focus}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Processing Node</div>
                            <div className="text-xl font-bold text-white flex items-center gap-2 font-mono">
                                0xFF-CORE
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actionable Nudge CTA */}
                <div className="w-full lg:w-auto">
                    <button className="w-full lg:w-auto px-8 py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-purple-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 flex items-center justify-center gap-3">
                        <Zap size={16} fill="currentColor" /> Detailed Hub
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
