import dbConnect from './db';
import ProjectModel from '@/models/Project';
import InsightModel from '@/models/Insight';
import UserModel from '@/models/User';
import { Project, Insight, User, DB } from './types';

// Ensure DB connection
const connect = async () => await dbConnect();

export async function getProjects(): Promise<Project[]> {
    await connect();
    const projects = await ProjectModel.find({}).lean();
    return projects.map((p: any) => ({ ...p, id: p.id || p._id.toString() })) as Project[];
}

export async function getInsights(): Promise<Insight[]> {
    await connect();
    const insights = await InsightModel.find({}).sort({ timestamp: -1 }).limit(50).lean();
    return insights.map((i: any) => ({ ...i, id: i.id || i._id.toString() })) as Insight[];
}

export async function updateProject(updatedProject: Project): Promise<void> {
    await connect();
    await ProjectModel.findOneAndUpdate({ id: updatedProject.id }, updatedProject);
}

export async function addInsight(insight: Insight): Promise<void> {
    await connect();
    await InsightModel.create(insight);
}

export async function addProject(project: Project): Promise<void> {
    await connect();
    await ProjectModel.create(project);
}

export async function deleteProject(projectId: string): Promise<void> {
    await connect();
    await ProjectModel.deleteOne({ id: projectId });
}

export async function getUsers(): Promise<User[]> {
    await connect();
    const users = await UserModel.find({}).lean();
    // Use mapped users if available, otherwise return mock for prototype if DB is empty?
    // For now, let's stick to true DB source
    if (users.length === 0) {
        return [
            {
                id: 'u1',
                username: 'client_alpha',
                email: 'client@alphacorp.com',
                password: 'mock_hashed_password_1',
                role: 'client',
                fullName: 'Alpha Corp Rep',
                createdAt: new Date().toISOString(),
                isActive: true
            },
            {
                id: 'u2',
                username: 'dev_lead',
                email: 'lead@devteam.com',
                password: 'mock_hashed_password_2',
                role: 'developer',
                fullName: 'Lead Dev',
                createdAt: new Date().toISOString(),
                isActive: true
            }
        ];
    }
    return users.map((u: any) => ({ ...u, id: u.id || u._id.toString() })) as User[];
}


// Auth functions
export async function createUser(user: User): Promise<void> {
    await connect();
    await UserModel.create(user);
}

export async function getUserByEmail(email: string): Promise<User | null> {
    await connect();
    const user = await UserModel.findOne({ email }).lean();
    if (!user) return null;
    return { ...user, id: user.id || (user as any)._id.toString() } as User;
}

export async function getUserById(id: string): Promise<User | null> {
    await connect();
    const user = await UserModel.findOne({ id }).lean();
    if (!user) return null;
    return { ...user, id: user.id || (user as any)._id.toString() } as User;
}

export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
    await connect();
    await UserModel.findOneAndUpdate({ id: userId }, updates);
}

export async function getAllUsers(): Promise<User[]> {
    return getUsers();
}

// Deprecated or Mocked for compatibility
export async function readDB(): Promise<DB> {
    const [projects, insights, users] = await Promise.all([
        getProjects(),
        getInsights(),
        getUsers(),
    ]);
    return {
        projects,
        insights,
        users,
    };
}

export async function writeDB(data: DB): Promise<void> {
    // No-op or throw error. We shouldn't be writing the whole DB anymore.
    console.warn('writeDB is deprecated in favor of granular updates');
}

