import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import MediaContact from '@/models/MediaContacts';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { action, contactId, data } = await req.json();

    switch (action) {
      case 'update_status': {
        const contact = await MediaContact.findById(contactId);
        if (!contact) {
          return NextResponse.json(
            { success: false, error: 'Media inquiry not found' },
            { status: 404 }
          );
        }
        contact.status = data.status;
        await contact.save();
        return NextResponse.json({ success: true, data: contact });
      }

      case 'add_note': {
        const contact = await MediaContact.findById(contactId);
        if (!contact) {
          return NextResponse.json(
            { success: false, error: 'Media inquiry not found' },
            { status: 404 }
          );
        }
        if (!contact.notes) contact.notes = [];
        contact.notes.push({ content: data.note });
        await contact.save();
        return NextResponse.json({ success: true, data: contact });
      }

      case 'delete': {
        await MediaContact.findByIdAndDelete(contactId);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
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
