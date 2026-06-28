import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  try {
    let query = supabaseAdmin.from('focus_settings').select('*');
    if (key) query = query.eq('key', key);

    const { data, error } = await query;

    if (error) {
      // If table doesn't exist yet, return a graceful response
      if (error.code === '42P01') {
        return NextResponse.json(key ? { key, value: null } : []);
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (key) {
      return NextResponse.json(data && data.length > 0 ? data[0] : { key, value: null });
    }
    return NextResponse.json(data || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('focus_settings')
      .upsert([
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
      ], { onConflict: 'key' })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
