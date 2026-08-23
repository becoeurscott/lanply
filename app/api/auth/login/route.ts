import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  looksLikeEmail,
  rateLimit,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { findAccountByEmail } from "@/lib/store";

export const runtime = "nodejs";

function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function POST(req: Request) {
  if (!rateLimit(`login:${clientKey(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!looksLikeEmail(email) || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  try {
    const account = await findAccountByEmail(email);

    // Same message and roughly the same work either way, so the response
    // does not reveal which emails are registered.
    const ok = account ? await verifyPassword(password, account.passwordHash) : false;
    if (!account || !ok) {
      return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
    }

    const res = NextResponse.json({ id: account.id, email: account.email, name: account.name });
    res.cookies.set(SESSION_COOKIE, createSessionToken(account.id), sessionCookieOptions());
    return res;
  } catch (error) {
    if (error instanceof Error && /SESSION_SECRET/.test(error.message)) {
      console.error(error.message);
      return NextResponse.json({ error: "Accounts are not configured yet." }, { status: 503 });
    }
    console.error("login failed", error);
    return NextResponse.json({ error: "Could not sign you in." }, { status: 500 });
  }
}
