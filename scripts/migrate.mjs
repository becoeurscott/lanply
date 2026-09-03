#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_KEY first.");
  console.error("  Find them at: https://supabase.com/dashboard → your project → Settings → API");
  console.error("");
  console.error("  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=eyJ... node scripts/migrate.mjs");
  process.exit(1);
}

const supabase = createClient(url, key);

console.log("Creating tables via Supabase SQL…");
console.log("NOTE: Run this SQL in your Supabase dashboard → SQL Editor:\n");

const sql = `
-- Nexus Site tables
CREATE TABLE IF NOT EXISTS accounts (
  id            TEXT PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS briefs (
  id           TEXT PRIMARY KEY,
  account_id   TEXT REFERENCES accounts(id),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  data         JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS sites (
  id         TEXT PRIMARY KEY,
  account_id TEXT REFERENCES accounts(id),
  spec       JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow the service role to read/write all tables
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Service role full access" ON accounts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Service role full access" ON briefs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Service role full access" ON sites FOR ALL USING (true) WITH CHECK (true);
`;

console.log(sql);

// Try running via rpc if available, otherwise just print
try {
  const { error } = await supabase.rpc("exec_sql", { query: sql });
  if (error) {
    console.log("Could not run SQL automatically (this is normal).");
    console.log("Copy the SQL above and paste it into your Supabase SQL Editor.");
  } else {
    console.log("Tables created successfully!");
  }
} catch {
  console.log("Copy the SQL above and paste it into your Supabase SQL Editor.");
  console.log("Dashboard: https://supabase.com/dashboard → your project → SQL Editor");
}

console.log("\nThen add to .env.local and Vercel:");
console.log("  SUPABASE_URL=" + url);
console.log("  SUPABASE_SERVICE_KEY=<your service role key>");
console.log("  SESSION_SECRET=<random 32+ char string>");
