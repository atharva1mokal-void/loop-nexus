import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    text: string;
    senderId: string;
    senderName: string;
    senderRole: string; // 'user', 'ai', 'admin'
    source: 'slack' | 'discord' | 'github' | 'internal';
    projectId?: string;
    isDecision?: boolean;
    timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
    text: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderRole: { type: String, required: true },
    source: { type: String, enum: ['slack', 'discord', 'github', 'internal'], default: 'internal' },
    projectId: { type: String },
    isDecision: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
