import mongoose, { Schema, Model } from 'mongoose';
import { Insight } from '@/lib/types';

const InsightSchema = new Schema<Insight>({
    id: { type: String, required: true, unique: true },
    type: { type: String, enum: ['info', 'alert', 'success', 'warning'], required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true }
});

const InsightModel: Model<Insight> = mongoose.models.Insight || mongoose.model<Insight>('Insight', InsightSchema);

export default InsightModel;
