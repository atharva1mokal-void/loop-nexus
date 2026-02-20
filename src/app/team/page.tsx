'use client';

import { motion } from 'framer-motion';
import { Activity, Shield, Thermometer, User, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTeamRadarData } from '@/lib/intelligence-actions';

export default function TeamRadar() {
    const [team, setTeam] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTeam() {
            try {
                const res = await getTeamRadarData();
                if (res.success && res.team) {
                    setTeam(res.team);
                }
            } catch (e) {
                console.error('Failed to load team data');
            } finally {
                setLoading(false);
            }
        }
        loadTeam();
    }, []);

    return (
        <main className="min-h-screen bg-[#050510] p-12">
            <header className="mb-12">
                <h1 className="text-4xl font-black text-white tracking-tighter">Team Load & Wellness</h1>
                <p className="text-slate-500 mt-2 uppercase tracking-widest text-[10px] font-black underline decoration-emerald-500/50">Neural Burnout Radar • Subject Matter Experts</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <h2 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <Thermometer size={14} /> Burnout Radar
                    </h2>

                    {loading ? (
                        <div className="flex items-center justify-center p-24">
                            <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {team.map((member, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                                                <User size={16} />
                                            </div>
                                            <span className="font-bold text-white capitalize">{member.name}</span>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${member.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                            {member.status}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${member.load}%` }}
                                            className={`h-full ${member.load > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase">
                                        <span>Cognitive Load: {member.load}%</span>
                                        <span>Switching: {member.switching}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    <section className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
                        <h2 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Shield size={14} /> Knowledge Map (SME)
                        </h2>
                        <ul className="space-y-4">
                            <li className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Architecture</div>
                                <div className="text-sm font-bold text-white">@system_architect</div>
                            </li>
                            <li className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">UI/UX Components</div>
                                <div className="text-sm font-bold text-white">@ui_expert</div>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
