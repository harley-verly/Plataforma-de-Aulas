import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import type { PlatformRole } from "@plataforma/contracts";

import { useDemoSession } from "@/hooks/use-demo-session";
import { getDefaultRouteForRole, isRouteAllowedForRole } from "@/lib/access";

export const ProtectedRoute = ({
  allowedRoles,
  children
}: {
  allowedRoles: PlatformRole[];
  children: ReactNode;
}) => {
  const session = useDemoSession();
  const location = useLocation();

  if (!session) {
    const redirectTarget = `${location.pathname}${location.search}`;
    return <Navigate replace to={`/login?redirect=${encodeURIComponent(redirectTarget)}`} />;
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate replace to={getDefaultRouteForRole(session.role)} />;
  }

  return <>{children}</>;
};

export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const session = useDemoSession();
  const location = useLocation();
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirectTarget = redirectParam?.startsWith("/") ? redirectParam : null;

  if (!session) {
    return <>{children}</>;
  }

  if (redirectTarget && isRouteAllowedForRole(session.role, redirectTarget)) {
    return <Navigate replace to={redirectTarget} />;
  }

  return <Navigate replace to={getDefaultRouteForRole(session.role)} />;
};
