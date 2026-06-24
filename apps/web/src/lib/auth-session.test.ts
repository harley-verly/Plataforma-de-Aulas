import { describe, expect, it } from "vitest";

import { canAccessAdmin, normalizeRole } from "./auth-session";

describe("auth session access rules", () => {
  it("blocks admin routes when there is no session", () => {
    expect(canAccessAdmin(null)).toBe(false);
  });

  it("allows platform administrators and super admins into admin routes", () => {
    expect(canAccessAdmin({ role: "platform_admin" })).toBe(true);
    expect(canAccessAdmin({ role: "super_admin" })).toBe(true);
  });

  it("blocks student, producer, affiliate and support roles from admin routes", () => {
    expect(canAccessAdmin({ role: "student" })).toBe(false);
    expect(canAccessAdmin({ role: "producer" })).toBe(false);
    expect(canAccessAdmin({ role: "affiliate" })).toBe(false);
    expect(canAccessAdmin({ role: "support" })).toBe(false);
  });

  it("normalizes API role casing before access checks", () => {
    expect(normalizeRole("PLATFORM_ADMIN")).toBe("platform_admin");
    expect(normalizeRole("SUPER_ADMIN")).toBe("super_admin");
  });
});
