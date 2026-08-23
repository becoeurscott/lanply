import { NextResponse } from "next/server";
import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";

export const runtime = "nodejs";

/* Sessions are stateless signed tokens, so "logout" means clearing the
   cookie. A token copied elsewhere stays valid until it expires — which
   is why the lifetime is kept short rather than pretending to revoke. */

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}
