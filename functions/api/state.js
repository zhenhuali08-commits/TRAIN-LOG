const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  }
});

export async function onRequestGet(context) {
  const db = context.env.DB;
  if (!db) return json({ error: 'D1 binding DB is not configured' }, 503);
  try {
    const row = await db.prepare('SELECT data, updated_at FROM app_state WHERE id = ?1').bind('default').first();
    if (!row) return json({ state: null, updatedAt: null });
    return json({ state: JSON.parse(row.data), updatedAt: row.updated_at });
  } catch (error) {
    return json({ error: 'Failed to read state' }, 500);
  }
}

export async function onRequestPut(context) {
  const db = context.env.DB;
  if (!db) return json({ error: 'D1 binding DB is not configured' }, 503);
  try {
    const length = Number(context.request.headers.get('content-length') || 0);
    if (length > 2_000_000) return json({ error: 'Payload too large' }, 413);
    const body = await context.request.json();
    if (!body || typeof body.state !== 'object' || Array.isArray(body.state)) {
      return json({ error: 'Invalid state payload' }, 400);
    }
    const data = JSON.stringify(body.state);
    if (data.length > 2_000_000) return json({ error: 'Payload too large' }, 413);
    const now = new Date().toISOString();
    await db.prepare(`
      INSERT INTO app_state (id, data, updated_at)
      VALUES (?1, ?2, ?3)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at
    `).bind('default', data, now).run();
    return json({ ok: true, updatedAt: now });
  } catch (error) {
    return json({ error: 'Failed to save state' }, 500);
  }
}
