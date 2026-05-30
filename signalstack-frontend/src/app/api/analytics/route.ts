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

  const backendResponse = await fetch(`${BACKEND_API_URL}${path}`,
    {
      method: request.method,
      headers: headers,
    }
  );

  const data = await backendResponse.json();
  return NextResponse.json(data, { status: backendResponse.status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  // All analytics endpoints are GET requests
  const analyticsPath = `/analytics?${queryString}`;
  return handleRequest(request, analyticsPath);
}
