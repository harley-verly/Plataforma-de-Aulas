import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import type { PlatformRole } from "@plataforma/contracts";

import { DEMO_SESSION_COOKIE, parseDemoSession } from "./lib/demo-session";

const protectedRouteRules: Array<{ prefix: string; allowedRoles: PlatformRole[] }> = [
  {
    prefix: "/admin",
    allowedRoles: ["super_admin", "platform_admin", "support"]
  },
  {
    prefix: "/studio",
    allowedRoles: ["super_admin", "platform_admin", "producer"]
  },
  {
    prefix: "/affiliate",
    allowedRoles: ["super_admin", "platform_admin", "affiliate"]
  },
  {
    prefix: "/learning",
    allowedRoles: ["super_admin", "platform_admin", "support", "student"]
  }
];

function getProtectedRule(pathname: string) {
  return protectedRouteRules.find((rule) => pathname === rule.prefix || pathname.startsWith(`${rule.prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get(DEMO_SESSION_COOKIE)?.value;
  const session = parseDemoSession(sessionCookie ? decodeURIComponent(sessionCookie) : null);
  const protectedRule = getProtectedRule(pathname);

  if (pathname === "/login" && session) {
    return NextResponse.redirect(new URL(session.nextRoute || "/", request.url));
  }

  if (!protectedRule) {
    return NextResponse.next();
  }

  if (!session) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(redirectUrl);
  }

  if (!protectedRule.allowedRoles.includes(session.role)) {
    return NextResponse.redirect(new URL(session.nextRoute || "/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/studio/:path*", "/affiliate/:path*", "/learning/:path*", "/login"]
};
