import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  createSessionToken,
  hashPassword,
  looksLikeEmail,
  passwordProblem,
  rateLimit,
  sessionCookieOptions,
} from "@/lib/auth";
import { createAccount, newId } from "@/lib/store";

export const runtime = "nodejs";

function clientKey(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function POST(req: Request) {
  if (!rateLimit(`signup:${clientKey(req)}`)) {
    return NextResponse.json({ error: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!looksLikeEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const pwProblem = passwordProblem(password);
  if (pwProblem) return NextResponse.json({ error: pwProblem }, { status: 400 });

  try {
    const account = {
      id: newId(),
      email: email.toLowerCase(),
      name,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    const created = await createAccount(account);
    if (!created) {
      return NextResponse.json(
        { error: "That email already has an account. Try signing in instead.", code: "exists" },
        { status: 409 },
      );
    }

    const res = NextResponse.json({ id: account.id, email: account.email, name: account.name });
    res.cookies.set(SESSION_COOKIE, createSessionToken(account.id), sessionCookieOptions());
    return res;
  } catch (error) {
    if (error instanceof Error && /SESSION_SECRET/.test(error.message)) {
      console.error(error.message);
      return NextResponse.json({ error: "Accounts are not configured yet." }, { status: 503 });
    }
    // Always log the real cause; surface it outside production so a
    // failure is diagnosable instead of just "something went wrong".
    console.error("signup failed:", error);
    const code = (error as NodeJS.ErrnoException)?.code;
    const detail =
      process.env.NODE_ENV === "production"
        ? undefined
        : `${code ? code + ": " : ""}${error instanceof Error ? error.message : String(error)}`;
    return NextResponse.json(
      { error: "Could not create your account.", code, detail },
      { status: 500 },
    );
  }
}
