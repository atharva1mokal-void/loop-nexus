import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MessageModel from '@/models/Message';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    // Only authenticated users can read chat? Middleware protects /chat page, but API should be protected too.
    const session = request.cookies.get('session');
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // Optional: verify token validity
    const payload = await verifyToken(session.value);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const messages = await MessageModel.find({}).sort({ timestamp: 1 }).limit(50);
        return NextResponse.json({ success: true, messages });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const session = request.cookies.get('session');
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyToken(session.value);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        await dbConnect();
        const body = await request.json();

        const newMessage = await MessageModel.create({
            text: body.text,
            senderId: payload.userId,
            senderName: payload.username || 'Unknown User',
            senderRole: payload.role || 'user',
            timestamp: new Date()
        });

        // Optional: Trigger AI response here if needed logic exists

        return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
    }
}
