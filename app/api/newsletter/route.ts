import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import crypto from 'crypto';
import { MongoError } from 'mongodb';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      // If already subscribed, return error
      if (existingSubscriber.subscribed) {
        return NextResponse.json(
          { success: false, error: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        );
      }
      
      // If previously unsubscribed, reactivate subscription
      existingSubscriber.subscribed = true;
      await existingSubscriber.save();
      
      return NextResponse.json({ 
        success: true, 
        data: existingSubscriber,
        message: 'Welcome back! Your subscription has been reactivated.'
      });
    }

    // Generate unique unsubscribe token for new subscriber
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');

    const newsletter = await Newsletter.create({
      email,
      unsubscribeToken,
    });

    return NextResponse.json({ 
      success: true, 
      data: newsletter,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error: unknown) {
    // Handle unique index violation explicitly
    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This email is already registered.' },
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
    const subscribers = await Newsletter.find({}).sort({ subscribedAt: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
} 