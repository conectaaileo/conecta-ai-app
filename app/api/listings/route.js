import { NextResponse } from 'next/server';
import { getListings, createListing } from '@/lib/mockData';

export async function GET() {
  const listings = getListings();
  return NextResponse.json(listings);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newListing = createListing(body);
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar listing' }, { status: 400 });
  }
}
