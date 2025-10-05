import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { action, email, subscriberId } = await req.json();

    switch (action) {
      case 'create': {
        // Split emails and clean them
        const emails = email.split(',').map((e: string) => e.trim()).filter(Boolean);
        const results = [];
        const errors = [];

        // Process each email
        for (const singleEmail of emails) {
          try {
            // Check if email already exists
            const existingSubscriber = await Newsletter.findOne({ email: singleEmail });

            if (existingSubscriber) {
              if (existingSubscriber.subscribed) {
                errors.push(`${singleEmail} is already subscribed.`);
                continue;
              }
              // Reactivate if previously unsubscribed
              existingSubscriber.subscribed = true;
              await existingSubscriber.save();
              results.push({
                email: singleEmail,
                status: 'reactivated'
              });
              continue;
            }

            // Create new subscriber
            const unsubscribeToken = crypto.randomBytes(32).toString('hex');
            const newSubscriber = await Newsletter.create({
              email: singleEmail,
              unsubscribeToken,
            });
            results.push({
              email: singleEmail,
              status: 'created',
              unsubscribeToken: newSubscriber.unsubscribeToken
            });
          } catch (error: unknown) {
            errors.push(`Failed to add ${singleEmail}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            added: results,
            errors: errors
          },
          message: `Successfully processed ${results.length} email(s)${errors.length ? ` with ${errors.length} error(s)` : ''}`
        });
      }

      case 'delete':
        await Newsletter.findByIdAndDelete(subscriberId);
        return NextResponse.json({ success: true });

      case 'toggle':
        const subscriber = await Newsletter.findById(subscriberId);
        if (!subscriber) {
          return NextResponse.json(
            { success: false, error: 'Subscriber not found' },
            { status: 404 }
          );
        }
        subscriber.subscribed = !subscriber.subscribed;
        await subscriber.save();
        return NextResponse.json({ success: true, data: subscriber });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 400 }
    );
  }
} 