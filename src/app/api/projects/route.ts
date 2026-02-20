import { NextRequest, NextResponse } from 'next/server';
import { getProjects, addProject } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const projects = await getProjects();
        return NextResponse.json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    const session = request.cookies.get('session');
    if (!session || !(await verifyToken(session.value))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        // Basic validation could go here
        const newProject = {
            ...body,
            id: body.id || uuidv4(),
            status: body.status || 'active',
            progress: body.progress || 0,
            tasks: body.tasks || [],
            createdAt: new Date().toISOString()
        };

        await addProject(newProject);
        return NextResponse.json({ success: true, project: newProject }, { status: 201 });
    } catch (error) {
        console.error('Error creating project:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
