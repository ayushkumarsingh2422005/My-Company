import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Contact from '@/app/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const contact = await Contact.create(data);

    // Send notification to external service
    try {
      const notificationResponse = await fetch('https://notification.digicraft.one/api/external/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NOTIFICATION_API_KEY || '414930a3b0d878b8c8b63a3de3368060a59e78a5344d409b1e090e396764dc82'
        },
        body: JSON.stringify({
          title: "DigiCraft Enquiry",
          body: data.description,
          data: {
            customerName: data.name,
            customerEmail: data.email,
            customerPhone: data.phone,
            company: data.company,
            serviceType: data.serviceType,
            projectType: data.projectType,
            budget: data.budget,
            timeline: data.timeline,
            requirements: data.requirements,
            enquiryDescription: data.description
          },
          sender: "Main"
        })
      });

      if (!notificationResponse.ok) {
        console.error("Failed to send notification:", await notificationResponse.text());
      }
    } catch (notificationError) {
      console.error("Error sending notification:", notificationError);
    }

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