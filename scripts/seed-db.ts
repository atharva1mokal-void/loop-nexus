import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import UserModel from '../src/models/User';
import ProjectModel from '../src/models/Project';
import InsightModel from '../src/models/Insight';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected.');

        console.log('Reading db.json...');
        let dbData;
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            dbData = JSON.parse(data);
        } catch (error) {
            console.log('No db.json found or empty, skipping file read.');
            dbData = {};
        }

        // Clear existing data? Maybe strictly requested migration means wipe and replace or upsert?
        // Let's wipe for clean state as this is "Migration"
        console.log('Clearing existing collections...');
        await UserModel.deleteMany({});
        await ProjectModel.deleteMany({});
        await InsightModel.deleteMany({});

        if (dbData.users && dbData.users.length > 0) {
            console.log(`Seeding ${dbData.users.length} users...`);
            await UserModel.insertMany(dbData.users);
        } else {
            console.log('No users in db.json, seeding default users...');
            // Seed default users if none exist
            await UserModel.create([
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
            ]);
        }

        if (dbData.projects && dbData.projects.length > 0) {
            console.log(`Seeding ${dbData.projects.length} projects...`);
            // Ensure ID field is present, map _id if needed or let mongo generate _id and keep id field
            // The schemas use 'id' string field, so we just pass the object
            await ProjectModel.insertMany(dbData.projects);
        }

        if (dbData.insights && dbData.insights.length > 0) {
            console.log(`Seeding ${dbData.insights.length} insights...`);
            await InsightModel.insertMany(dbData.insights);
        }


        console.log('Seed completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
}

seed();
