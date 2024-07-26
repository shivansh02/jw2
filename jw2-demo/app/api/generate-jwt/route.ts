import type { NextRequest, NextResponse } from 'next/server';
import { encode_jwt } from 'jw2/dist';

export async function GET(req: NextRequest) {
  const secret = process.env.JWT_SECRET as string;

  const payload = {
    id: 'user123',
    role: 'user',
    exp: Math.floor(Date.now() / 1000) + 3600
  };

  const token = await encode_jwt(secret, payload.id, payload, 3600); 

  return new Response(JSON.stringify({ token }), { status: 200 });
}
