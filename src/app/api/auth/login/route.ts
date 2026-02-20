import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UserModel from '@/models/User';
import { signToken, comparePassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        // Find user by username or email
        const user = await UserModel.findOne({
            $or: [{ username }, { email: username }]
        });

        if (!user) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // Check password (handle legacy mock passwords vs hashed)
        // For development speed, if password starts with 'mock_', consider valid if matches exactly
        // Otherwise use comparePassword
        let isValid = false;
        if (user.password.startsWith('mock_')) {
            isValid = user.password === password;
            // Ideally migrate to hash here, but let's skipping complicating the login logic for now
        } else {
            isValid = await comparePassword(password, user.password);
        }

        if (!isValid) {
            return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
        }

        // Create Session Token
        const token = await signToken({
            userId: user.id || user._id,
            username: user.username,
            role: user.role
        });

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                fullName: user.fullName
            }
        });

        // Set Cookie
        response.cookies.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
