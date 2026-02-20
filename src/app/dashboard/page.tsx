'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import { analyticsService, testService, studentService } from '@/services/api';
import { PerformanceMetrics, User } from '@/types';
import { EXAM_UNIVERSE } from '@/constants/ExamUniverseData';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SidebarItem from '@/components/ui/SidebarItem';

function StudentDashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter(); // Use Next.js router
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
    const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [targetExam, setTargetExam] = useState(user?.targetExam || '');
    const [updatingGoal, setUpdatingGoal] = useState(false);
    const [showExamSelector, setShowExamSelector] = useState(false);

    useEffect(() => {
        if (user) {
            loadDashboardData();
            setTargetExam(user.targetExam || '');
        }
    }, [user]);

    const loadDashboardData = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const [metricsRes, attemptsRes] = await Promise.all([
                analyticsService.getPerformanceMetrics(user._id),
                testService.getRecentAttempts()
            ]);
            setMetrics(metricsRes.data.data);
            setRecentAttempts(attemptsRes.data.data);
        } catch (err: any) {
            console.error('Failed to load dashboard data', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateGoal = async (newGoal: string) => {
        try {
            setUpdatingGoal(true);
            const response = await studentService.updateProfile({ targetExam: newGoal });
            if (response.data.success) {
                setTargetExam(newGoal);
                // In a real app, you might re-fetch user or update context
                // For this mock, we rely on local state update which might drift from context if not careful
                // Ideally update user context here.
                setShowExamSelector(false);
                // window.location.reload(); // Avoid full reload in SPA/Next.js if possible
            }
        } catch (err) {
            console.error('Failed to update goal', err);
        } finally {
            setUpdatingGoal(false);
        }
    };

    const navigate = (path: string) => {
        router.push(path);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><LoadingSpinner size="lg" /></div>;

    const weakTopic = metrics?.weakTopics?.[0];
    const accuracyTrend = metrics?.accuracyTrend || [];
    // const trendData = accuracyTrend.length > 0
    //     ? accuracyTrend.slice(-7).map(t => t.accuracy)
    //     : [0, 0, 0, 0, 0, 0, 0];

    return (
        <div className="flex h-screen bg-black overflow-hidden text-white font-sans selection:bg-primary/30 selection:text-white">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full"></div>
            </div>

            {/* LEFT SIDEBAR - Navigation */}
            <aside className="w-64 glass-card m-4 mr-0 flex flex-col z-10 border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-xl">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="font-bold text-white">EA</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Mentora AI</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <SidebarItem icon="dashboard" label="Dashboard" active />
                    <SidebarItem icon="book" label="Courses" />
                    <SidebarItem icon="test" label="Tests" onClick={() => navigate('/tests')} />
                    <SidebarItem icon="notes" label="Notes" />
                    <SidebarItem icon="analytics" label="Reports" />
                    <div className="pt-4 mt-4 border-t border-white/5">
                        <SidebarItem icon="settings" label="Settings" />
                        <SidebarItem icon="logout" label="Logout" onClick={logout} />
                    </div>
                </nav>

                <div className="p-4 bg-white/5 m-4 rounded-xl border border-white/5">
                    <p className="text-xs text-gray-400 mb-1">Storage Used</p>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                        <div className="h-full w-[75%] bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                    <p className="text-[10px] text-gray-500">75% of 1GB used</p>
                </div>
            </aside>

            {/* MAIN CONTENT - Widgets */}
            <main className="flex-1 p-4 overflow-hidden flex flex-col z-10">
                {/* HEADER */}
                <header className="glass-card px-6 py-4 mb-4 flex justify-between items-center border border-white/5 bg-white/[0.02] rounded-2xl backdrop-blur-md">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input
                                type="text"
                                placeholder="Search courses, reports, notes..."
                                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-6 custom-scrollbar">
                    {/* TOP SECTION: Exam Selector & Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Course Status / Readiness */}
                        <div className="glass-card p-6 border border-white/5 bg-white/[0.02] relative overflow-hidden group rounded-2xl hover:bg-white/[0.03] transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">Target: {targetExam || 'None'}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{metrics?.overallAccuracy || 0}%</h3>
                            <p className="text-sm text-gray-500 mb-4">Exam Readiness Score</p>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metrics?.overallAccuracy || 0}%` }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </div>

                        {/* Exam Universe Selector */}
                        <div className="md:col-span-2 glass-card p-6 border border-white/5 bg-white/[0.02] flex flex-col justify-center relative overflow-visible rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Active Mission</h3>
                                    <p className="text-sm text-gray-500">Select your target exam to customize your AI plan</p>
                                </div>
                                <button
                                    onClick={() => setShowExamSelector(!showExamSelector)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    {targetExam || 'Select Exam'}
                                    <svg className={`w-4 h-4 transition-transform ${showExamSelector ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {showExamSelector && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-[80px] right-6 z-50 w-80 glass-card-strong bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden max-h-[400px] flex flex-col rounded-xl"
                                    >
                                        <div className="p-3 border-b border-white/5 bg-white/5">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Category</p>
                                        </div>
                                        <div className="overflow-y-auto py-2 custom-scrollbar">
                                            {EXAM_UNIVERSE.map(category => (
                                                <div key={category.name} className="px-2 mb-2">
                                                    <p className="px-3 py-1 text-[10px] text-gray-500 font-bold uppercase">{category.name}</p>
                                                    {category.exams.map(exam => (
                                                        <button
                                                            key={exam.name}
                                                            onClick={() => handleUpdateGoal(exam.name)}
                                                            disabled={updatingGoal}
                                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${targetExam === exam.name ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5'} ${updatingGoal ? 'opacity-50' : ''}`}
                                                        >
                                                            {exam.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex gap-3 mt-2">
                                <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400 text-xs font-medium">Engineering</div>
                                <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-xs font-medium">Medical</div>
                                <div className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded text-orange-400 text-xs font-medium">Civil Services</div>
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE SECTION: AI & Analytics */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* AI Starter Session (AI Mentor) */}
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="glass-card p-6 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.05] transition-all cursor-pointer group rounded-2xl" onClick={() => navigate('/tests')}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-lg shadow-orange-500/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                                <h3 className="font-bold text-lg mb-1">AI Starter Session</h3>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-1">{weakTopic ? `Focus: ${weakTopic.topic}` : 'General Adaptive Practice'}</p>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full w-[35%] bg-gradient-to-r from-orange-400 to-pink-500"></div>
                                </div>
                            </div>

                            <div className="glass-card p-6 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:bg-white/[0.05] transition-all cursor-pointer group rounded-2xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-green-500/10 rounded-xl text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors shadow-lg shadow-green-500/10">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                                <h3 className="font-bold text-lg mb-1">Mini Mock Test</h3>
                                <p className="text-sm text-gray-400 mb-4">Quick 15 min assessment</p>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Performance Details / Point Progress */}
                        <div className="glass-card p-6 border border-white/5 bg-white/[0.02] rounded-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Avg. Speed</h3>
                                <div className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">Seconds</div>
                            </div>
                            <div className="relative h-40 flex items-center justify-center">
                                {/* Simple Gauge Representation */}
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
                                    <circle
                                        cx="50%" cy="50%" r="45%"
                                        stroke="url(#gradient)"
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray="283"
                                        strokeDashoffset={283 * (1 - Math.min(100, (metrics?.averageSpeed || 0)) / 100)} // Mock calculation for visual
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold">{Math.round(metrics?.averageSpeed || 0)}</span>
                                    <span className="text-xs text-gray-500">sec/que</span>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-400 mt-2">Your Speed Score: <span className="text-white font-bold">Good</span></p>
                        </div>
                    </div>
                </div>
            </main>

            {/* RIGHT SIDEBAR - Calendar & To-do */}
            <aside className="w-80 glass-card m-4 ml-0 flex flex-col z-10 border border-white/5 bg-white/[0.02] hidden xl:flex rounded-2xl backdrop-blur-xl">
                <div className="p-6 border-b border-white/5">
                    <h3 className="font-bold text-lg mb-4">Profile Stats</h3>
                    <div className="flex items-center justify-center mb-6 relative">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-secondary">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-black">Online</div>
                    </div>
                    <div className="text-center">
                        <h4 className="font-bold text-lg">{user?.name}</h4>
                        <p className="text-sm text-gray-500">Target: {targetExam || 'Not Set'}</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-md">Recent Activity</h3>
                        <div onClick={() => navigate('/tests')} className="text-xs text-primary hover:underline cursor-pointer">View All</div>
                    </div>

                    <div className="space-y-4">
                        {recentAttempts.length > 0 ? recentAttempts.slice(0, 5).map(attempt => (
                            <div key={attempt._id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => navigate(`/test/report/${attempt._id}`)}>
                                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${attempt.accuracy > 70 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                <div>
                                    <h5 className="text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">{attempt.testId?.title}</h5>
                                    <p className="text-xs text-gray-500">{new Date(attempt.createdAt).toLocaleDateString()} • {attempt.accuracy}% Acc</p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500 italic text-center py-4">No recent activity.</p>
                        )}
                    </div>
                </div>

                <div className="p-4 m-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-[30px] rounded-full translate-x-10 -translate-y-10"></div>
                    <div className="flex gap-3 mb-2 relative z-10">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white">Unlock Pro</p>
                            <p className="text-[10px] text-gray-300">Get access to premium tests</p>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg mt-1 hover:bg-gray-200 transition-colors shadow-lg relative z-10">Upgrade Plan</button>
                </div>
            </aside>
        </div>
    );
}

export default function StudentDashboard() {
    return (
        <AuthProvider>
            <StudentDashboardContent />
        </AuthProvider>
    );
}
