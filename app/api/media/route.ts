import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MediaContact from '@/models/MediaContacts';
import { MongoError } from 'mongodb';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, phone, company, budget, description } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !company || !budget || !description) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new media contact
    const mediaContact = await MediaContact.create({
      name,
      email,
      phone,
      company,
      budget,
      description
    });

    // Send notification to external service
    try {
      const notificationResponse = await fetch('https://notification.digicraft.one/api/external/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NOTIFICATION_API_KEY || '414930a3b0d878b8c8b63a3de3368060a59e78a5344d409b1e090e396764dc82'
        },
        body: JSON.stringify({
          title: "Media Enquiry",
          body: description,
          data: {
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            company: company,
            budget: budget,
            enquiryDescription: description
          },
          sender: "Media"
        })
      });

      if (!notificationResponse.ok) {
        console.error("Failed to send notification:", await notificationResponse.text());
      }
    } catch (notificationError) {
      console.error("Error sending notification:", notificationError);
    }

    return NextResponse.json({ 
      success: true, 
      data: mediaContact,
      message: 'Media contact information submitted successfully!'
    });
  } catch (error: unknown) {
    // Handle unique index violation if any
    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This contact information already exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const mediaContacts = await MediaContact.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: mediaContacts });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
}
