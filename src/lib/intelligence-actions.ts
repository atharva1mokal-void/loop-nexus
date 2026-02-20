'use server';

import { getProjects, addInsight } from '@/lib/storage';
import { generateIntelligenceReport } from '@/lib/analyzer-logic';
import dbConnect from '@/lib/db';
import MessageModel from '@/models/Message';
import { IntelligenceReport, TeamMessage } from '@/lib/types';

/**
 * Executes a deep neural analysis of the entire project ecosystem.
 */
export async function generateProjectIntelligence(projectId?: string): Promise<{ success: boolean; report?: IntelligenceReport; error?: string }> {
    try {
        await dbConnect();

        // Fetch all projects for global context
        const projects = await getProjects();
        if (projects.length === 0) {
            return { success: false, error: 'No active projects detected for analysis.' };
        }

        const project = projectId ? projects.find(p => p.id === projectId) : projects[0];
        if (!project) return { success: false, error: 'Target project not found.' };

        // Fetch recent team communication
        const rawMessages = await MessageModel.find({}).sort({ timestamp: -1 }).limit(10).lean();
        const formattedMessages: TeamMessage[] = rawMessages.map((m: any) => ({
            id: m._id.toString(),
            projectId: project.id,
            author: m.senderId,
            senderName: m.senderName,
            content: m.text,
            timestamp: m.timestamp.toISOString(),
            source: (m.source as any) || 'internal',
            isDecision: m.isDecision || false
        }));

        // Generate report
        const report = generateIntelligenceReport(project, formattedMessages);

        // Persistent Insight Generation if critical
        if (report.sentiment.overall === 'critical') {
            await addInsight({
                id: `auto-${Date.now()}`,
                type: 'alert',
                message: `Anomalous team sentiment detected in ${project.name}. Efficiency dropping.`,
                timestamp: new Date().toISOString()
            });
        }

        return { success: true, report };
    } catch (error) {
        console.error('Intelligence synthesis failure:', error);
        return { success: false, error: 'Neural synthesis failed. Check core systems.' };
    }
}

/**
 * Generates an automated standup report based on the last 24h of activity.
 */
export async function getSprintStandup() {
    try {
        await dbConnect();
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // Fetch messages and tasks updated in last 24h
        const messages = await MessageModel.find({ timestamp: { $gte: yesterday } }).lean();
        const projects = await getProjects();

        // Simple synthesis logic
        const summary = [
            `Infrastructure: ${messages.filter(m => m.text.toLowerCase().includes('api') || m.text.toLowerCase().includes('database')).length} updates discussed.`,
            `Frontend: ${messages.filter(m => m.text.toLowerCase().includes('ui') || m.text.toLowerCase().includes('client')).length} visual changes synced.`,
            `Velocity: ${projects.reduce((acc, p) => acc + (p.tasks?.filter(t => t.status === 'completed').length || 0), 0)} tasks finalized globaly.`
        ];

        return {
            success: true,
            standup: {
                summary,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        return { success: false, error: 'Standup synthesis failed.' };
    }
}

/**
 * Fetches real extracted decisions from the database.
 */
export async function getDecisionStream() {
    try {
        await dbConnect();
        // In a real scenario, this would import and use DecisionModel
        // For now, we'll fetch messages flagged as isDecision
        const decisions = await MessageModel.find({ isDecision: true }).sort({ timestamp: -1 }).limit(10).lean();

        return {
            success: true,
            decisions: decisions.map(d => ({
                id: d._id.toString(),
                title: d.text.split('.')[0], // Use first sentence as title
                context: d.text,
                time: d.timestamp.toISOString(),
                author: d.senderName
            }))
        };
    } catch (error) {
        return { success: false, error: 'Decision stream unavailable.' };
    }
}

/**
 * Aggregates team activity and metadata for the radar view.
 */
export async function getTeamRadarData() {
    try {
        await dbConnect();
        const { default: UserModel } = await import('@/models/User');
        const users = await UserModel.find({}).lean();
        const projects = await getProjects();

        return {
            success: true,
            team: users.map(u => {
                // Calculate pseudo-load based on project assignments
                const userTasks = projects.flatMap(p => p.tasks?.filter(t => t.assignee === u.username) || []);
                const load = Math.min(100, (userTasks.length * 15) + (u.role === 'admin' ? 20 : 0));

                return {
                    name: u.username,
                    role: u.role,
                    load,
                    switching: load > 70 ? 'High' : load > 40 ? 'Medium' : 'Low',
                    status: load > 80 ? 'Critical' : 'Healthy'
                };
            })
        };
    } catch (error) {
        return { success: false, error: 'Team data retrieval failed.' };
    }
}
