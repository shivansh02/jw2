import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "You have been authenticated successfully" });
}