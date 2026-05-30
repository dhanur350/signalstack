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
  if (request.method === 'POST' || request.method === 'PUT') {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  return handleRequest(request, `/employees?${queryString}`);
}

export async function POST(request: Request) {
  return handleRequest(request, '/employees');
}
