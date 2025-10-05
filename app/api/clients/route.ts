import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';

// GET all clients
export async function GET() {
  try {
    await connectDB();
    const clients = await Client.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: clients });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST new client
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const clientData = {
      name: body.name,
      role: body.role,
      image: {
        url: body.image.url,
        publicId: body.image.publicId
      },
      testimonial: body.testimonial,
      project: {
        title: body.project.title,
        link: body.project.link,
        description: body.project.description
      },
      rating: Number(body.rating),
      location: body.location,
      order: Number(body.order) || 0,
      isActive: body.isActive
    };

    const client = await Client.create(clientData);
    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create client' },
      { status: 500 }
    );
  }
}

// PUT update client
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const client = await Client.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE client
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: client });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete client' },
      { status: 500 }
    );
  }
} 