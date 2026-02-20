import { Project, TeamMessage, IntelligenceReport, Alert, Recommendation, DecisionLog, Nudge } from './types';

export function analyzeSentiment(messages: TeamMessage[]) {
    if (messages.length === 0) return { overall: "healthy" as const, score: 75, indicators: ["Baseline established"] };

    let positive = 0;
    let negative = 0;
    let frustrated = 0;

    messages.forEach(m => {
        const c = m.content.toLowerCase();
        if (c.includes("done") || c.includes("success") || c.includes("great") || c.includes("shipped")) positive++;
        if (c.includes("blocked") || c.includes("stuck") || c.includes("waiting") || c.includes("delay")) negative++;
        if (c.includes("frustrated") || c.includes("confused") || c.includes("ugh") || c.includes("slow")) frustrated++;
    });

    const rawScore = 70 + (positive * 4) - (negative * 8) - (frustrated * 12);
    const score = Math.max(0, Math.min(100, rawScore));

    let overall: 'healthy' | 'cautious' | 'critical' = 'healthy';
    if (score < 40) overall = 'critical';
    else if (score < 70) overall = 'cautious';

    const indicators = [];
    if (frustrated > 1) indicators.push("High friction detected in communication");
    if (negative > 2) indicators.push("Multiple structural blockers identified");
    if (positive > 2) indicators.push("Strong delivery momentum");

    return { overall, score, indicators };
}

export function extractDecisions(messages: TeamMessage[]): DecisionLog[] {
    const decisions: DecisionLog[] = [];
    const keywords = ["decided", "will use", "switching to", "agreed", "finalized", "move forward with"];

    messages.forEach(m => {
        const c = m.content.toLowerCase();
        if (keywords.some(k => c.includes(k))) {
            decisions.push({
                id: `dec-${Math.random().toString(36).substr(2, 5)}`,
                title: m.content.split('.')[0], // First sentence as title
                context: m.content,
                sourceMessageId: m.id,
                timestamp: m.timestamp,
                syncedToTask: false
            });
        }
    });
    return decisions;
}

export function calculateProjectHealth(project: Project, sentimentScore: number): number {
    const taskCompletionRate = project.tasks.length > 0
        ? (project.tasks.filter(t => t.status === 'completed').length / project.tasks.length) * 100
        : 100;

    // Health = 40% task progress + 30% sentiment + 30% velocity/efficiency
    const health = (taskCompletionRate * 0.4) + (sentimentScore * 0.3) + (project.stats?.efficiency || 80) * 0.3;
    return Math.round(health);
}

export function generateVibeCheck(messages: TeamMessage[], sentiment: any) {
    if (messages.length === 0) return { summary: "System idling. No activity detected.", focusArea: "N/A", riskTrend: "stable" as const };

    const summary = sentiment.score > 70
        ? "The team is synchronized and maintaining high velocity."
        : (sentiment.score > 40 ? "The team is focused but facing intermittent friction." : "The team is experiencing significant bottlenecks and morale risk.");

    // Simple heuristic for focus area
    const contents = messages.map(m => m.content.toLowerCase()).join(" ");
    let focusArea = "General Development";
    if (contents.includes("api") || contents.includes("auth")) focusArea = "Infrastructure & Security";
    if (contents.includes("ui") || contents.includes("css") || contents.includes("design")) focusArea = "Frontend & UX";
    if (contents.includes("bug") || contents.includes("fix") || contents.includes("error")) focusArea = "Stability & Patching";

    return {
        summary,
        focusArea,
        riskTrend: (sentiment.score < 50) ? "up" as const : "stable" as const
    };
}

export function detectBottlenecks(project: Project, messages: TeamMessage[] = []): Alert[] {
    const alerts: Alert[] = [];

    // Task-based bottlenecks
    const blockedTasks = project.tasks.filter(t => t.status === 'todo' && t.assignee === 'system'); // Placeholder for stuck tasks
    if (blockedTasks.length > 3) {
        alerts.push({
            id: `alert-btl-${Date.now()}`,
            severity: 'high',
            category: 'bottleneck',
            title: 'High Concurrency Load',
            description: 'Multiple pending tasks are queuing without active owners.',
            affectedResources: ['Development Pipeline'],
            suggestedAction: 'Reassign unowned tasks to available SMEs.'
        });
    }

    // Communication-based detection
    const decisionTraffic = messages.filter(m => m.isDecision).length;
    if (decisionTraffic === 0 && project.tasks.some(t => t.status === 'in-progress')) {
        alerts.push({
            id: `alert-com-${Date.now()}`,
            severity: 'medium',
            category: 'scope_creep',
            title: 'Low Decision Visibility',
            description: 'Active tasks are progressing without documented technical decisions.',
            affectedResources: ['Knowledge Base'],
            suggestedAction: 'Sync with lead developers to document implicit architectural choices.'
        });
    }

    return alerts;
}

export function generateIntelligenceReport(project: Project, messages: TeamMessage[] = []): IntelligenceReport {
    const sentiment = analyzeSentiment(messages);
    const decisions = extractDecisions(messages);
    const health = calculateProjectHealth(project, sentiment.score);
    const vibe = generateVibeCheck(messages, sentiment);

    const alerts = detectBottlenecks(project, messages);

    // Generate Nudges
    const nudges: Nudge[] = [];
    if (sentiment.score < 65) {
        nudges.push({
            id: `ndg-1-${Date.now()}`,
            type: 'context',
            message: "Friction detected in #dev-chat. Consider clarifying current sprint priorities.",
            timestamp: new Date().toISOString()
        });
    }
    if (project.tasks.filter(t => t.status === 'in-progress').length > 5) {
        nudges.push({
            id: `ndg-2-${Date.now()}`,
            type: 'action',
            message: "High concurrency in-progress. Focus on closing existing tasks before starting new ones.",
            timestamp: new Date().toISOString()
        });
    }

    return {
        id: `rep-${Date.now()}`,
        projectId: project.id,
        generatedAt: new Date().toISOString(),
        executiveSummary: vibe.summary,
        redFlags: alerts,
        velocity: {
            tasksCompletedLast24h: 2, // Mocked
            currentVelocity: 8.5,
            averageVelocity: 7.2,
            trend: 'increasing'
        },
        sentiment,
        recommendations: [
            { priority: 1, action: "Nudge @dev_lead regarding PR #402", rationale: "PR has been pending for 24h+ while task is in-progress." }
        ],
        vibeCheck: vibe,
        decisionLog: decisions,
        nudges
    };
}