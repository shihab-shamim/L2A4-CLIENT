import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service/user.service";

type Role = "ADMIN" | "STUDENT" | "TUTOR";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin-dashboard") ||
    pathname.startsWith("/tutor-dashboard");

  if (!isDashboardPath) return NextResponse.next();

  let isAuthenticated = false;
  let role: Role | "" = "";

  const { data } = await userService.getSession();

  if (data?.user?.role) {
    isAuthenticated = true;
    role = data.user.role as Role;
  }


  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  const roleDashboards: Record<Role, string> = {
    ADMIN: "/admin-dashboard",
    STUDENT: "/dashboard",
    TUTOR: "/tutor-dashboard",
  };

 
  if (!role || !(role in roleDashboards)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const allowedBase = roleDashboards[role];

  // ✅ If user tries to access any other dashboard base => redirect to own
  const tryingOtherDashboard =
    (pathname.startsWith("/dashboard") && allowedBase !== "/dashboard") ||
    (pathname.startsWith("/admin-dashboard") && allowedBase !== "/admin-dashboard") ||
    (pathname.startsWith("/tutor-dashboard") && allowedBase !== "/tutor-dashboard");

  if (tryingOtherDashboard) {
    return NextResponse.redirect(new URL(allowedBase, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
  ],
};
