import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || user.status === 'disabled') {
      return NextResponse.json({ error: 'Invalid credentials or account disabled' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const sessionPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      company: user.company,
    };

    const token = signToken(sessionPayload);

    // Determine redirect path
    const isAdmin = user.role !== 'client';
    const redirectUrl = isAdmin ? '/admin/dashboard' : '/client/dashboard';

    const response = NextResponse.json({
      success: true,
      user: sessionPayload,
      redirectUrl,
    });

    response.cookies.set('hyktec_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
