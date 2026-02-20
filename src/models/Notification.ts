import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Notification extends Document {
    id: string;
    userId: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    link?: string;
}

const NotificationSchema = new Schema<Notification>({
    // Using MongoDB _id as well, but keeping id for frontend consistency if needed, or rely on _id mapping
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: { type: String, enum: ['info', 'warning', 'success', 'error'], default: 'info' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: String, default: () => new Date().toISOString() },
    link: String
});

const NotificationModel: Model<Notification> = mongoose.models.Notification || mongoose.model<Notification>('Notification', NotificationSchema);

export default NotificationModel;
