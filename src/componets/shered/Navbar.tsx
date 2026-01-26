"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

/* =====================
    Types
===================== */
type NavLink = {
  label: string;
  href: string;
};

/* =====================
    Component
===================== */
const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  
  // Next.js এর নিজস্ব হুক যা হাইড্রেশন এরর প্রতিরোধ করে
  const pathname = usePathname();

  const links: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Tutors", href: "/tutors" },
    { label: "Login", href: "/login" },
    { label: "Registration", href: "/registration" },
    { label: "Profile", href: "/profile" },
  ];

  // Active Link logic
  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  /* =====================
      Effects
  ===================== */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };

    const handleOutsideClick = (e: MouseEvent): void => {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  useEffect(() => {
    // মোবাইল মেনু ওপেন থাকলে বডি স্ক্রল বন্ধ রাখা
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =====================
      JSX
  ===================== */
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border font-bold">
            SB
          </div>
          <span className="text-lg font-semibold">SkillBridge</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive(link.href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden rounded-xl border px-4 py-2 text-sm font-semibold"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200" 
            onClick={() => setOpen(false)}
          />

          <div
            ref={menuRef}
            className="fixed right-0 top-0 z-50 h-full w-full bg-white shadow-xl animate-in slide-in-from-right duration-300"
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <span className="font-semibold text-lg">SkillBridge</span>
              <button
                className="rounded-xl border px-3 py-1 text-sm font-medium hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-2 p-4">
              {links.map((link: NavLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;