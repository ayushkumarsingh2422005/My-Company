import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Newsletter from '@/app/models/Newsletter';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { token, action } = await req.json();

    const subscriber = await Newsletter.findOne({ unsubscribeToken: token });
    
    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 400 }
      );
    }

    subscriber.subscribed = action === 'resubscribe';
    await subscriber.save();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
} 