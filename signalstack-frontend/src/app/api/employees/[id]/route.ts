import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/v1';

async function handleRequest(request: Request, path: string) {
  const token = cookies().get('jwt_token')?.value;

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  let requestBody = undefined;
  if (request.method === 'PUT' || request.method === 'POST') { // POST for restore employee
    requestBody = await request.json();
  }

  const backendResponse = await fetch(`${BACKEND_API_URL}${path}`,
    {
      method: request.method,
      headers: headers,
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    }
  );

  const data = await backendResponse.json();
  return NextResponse.json(data, { status: backendResponse.status });
}

interface EmployeeIdRouteParams {
  params: { id: string };
}

export async function GET(request: Request, { params }: EmployeeIdRouteParams) {
  return handleRequest(request, `/employees/${params.id}`);
}

export async function PUT(request: Request, { params }: EmployeeIdRouteParams) {
  return handleRequest(request, `/employees/${params.id}`);
}

export async function DELETE(request: Request, { params }: EmployeeIdRouteParams) {
  return handleRequest(request, `/employees/${params.id}`);
}

// Special route for restoring an employee
export async function POST(request: Request, { params }: EmployeeIdRouteParams) {
  // Assuming the restore endpoint is `/employees/:id/restore` in the backend
  // The body might contain reasons for restoration, but for now it's empty.
  return handleRequest(request, `/employees/${params.id}/restore`);
}
