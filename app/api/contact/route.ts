import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Contact from '@/app/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const contact = await Contact.create(data);
    return NextResponse.json({ success: true, data: contact });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const status = searchParams.get('status');

    let query = {};

    // Add search functionality
    if (search) {
      query = {
        $or: [
          { $text: { $search: search } },
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Add status filter
    if (status) {
      query = { ...query, status };
    }

    // Add sorting
    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const contacts = await Contact.find(query).sort(sortOptions);
    return NextResponse.json({ success: true, data: contacts });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
} 