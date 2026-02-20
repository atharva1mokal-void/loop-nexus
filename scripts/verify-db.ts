import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import UserModel from '../src/models/User';
import ProjectModel from '../src/models/Project';
import InsightModel from '../src/models/Insight';
import NotificationModel from '../src/models/Notification';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function verify() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to', MONGODB_URI);

        const usersAPI = await UserModel.countDocuments();
        const projectsAPI = await ProjectModel.countDocuments();
        const insightsAPI = await InsightModel.countDocuments();
        const notificationsAPI = await NotificationModel.countDocuments();

        console.log('--- Database Verification Report ---');
        console.log(`Users: ${usersAPI}`);
        console.log(`Projects: ${projectsAPI}`);
        console.log(`Insights: ${insightsAPI}`);
        console.log(`Notifications: ${notificationsAPI}`);
        console.log('------------------------------------');

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
}

verify();
