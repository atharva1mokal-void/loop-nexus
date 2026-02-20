import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import { hashPassword } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const { username, email, password, fullName } = body;

        if (!username || !email || !password || !fullName) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return NextResponse.json({ success: false, error: 'Username or email already exists' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = {
            id: uuidv4(),
            username,
            email,
            password: hashedPassword,
            role: 'client', // Default role for self-registration
            fullName,
            createdAt: new Date().toISOString(),
            isActive: true
        };

        await UserModel.create(newUser);

        return NextResponse.json({ success: true, user: { username, email } }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
    }
}
