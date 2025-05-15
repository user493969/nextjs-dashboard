// app/api/invoices/route.ts

import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  const invoices = await sql`SELECT * FROM invoices`;
  return NextResponse.json(invoices);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { customer_id, amount, status, date } = body;

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customer_id}, ${amount}, ${status}, ${date})
  `;

  return NextResponse.json({ message: 'Invoice created' }, { status: 201 });
}
