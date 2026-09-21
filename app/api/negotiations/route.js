import { NextResponse } from 'next/server';
import { createNegotiation, getNegotiations } from '@/lib/mockData';

export async function GET() {
  const negotiations = getNegotiations();
  return NextResponse.json(negotiations);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newNegotiation = createNegotiation(body);
    return NextResponse.json(newNegotiation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar negociação' }, { status: 400 });
  }
}
