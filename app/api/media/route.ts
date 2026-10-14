import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MediaContact from '@/models/MediaContacts';
import { MongoError } from 'mongodb';

type MediaPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  editType?: string;
  editTypeLabel?: string;
  videoCount?: number | string;
  packPrice?: number | string;
  languageAddon?: boolean;
  languageCount?: number | string;
  languageAddonUnit?: number | string;
  languages?: string;
  estimatedTotal?: number | string;
  budget?: string;
  timeline?: string;
  description?: string;
  requirements?: string;
  source?: string;
};

const toNumber = (value: unknown, fallback = 0) => {
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body: MediaPayload = await req.json();

    const name = body.name?.trim() || '';
    const email = body.email?.trim() || '';
    const phone = body.phone?.trim() || '';
    const description = body.description?.trim() || '';

    if (!name || !email || !phone || !description) {
      return NextResponse.json(
        { success: false, error: 'Name, email, phone, and project details are required' },
        { status: 400 }
      );
    }

    const videoCount = toNumber(body.videoCount);
    const packPrice = toNumber(body.packPrice);
    const languageAddon = Boolean(body.languageAddon);
    const languageCount = languageAddon ? Math.max(1, toNumber(body.languageCount, 1)) : 0;
    const languageAddonUnit = toNumber(body.languageAddonUnit);
    const languageAddonTotal = languageCount * languageAddonUnit * Math.max(videoCount, 1);
    const estimatedTotal =
      toNumber(body.estimatedTotal) ||
      packPrice + (languageAddon ? languageAddonTotal : 0);

    const budget =
      body.budget?.trim() ||
      (estimatedTotal > 0
        ? `₹${estimatedTotal.toLocaleString('en-IN')}`
        : '');

    const mediaContact = await MediaContact.create({
      name,
      email,
      phone,
      company: body.company?.trim() || '',
      editType: body.editType || '',
      editTypeLabel: body.editTypeLabel || '',
      videoCount,
      packPrice,
      languageAddon,
      languageCount,
      languageAddonUnit,
      languages: body.languages?.trim() || '',
      estimatedTotal,
      budget,
      timeline: body.timeline?.trim() || '',
      description,
      requirements: body.requirements?.trim() || '',
      source: body.source || 'other',
      status: 'new',
    });

    try {
      const notificationResponse = await fetch(
        'https://notification.digicraft.one/api/external/send-notification',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              process.env.NOTIFICATION_API_KEY ||
              '414930a3b0d878b8c8b63a3de3368060a59e78a5344d409b1e090e396764dc82',
          },
          body: JSON.stringify({
            title: 'Media Enquiry',
            body: description,
            data: {
              customerName: name,
              customerEmail: email,
              customerPhone: phone,
              company: body.company || '',
              editType: body.editTypeLabel || body.editType || '',
              videoCount: String(videoCount),
              packPrice: String(packPrice),
              languageAddon: languageAddon ? 'yes' : 'no',
              languageCount: String(languageCount),
              languages: body.languages || '',
              estimatedTotal: String(estimatedTotal),
              budget,
              timeline: body.timeline || '',
              requirements: body.requirements || '',
              enquiryDescription: description,
              source: body.source || 'other',
            },
            sender: 'Media',
          }),
        }
      );

      if (!notificationResponse.ok) {
        console.error('Failed to send notification:', await notificationResponse.text());
      }
    } catch (notificationError) {
      console.error('Error sending notification:', notificationError);
    }

    return NextResponse.json({
      success: true,
      data: mediaContact,
      message: 'Media contact information submitted successfully!',
    });
  } catch (error: unknown) {
    if (error instanceof MongoError && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'This contact information already exists.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
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
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 400 }
    );
  }
}
