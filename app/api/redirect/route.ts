import { NextRequest, NextResponse } from 'next/server';

// URL mappings stored directly in code
const urlMappings = {
  "1": "https://www.digicraft.one",
  "business-card": "https://www.digicraft.one"
};

export async function GET(request: NextRequest) {
  try {
    // Get the ID from the URL parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // If no ID provided, return 400
    if (!id) {
      return new NextResponse('Missing ID parameter', { status: 400 });
    }

    // Find the URL mapping
    const targetUrl = urlMappings[id as keyof typeof urlMappings];

    // If no mapping found, return 404
    if (!targetUrl) {
      return new NextResponse('Redirect not found', { status: 404 });
    }

    // Redirect to the target URL
    return NextResponse.redirect(targetUrl);

  } catch (error) {
    console.error('Error in redirect API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

