import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id                TEXT        PRIMARY KEY,
      slug              TEXT        UNIQUE NOT NULL,
      name              TEXT        NOT NULL,
      short_description TEXT        NOT NULL DEFAULT '',
      description       TEXT        NOT NULL DEFAULT '',
      price             INTEGER     NOT NULL DEFAULT 0,
      compare_at_price  INTEGER,
      category          TEXT        NOT NULL,
      tags              JSONB       NOT NULL DEFAULT '[]',
      images            JSONB       NOT NULL DEFAULT '[]',
      variants          JSONB       NOT NULL DEFAULT '[]',
      material          TEXT,
      print_time        INTEGER,
      stock             INTEGER     NOT NULL DEFAULT 0,
      is_active         BOOLEAN     NOT NULL DEFAULT true,
      is_featured       BOOLEAN     NOT NULL DEFAULT false,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      rating            NUMERIC(3,2),
      review_count      INTEGER     NOT NULL DEFAULT 0
    )
  `
}
