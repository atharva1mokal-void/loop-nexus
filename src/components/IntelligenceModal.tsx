'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Target, MessageSquare, X, ChevronRight, Activity, Shield } from 'lucide-react';
import { IntelligenceReport } from '@/lib/types';

interface IntelligenceModalProps {
    report: IntelligenceReport | null;
    isOpen: boolean;
    onClose: () => void;
}

export function IntelligenceModal({ report, isOpen, onClose }: IntelligenceModalProps) {
    if (!report) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020205]/95 backdrop-blur-3xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                        className="w-full max-w-5xl h-[85vh] bg-slate-900/40 border border-white/10 rounded-[3.5rem] overflow-hidden relative shadow-[0_0_100px_rgba(147,51,234,0.15)] flex flex-col"
                    >
                        {/* Header Section */}
                        <div className="p-12 pb-6 flex justify-between items-start">
                            <div className="flex gap-8 items-center">
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 20px rgba(168,85,247,0)", "0 0 40px rgba(168,85,247,0.3)", "0 0 20px rgba(168,85,247,0)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center relative group"
                                >
                                    <Brain className="text-white w-12 h-12" />
                                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                                <div>
                                    <motion.h2
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-5xl font-black text-white tracking-tighter"
                                    >
                                        Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Analysis V2</span>
                                    </motion.h2>
                                    <p className="text-purple-400 font-black uppercase tracking-[0.4em] text-[10px] mt-2 opacity-60">Deep Core Intelligence • Real-time Protocol</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all ring-1 ring-white/10">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-12 pb-12 space-y-12 scrollbar-hide">
                            {/* Vibe Check / Reality vs Plan */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 bg-gradient-to-r from-purple-600/10 to-transparent border-l-2 border-purple-500 rounded-r-3xl relative overflow-hidden"
                            >
                                <div className="absolute top-4 right-8 flex items-center gap-2">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Risk Trend</span>
                                    <div className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${report.vibeCheck.riskTrend === 'up' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                        {report.vibeCheck.riskTrend === 'up' ? 'Rising' : 'Stable'}
                                    </div>
                                </div>
                                <h3 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Zap size={14} /> The Reality Check
                                </h3>
                                <p className="text-xl text-slate-200 font-medium leading-relaxed italic mb-4">
                                    "{report.vibeCheck.summary}"
                                </p>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                    <span>Primary Focus: <span className="text-white">{report.vibeCheck.focusArea}</span></span>
                                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                    <span>Source Confidence: <span className="text-white text-emerald-400">94%</span></span>
                                </div>
                            </motion.div>

                            {/* Signal Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'System Health', value: report.sentiment.score + '%', icon: <Activity />, color: 'text-emerald-400' },
                                    { label: 'Risk Level', value: report.sentiment.overall.toUpperCase(), icon: <Shield />, color: 'text-amber-400' },
                                    { label: 'Velocity', value: report.velocity.currentVelocity.toFixed(1), icon: <Zap />, color: 'text-blue-400' },
                                    { label: 'AI Confidence', value: '99.9', icon: <Brain />, color: 'text-purple-400' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.05) }}
                                        className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.07] transition-all group"
                                    >
                                        <div className={`${stat.color} mb-4 opacity-50 group-hover:opacity-100 transition-opacity`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                        <div className="text-3xl font-black text-white">{stat.value}</div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>

                        {/* Decision Log / Automated Standup */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <MessageSquare size={14} /> Decision Matrix
                            </h3>
                            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Decision Vector</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Timestamp</th>
                                            <th className="px-8 py-6 text-[10px) font-black text-slate-500 uppercase tracking-widest">Sync Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.decisionLog.length > 0 ? report.decisionLog.map((decision, i) => (
                                            <tr key={decision.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{decision.title}</div>
                                                    <div className="text-[10px] text-slate-500 line-clamp-1">{decision.context}</div>
                                                </td>
                                                <td className="px-8 py-6 text-slate-500 font-mono text-[10px]">
                                                    {new Date(decision.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${decision.syncedToTask ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                                                        <span className="text-[8px] font-black uppercase tracking-widest">{decision.syncedToTask ? 'Synced to Task' : 'Push to Jira'}</span>
                                                        <ChevronRight size={10} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={3} className="px-8 py-12 text-center text-slate-500 italic text-sm">
                                                    No critical decisions detected in recent traffic.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Footer Branding */}
                        <div className="p-8 border-t border-white/5 flex justify-between items-center opacity-40">
                            <div className="flex gap-4 text-[8px] font-black uppercase tracking-[0.5em] text-slate-500">
                                <span>Core ID: 0xFF92</span>
                                <span>Node: BRAVO-7</span>
                            </div>
                            <div className="text-[8px] font-black uppercase tracking-[0.5em] text-slate-500">
                                NEXUS OS // ATHARVA MOKAL
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
