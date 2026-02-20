
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    role: String,
    email: String,
    fullName: String,
    createdAt: Date,
    isActive: Boolean
}, { strict: false });

const UserModel = mongoose.model('User', UserSchema);

async function createAdmin() {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI missing');
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await UserModel.findOne({ username: 'admin' });
        if (adminExists) {
            console.log('Admin already exists.');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        await UserModel.create({
            id: 'admin_user',
            username: 'admin',
            email: 'admin@looprep.com',
            password: hashedPassword,
            role: 'admin',
            fullName: 'System Administrator',
            createdAt: new Date(),
            isActive: true
        });

        console.log('Admin user created successfully.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

createAdmin();
