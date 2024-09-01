import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

export async function insert(req: NextApiRequest) {
  const requestBody = await req.body;

  const item = {
    id: items.length + 1,
    name: requestBody.name,
  };

  items.push(item);

  return NextResponse.json(item, { status: 201 });
}