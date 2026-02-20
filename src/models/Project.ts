import mongoose, { Schema, Model } from 'mongoose';
import { Project } from '@/lib/types';

const ProjectSchema = new Schema<Project>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'archived', 'completed'], default: 'active' },
    progress: { type: Number, default: 0 },
    tasks: [{
        id: String,
        title: String,
        status: { type: String, enum: ['todo', 'in-progress', 'completed'] },
        assignee: String
    }],
    techStack: [String],
    githubUrl: String,
    githubRepo: String,
    lastSyncedAt: String,
    projectType: { type: String, enum: ['software', 'civil', 'mechanical', 'electrical', 'chemical', 'other'] },
    resources: [{
        id: String,
        name: String,
        quantity: Number,
        unit: String,
        costPerUnit: Number,
        totalCost: Number,
        category: { type: String, enum: ['raw_material', 'equipment', 'labor', 'other'] }
    }],
    workLogs: [{
        id: String,
        userId: String,
        projectId: String,
        date: String,
        hoursWorked: Number,
        tasksCompleted: [String],
        materialsUsed: [{ resourceId: String, quantityUsed: Number }],
        notes: String,
        progressPercentage: Number
    }],
    estimatedCompletion: String,
    stats: {
        efficiency: Number,
        codeQuality: Number,
        testCoverage: Number,
        healthScore: { type: Number, default: 0 }
    }
});

const ProjectModel: Model<Project> = mongoose.models.Project || mongoose.model<Project>('Project', ProjectSchema);

export default ProjectModel;
