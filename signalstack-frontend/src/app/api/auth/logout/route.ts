import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    (await cookies()).delete('jwt_token');
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('[API/AUTH/LOGOUT] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
