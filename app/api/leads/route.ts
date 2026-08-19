import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.description) {
      return NextResponse.json({ error: 'Name, email, and description are required' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        company: body.company || null,
        email: body.email,
        phone: body.phone || null,
        country: body.country || null,
        service: body.service || 'General Inquiry',
        budget: body.budget || null,
        projectType: body.projectType || null,
        expectedTimeline: body.expectedTimeline || null,
        description: body.description,
        websiteUrl: body.websiteUrl || null,
        preferredContact: body.preferredContact || 'email',
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead creation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
