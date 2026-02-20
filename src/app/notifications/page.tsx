'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Notification } from '@/models/Notification';

// Mock Notification Interface locally since we can't import Mongoose model directly in client component
interface NotificationUI {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<NotificationUI[]>([]);

    useEffect(() => {
        // Mock data
        setNotifications([
            {
                id: 'n1',
                type: 'warning',
                title: 'High Server Load',
                message: 'CPU usage exceeded 90% on server-alpha.',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
            },
            {
                id: 'n2',
                type: 'success',
                title: 'Deployment Successful',
                message: 'Project TITAN_PROTOCOL has been deployed to production.',
                read: false,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
            },
            {
                id: 'n3',
                type: 'info',
                title: 'New Team Member',
                message: 'Sarah Conner has joined the development team.',
                read: true,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
            }
        ]);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
            case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
            default: return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#050505] p-8">
            <header className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-blue)] flex items-center gap-3">
                        <Bell className="w-8 h-8 text-[var(--neon-purple)]" />
                        System Alerts
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-2">Stay updated with critical system events.</p>
                </div>
                <div className="bg-[var(--surface-1)] px-4 py-2 rounded-lg border border-[var(--glass-border)] text-sm font-mono text-[var(--text-secondary)]">
                    {notifications.filter(n => !n.read).length} Unread
                </div>
            </header>

            <main className="max-w-4xl mx-auto space-y-4">
                <AnimatePresence>
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`glass-panel p-6 rounded-xl border transition-all ${notification.read
                                    ? 'border-[var(--glass-border)] opacity-60'
                                    : 'border-[var(--neon-blue)]/30 bg-[var(--surface-2)] shadow-[0_0_20px_-10px_rgba(59,130,246,0.2)]'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg bg-[#0a0a0a] border border-white/5`}>
                                    {getIcon(notification.type)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-lg font-bold mb-1 ${!notification.read ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs font-mono text-[var(--text-muted)]">
                                            {new Date(notification.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                        {notification.message}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors"
                                            title="Mark as Read"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-2 hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {notifications.length === 0 && (
                    <div className="text-center p-12 glass-panel rounded-xl border border-[var(--glass-border)] border-dashed">
                        <Bell className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4 opacity-50" />
                        <p className="text-[var(--text-secondary)]">All caught up! No notifications.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
