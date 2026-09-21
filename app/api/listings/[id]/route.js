import { NextResponse } from 'next/server';
import { getListingById } from '@/lib/mockData';

export async function GET(request, { params }) {
  const listing = getListingById(params.id);
  if (!listing) {
    return NextResponse.json({ error: 'Listing não encontrado' }, { status: 404 });
  }
  return NextResponse.json(listing);
}
