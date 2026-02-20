import { PerformanceMetrics, User } from '@/types';

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const analyticsService = {
    getPerformanceMetrics: async (userId: string) => {
        await delay(500);
        const mockMetrics: PerformanceMetrics = {
            overallAccuracy: 78,
            averageSpeed: 45,
            weakTopics: [{ topic: 'Rotational Motion', accuracy: 45 }],
            accuracyTrend: [
                { date: '2023-10-01', accuracy: 65 },
                { date: '2023-10-08', accuracy: 70 },
                { date: '2023-10-15', accuracy: 68 },
                { date: '2023-10-22', accuracy: 72 },
                { date: '2023-10-29', accuracy: 75 },
                { date: '2023-11-05', accuracy: 78 },
                { date: '2023-11-12', accuracy: 80 },
            ],
            strengths: ['Electrostatics', 'Modern Physics'],
        };
        return { data: { data: mockMetrics } };
    },
};

export const testService = {
    getRecentAttempts: async () => {
        await delay(600);
        const mockAttempts = [
            {
                _id: '101',
                testId: { title: 'Full Syllabus Mock 1' },
                accuracy: 82,
                createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
            {
                _id: '102',
                testId: { title: 'Physics Chapter Wise' },
                accuracy: 65,
                createdAt: new Date(Date.now() - 172800000).toISOString(),
            },
            {
                _id: '103',
                testId: { title: 'Chemistry daily practice' },
                accuracy: 90,
                createdAt: new Date(Date.now() - 259200000).toISOString(),
            },
        ];
        return { data: { data: mockAttempts } };
    },
};

export const studentService = {
    updateProfile: async (updates: Partial<User>) => {
        await delay(800);
        return { data: { success: true, message: 'Profile updated' } };
    },
};
