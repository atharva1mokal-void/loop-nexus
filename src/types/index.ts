export interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'student' | 'admin' | 'mentor';
    targetExam?: string;
}

export interface PerformanceMetrics {
    overallAccuracy: number;
    averageSpeed: number; // in seconds per question
    weakTopics: { topic: string; accuracy: number }[];
    accuracyTrend: { date: string; accuracy: number }[];
    strengths: string[];
}

export interface Exam {
    name: string;
    id: string;
}

export interface ExamCategory {
    name: string;
    exams: Exam[];
}
