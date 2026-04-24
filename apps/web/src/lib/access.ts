import { routeByRole } from "@plataforma/config";
import type { PlatformRole } from "@plataforma/contracts";

export const protectedRouteRules: Array<{ prefix: string; allowedRoles: PlatformRole[] }> = [
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

export function getDefaultRouteForRole(role: PlatformRole) {
  return routeByRole[role];
}

export function isRouteAllowedForRole(role: PlatformRole, pathname: string) {
  const rule = protectedRouteRules.find(
    (entry) => pathname === entry.prefix || pathname.startsWith(`${entry.prefix}/`)
  );

  if (!rule) {
    return true;
  }

  return rule.allowedRoles.includes(role);
}
