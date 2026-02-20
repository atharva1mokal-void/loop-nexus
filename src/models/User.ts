import mongoose, { Schema, Model } from 'mongoose';
import { User } from '@/lib/types';

const UserSchema = new Schema<User>({
    id: { type: String, required: true, unique: true }, // Keeping string ID for compatibility
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'client', 'developer'], required: true },
    fullName: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: String, required: true }, // Storing as ISO string to match interface
    lastLogin: { type: String },
    isActive: { type: Boolean, default: true },
    metadata: {
        burnoutLevel: { type: Number, default: 0 },
        contextSwitchingRate: { type: Number, default: 0 },
        expertise: [String]
    }
});

// Prevent overwrite on hot reload
const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
