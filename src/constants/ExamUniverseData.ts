import { ExamCategory } from '@/types';

export const EXAM_UNIVERSE: ExamCategory[] = [
    {
        name: 'Engineering',
        exams: [
            { name: 'JEE Main', id: 'jee-main' },
            { name: 'JEE Advanced', id: 'jee-adv' },
            { name: 'BITSAT', id: 'bitsat' },
            { name: 'VITEEE', id: 'viteee' },
        ],
    },
    {
        name: 'Medical',
        exams: [
            { name: 'NEET', id: 'neet' },
            { name: 'AIIMS', id: 'aiims' },
        ],
    },
    {
        name: 'Civil Services',
        exams: [
            { name: 'UPSC CSE', id: 'upsc-cse' },
            { name: 'State PSC', id: 'state-psc' },
        ],
    },
    {
        name: 'Management',
        exams: [
            { name: 'CAT', id: 'cat' },
            { name: 'XAT', id: 'xat' },
            { name: 'GMAT', id: 'gmat' },
        ],
    },
];
