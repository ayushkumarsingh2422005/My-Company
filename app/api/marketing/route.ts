import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Marketing } from '@/models/Marketing';

export async function GET() {
  try {
    await dbConnect();
    const banners = await Marketing.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    console.error('Failed to fetch marketing banners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch marketing banners' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received marketing banner data:', body);

    await dbConnect();
    
    // Validate required fields
    if (!body.imageUrl || !body.publicId) {
      console.error('Missing required fields:', { imageUrl: body.imageUrl, publicId: body.publicId });
      return NextResponse.json(
        { success: false, error: 'Image URL and Public ID are required' },
        { status: 400 }
      );
    }

    const banner = await Marketing.create({
      imageUrl: body.imageUrl,
      publicId: body.publicId,
      link: body.link || '',
      isActive: body.isActive ?? true
    });

    console.log('Created marketing banner:', banner);
    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error('Failed to create marketing banner:', error);
    // Return the actual error message for debugging
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create marketing banner',
        details: error
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    await dbConnect();
    const banner = await Marketing.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    );

    if (!banner) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error('Failed to update marketing banner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update marketing banner' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Banner ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    const banner = await Marketing.findByIdAndDelete(id);

    if (!banner) {
      return NextResponse.json(
        { success: false, error: 'Banner not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    console.error('Failed to delete marketing banner:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete marketing banner' },
      { status: 500 }
    );
  }
} 