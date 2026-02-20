'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createProject, removeProject } from '../actions';
import { Project } from '@/lib/types';
import { Trash2, Plus, Terminal, LogOut, Database, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AdminClientProps {
    initialProjects: Project[];
}

export default function AdminClient({ initialProjects }: AdminClientProps) {
    const router = useRouter();
    const [isResetting, setIsResetting] = useState(false);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        localStorage.removeItem('currentUser');
        router.push('/login');
    };

    const handleResetData = async () => {
        if (!confirm('WARNING: This will delete ALL system notification data. Are you sure?')) return;

        setIsResetting(true);
        try {
            const res = await fetch('/api/admin/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target: 'all' })
            });
            if (res.ok) {
                alert('System data reset successfully.');
                router.refresh();
            } else {
                alert('Reset failed. Ensure you are an Admin.');
            }
        } catch (e) {
            alert('Error resetting data');
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] p-8">
            <header className="max-w-6xl mx-auto flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)]">
                        Command Center
                    </h1>
                    <p className="text-[var(--text-secondary)]">Manage system resources and project directives.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleResetData}
                        disabled={isResetting}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                    >
                        {isResetting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                        Reset Data
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text-secondary)] rounded-lg transition-colors border border-[var(--glass-border)]"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Project Form */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-6 rounded-xl border border-[var(--glass-border)] sticky top-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Plus className="w-5 h-5 text-[var(--neon-cyan)]" />
                            <h2 className="text-xl font-bold">Initialize Project</h2>
                        </div>

                        <form action={createProject} className="space-y-4">
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1 uppercase">Project Codename</label>
                                <input name="name" required className="w-full bg-[var(--surface-2)] border border-[var(--glass-border)] rounded-lg p-3 text-white outline-none focus:border-[var(--neon-cyan)]" placeholder="e.g. TITAN_PROTOCOL" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1 uppercase">Objective</label>
                                <textarea name="description" required rows={3} className="w-full bg-[var(--surface-2)] border border-[var(--glass-border)] rounded-lg p-3 text-white outline-none focus:border-[var(--neon-cyan)]" placeholder="Brief mission statement..." />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1 uppercase">Tech Matrix (comma sep)</label>
                                <input name="techStack" className="w-full bg-[var(--surface-2)] border border-[var(--glass-border)] rounded-lg p-3 text-white outline-none focus:border-[var(--neon-cyan)]" placeholder="React, Node, AI..." />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1 uppercase">GitHub Repository</label>
                                <input name="githubUrl" defaultValue="https://github.com/atharva1mokal-void/loop26" className="w-full bg-[var(--surface-2)] border border-[var(--glass-border)] rounded-lg p-3 text-white outline-none focus:border-[var(--neon-cyan)]" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1 uppercase">Project Type</label>
                                <select name="projectType" className="w-full bg-[var(--surface-2)] border border-[var(--glass-border)] rounded-lg p-3 text-white outline-none focus:border-[var(--neon-cyan)]">
                                    <option value="software">Software/Tech</option>
                                    <option value="civil">Civil Engineering</option>
                                    <option value="mechanical">Mechanical</option>
                                    <option value="electrical">Electrical</option>
                                    <option value="chemical">Chemical</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/50 font-bold py-3 rounded-lg hover:bg-[var(--neon-cyan)] hover:text-black transition-all flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" />
                                Deploy Project
                            </button>
                        </form>
                    </div>
                </div>

                {/* Project List */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[var(--text-secondary)]" />
                        Active Deployments
                    </h2>

                    <div className="space-y-4">
                        {initialProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-panel p-5 rounded-xl border border-[var(--glass-border)] hover:border-[var(--neon-blue)] transition-colors group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-lg font-bold flex items-center gap-3">
                                            {project.name}
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border ${project.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                                'bg-gray-500/10 border-gray-500/20 text-gray-400'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </h3>
                                        <p className="text-[var(--text-secondary)] mt-1 mb-3 text-sm">{project.description || 'No description provided.'}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack?.map((tech, i) => (
                                                <span key={i} className="text-xs bg-[var(--surface-2)] px-2 py-1 rounded text-[var(--text-muted)] font-mono">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => removeProject(project.id)}
                                            className="p-2 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 rounded-lg transition-colors"
                                            title="Terminate Project"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Background Gradient for hover effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--neon-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        ))}

                        {initialProjects.length === 0 && (
                            <div className="text-center p-12 glass-panel rounded-xl border border-[var(--glass-border)] border-dashed">
                                <p className="text-[var(--text-secondary)]">System Idle. No active projects detected.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Removing legacy Dashboard component and merging it above

