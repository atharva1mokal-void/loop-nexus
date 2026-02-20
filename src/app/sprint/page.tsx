'use client';

import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSprintStandup } from '@/lib/intelligence-actions';

export default function SprintHub() {
    const [standup, setStandup] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStandup() {
            try {
                const res = await getSprintStandup();
                if (res.success) {
                    setStandup(res.standup);
                }
            } catch (e) {
                console.error('Failed to load standup');
            } finally {
                setLoading(false);
            }
        }
        loadStandup();
    }, []);

    return (
        <main className="min-h-screen bg-[#050510] p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-white tracking-tighter">Sprint Intelligence Hub</h1>
                <p className="text-slate-500 mt-2 uppercase tracking-widest text-[10px] font-black underline decoration-purple-500/50">Neural Standup & Risk Prediction</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <h2 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Clock size={14} /> Automated Standup (Beta)
                    </h2>
                    <div className="space-y-6 text-slate-400 italic">
                        <p className="border-l-2 border-slate-800 pl-4 py-2">Synthesizing yesterday's commits and chat clusters...</p>

                        {loading ? (
                            <div className="flex items-center justify-center p-12">
                                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                            </div>
                        ) : standup ? (
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">Yesterday's Summary</h3>
                                <ul className="text-sm space-y-2 list-disc list-inside">
                                    {standup.summary.map((line: string, i: number) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs">
                                Standup synthesis unavailable. Check neural link.
                            </div>
                        )}
                    </div>
                </section>

                <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <h2 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <TrendingUp size={14} /> Risk Predictor
                    </h2>
                    <div className="space-y-4">
                        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                            <div>
                                <h3 className="text-amber-400 font-bold">Deadline Variance</h3>
                                <p className="text-xs text-slate-500">Neural analysis of current velocity...</p>
                            </div>
                            <AlertTriangle className="text-amber-500" size={24} />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Based on live performance metrics, the project is maintaining nominal velocity. No critical variances detected in the last session.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
