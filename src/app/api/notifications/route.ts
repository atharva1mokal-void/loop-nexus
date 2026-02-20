import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import NotificationModel from '@/models/Notification';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    await dbConnect();

    try {
        if (!userId) {
            return NextResponse.json({ success: false, error: 'UserId required' }, { status: 400 });
        }
        const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, notifications });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const session = request.cookies.get('session');
    if (!session || !(await verifyToken(session.value))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await dbConnect();
        const body = await request.json();

        // Handle "mark as read" or "create notification"
        if (body.action === 'markRead') {
            const { notificationId } = body;
            await NotificationModel.updateOne({ id: notificationId }, { read: true });
            return NextResponse.json({ success: true });
        }

        const { userId, type, title, message, link } = body;
        const newNotification = {
            id: uuidv4(),
            userId,
            type: type || 'info',
            title,
            message,
            read: false,
            createdAt: new Date().toISOString(),
            link
        };

        await NotificationModel.create(newNotification);
        return NextResponse.json({ success: true, notification: newNotification }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to process notification' }, { status: 500 });
    }
}
