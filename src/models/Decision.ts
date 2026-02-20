import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IDecision extends Document {
    id: string;
    projectId: string;
    title: string;
    context: string;
    sourceMessageId: string;
    timestamp: string;
    syncedToTask: boolean;
}

const DecisionSchema = new Schema<IDecision>({
    id: { type: String, required: true, unique: true },
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    context: { type: String, required: true },
    sourceMessageId: { type: String },
    timestamp: { type: String, required: true },
    syncedToTask: { type: Boolean, default: false }
});

const DecisionModel: Model<IDecision> = mongoose.models.Decision || mongoose.model<IDecision>('Decision', DecisionSchema);

export default DecisionModel;
