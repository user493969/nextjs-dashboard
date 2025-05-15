// app/api/invoices/[id]/route.ts

import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { customer_id, amount, status, date } = body;

  await sql`
    UPDATE invoices
    SET customer_id = ${customer_id},
        amount = ${amount},
        status = ${status},
        date = ${date}
    WHERE id = ${params.id}
  `;

  return NextResponse.json({ message: 'Invoice updated' });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await sql`DELETE FROM invoices WHERE id = ${params.id}`;
  return NextResponse.json({ message: 'Invoice deleted' });
}
