import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the hostname from the request
  const hostname = request.headers.get('origin') || '';
  // console.log(hostname=="http://localhost:5173");
  
  // Allow access from media.digicraft.one or localhost/127.0.0.1:5173
  if (hostname === 'media.digicraft.one' || hostname === 'http://127.0.0.1:5173' || hostname === 'http://localhost:5173') {
    // For CORS preflight requests
    console.log(request.method);
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });
      response.headers.set('Access-Control-Allow-Origin', hostname);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.set('Access-Control-Max-Age', '86400');
      return response;
    }
    
    // For actual requests
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', hostname);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};