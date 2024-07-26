import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { decode_jwt, validate_jwt } from 'jw2/dist';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/public') || pathname === '/api/generate-token') {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse('no header', { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    return new NextResponse('no secret', { status: 401 });
  }
  

  const isValid = await validate_jwt(secret, token);
  if (!isValid) {
    return new NextResponse('invalid jwt', { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected'],
};
