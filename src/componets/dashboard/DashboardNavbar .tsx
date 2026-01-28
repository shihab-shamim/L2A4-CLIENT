// app/dashboard/components/DashboardNavbar.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export type UserRole = "STUDENT" | "TUTOR" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;

  image: string | null;
  phone: string | null;

  role: UserRole;
  status: UserStatus;

  createdAt: string | Date;
  updatedAt: string | Date;

  // optional extra fields (if you have them in session)
  avatarUrl?: string | null;
  bio?: string | null;
}

const navLinks: Record<UserRole, { label: string; href: string }[]> = {
  STUDENT: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Bookings", href: "/dashboard/bookings" },
    { label: "Profile", href: "/dashboard/profile" },
  ],
  TUTOR: [
    { label: "Dashboard", href: "/tutor-dashboard" },
    { label: "Availability", href: "/tutor/availability" },
    { label: "Profile", href: "/tutor-dashboard/profile" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Users", href: "/admin-dashboard/users" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Categories", href: "/admin/categories" },
  ],
};

const isUserRole = (v: unknown): v is UserRole =>
  v === "STUDENT" || v === "TUTOR" || v === "ADMIN";

/** remove trailing slash except "/" */
const normalize = (p: string) => (p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p);

/**
 * ✅ Fix: choose the "best/longest match" so
 * /admin-dashboard/users will NOT also activate /admin-dashboard
 */
const getActiveHref = (pathname: string, links: { href: string }[]) => {
  const path = normalize(pathname);

  // 1) exact match first
  const exact = links.find((l) => normalize(l.href) === path);
  if (exact) return exact.href;

  // 2) otherwise, longest prefix match
  const candidates = links
    .filter((l) => {
      const href = normalize(l.href);
      if (href === "/") return path === "/";
      return path.startsWith(href + "/");
    })
    .sort((a, b) => normalize(b.href).length - normalize(a.href).length);

  return candidates[0]?.href ?? null;
};

/** ✅ Declare outside render (prevents "components during render" error) */
function NavItems({
  links,
  pathname,
  onNavigate,
}: {
  links: { label: string; href: string }[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const activeHref = getActiveHref(pathname, links);

  return (
    <nav className="space-y-1">
      {links.map((link) => {
        const active = activeHref === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={[
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
              active ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100",
            ].join(" ")}
          >
            <span>{link.label}</span>
            {active ? <span className="h-2 w-2 rounded-full bg-white/90" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

const DashboardNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data, isPending } = authClient.useSession();
  const user = (data?.user ?? null) as User | null;

  const role: UserRole = useMemo(() => {
    if (isUserRole(user?.role)) return user!.role;
    return "STUDENT";
  }, [user?.role]);

  const links = navLinks[role];

  return (
    <>
      {/* ✅ Mobile Topbar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
        {/* <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
            SB
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">SkillBridge</div>
            <div className="text-xs text-gray-500">{isPending ? "Loading..." : role}</div>
          </div>
        </div> */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden md:h-full flex-col p-5 lg:flex">
        {/* Brand */}
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-bold text-white">
            SB
          </div>

          <div className="min-w-0">
            <div className="text-base font-bold text-gray-900">SkillBridge</div>
            <div className="truncate text-xs text-gray-500">
              {isPending ? "Loading..." : user?.email ?? role}
            </div>
          </div>
        </div>

        {/* Role badge */}
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          {role}
        </div>

        {/* Nav */}
        <NavItems links={links} pathname={pathname} />

        {/* Footer */}
        <div className="mt-auto border-t pt-4">
          <Link
            href="/"
            className="block w-full rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Home
          </Link>
        </div>
      </aside>

      {/* ✅ Mobile Drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />

          {/* panel */}
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white">
                  SB
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-gray-900">SkillBridge</div>
                  <div className="text-xs text-gray-500">{role}</div>
                </div>
              </div>

              <button
                className="rounded-lg border px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4 rounded-xl border bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-900">
                  {isPending ? "Loading..." : user?.name ?? "User"}
                </div>
                <div className="text-xs text-gray-500">{user?.email ?? ""}</div>
              </div>

              <NavItems links={links} pathname={pathname} onNavigate={() => setOpen(false)} />

              <div className="mt-6 border-t pt-4">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DashboardNavbar;
