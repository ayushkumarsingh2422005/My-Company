import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Contact from '@/app/models/Contact';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { action, contactId, data } = await req.json();

    switch (action) {
      case 'update_status': {
        const contact = await Contact.findById(contactId);
        if (!contact) {
          return NextResponse.json(
            { success: false, error: 'Contact not found' },
            { status: 404 }
          );
        }
        contact.status = data.status;
        await contact.save();
        return NextResponse.json({ success: true, data: contact });
      }

      case 'add_note': {
        const contact = await Contact.findById(contactId);
        if (!contact) {
          return NextResponse.json(
            { success: false, error: 'Contact not found' },
            { status: 404 }
          );
        }
        contact.notes.push({ content: data.note });
        await contact.save();
        return NextResponse.json({ success: true, data: contact });
      }

      case 'delete': {
        await Contact.findByIdAndDelete(contactId);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
} 