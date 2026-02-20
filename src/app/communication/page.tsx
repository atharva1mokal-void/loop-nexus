'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Link as LinkIcon, AlertCircle, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDecisionStream } from '@/lib/intelligence-actions';

export default function CommunicationContext() {
    const [decisions, setDecisions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDecisions() {
            try {
                const res = await getDecisionStream();
                if (res.success && res.decisions) {
                    setDecisions(res.decisions);
                }
            } catch (e) {
                console.error('Failed to load decision stream');
            } finally {
                setLoading(false);
            }
        }
        loadDecisions();
    }, []);

    return (
        <main className="min-h-screen bg-[#050510] p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-white tracking-tighter">Communication Thread</h1>
                <p className="text-slate-500 mt-2 uppercase tracking-widest text-[10px] font-black underline decoration-blue-500/50">Synthesized Decision Logs</p>
            </header>

            <div className="space-y-8">
                <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl border-l-4 border-l-blue-500">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xs font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                            <AlertCircle size={14} /> Missing Context Alerts
                        </h2>
                    </div>
                    <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
                        <p className="text-sm text-slate-300">
                            The system is monitoring chat clusters for missing task links.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-8">
                    <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <MessageSquare size={14} /> Recent Decision Stream
                        </h2>

                        {loading ? (
                            <div className="flex items-center justify-center p-12">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            </div>
                        ) : decisions.length > 0 ? (
                            <div className="space-y-4">
                                {decisions.map((d, i) => (
                                    <div key={d.id || i} className="p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-all group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex flex-col">
                                                <h3 className="text-white font-bold">{d.title}</h3>
                                                <span className="text-[10px] text-blue-400 uppercase font-black tracking-widest">Identified by AI • {d.author}</span>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-600">{new Date(d.time).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 italic">"{d.context}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-600 italic text-sm">
                                No critical decisions extracted from recent traffic yet.
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}
