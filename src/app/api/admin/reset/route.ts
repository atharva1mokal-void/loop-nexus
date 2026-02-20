import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import NotificationModel from '@/models/Notification';
// Import auth middleware logic or verify token here manually to ensure only ADMIN can run this.
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    // 1. Verify Admin Session
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(sessionCookie.value);
    if (!payload || payload.role !== 'admin') {
        // Allow dev bypass if needed or strict check. Sticking to strict for "Reset Data" safety.
        return NextResponse.json({ success: false, error: 'Forbidden: Admin access only' }, { status: 403 });
    }

    try {
        await dbConnect();
        const body = await request.json();
        const { target } = body; // 'notifications', 'all', etc.

        if (target === 'notifications' || target === 'all') {
            await NotificationModel.deleteMany({});
        }
        // Admin reset now only handles notifications/system alerts

        return NextResponse.json({ success: true, message: 'Data reset successful' });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Reset failed' }, { status: 500 });
    }
}
