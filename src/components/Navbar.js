"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Places", href: "/places" },
  { label: "Experiences", href: "/experiences" },
  { label: "Hotels", href: "/hotels" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleMenuAction = (key) => {
    if (key === "signout") {
      signOut();
      return;
    }
    router.push(String(key));
  };

  const roleLinks = [];
  if (user?.role === "admin") roleLinks.push({ label: "Admin Panel", href: "/admin" });
  if (user?.role === "manager") roleLinks.push({ label: "Manager Panel", href: "/manager" });

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/80 backdrop-blur-xl">
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-teal-500" />
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-emerald-700"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {isPending ? (
            <div className="size-8 animate-pulse rounded-full bg-emerald-100" />
          ) : user ? (
            <>
              <Dropdown>
                <Dropdown.Trigger
                  aria-label="Account menu"
                  className="outline-none"
                >
                  <Avatar
                    className="ring-2 ring-emerald-500/40 transition-transform hover:scale-105"
                    name={user.name || "User"}
                    src={`${user.image}`}
                  >
                    <Avatar.Fallback delayMs={400}>
                      {(user.name || "U").charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="flex items-center gap-3 px-3 pb-1 pt-3">
                    <Avatar size="sm" name={user.name || "User"}>
                      <Avatar.Fallback delayMs={400}>
                        {(user.name || "U").charAt(0).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="max-w-[180px] truncate text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="max-w-[180px] truncate text-xs text-muted">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Dropdown.Menu onAction={handleMenuAction}>
                    <Dropdown.Item id="/profile" textValue="Profile">
                      <Label className="text-emerald-700">My Profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="/dashboard" textValue="Dashboard">
                      <Label>My Dashboard</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="/experiences/new" textValue="Share experience">
                      <Label>Share Experience</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="/bookings" textValue="My bookings">
                      <Label>My Bookings</Label>
                    </Dropdown.Item>
                    {roleLinks.map((l) => (
                      <Dropdown.Item key={l.href} id={l.href} textValue={l.label}>
                        <Label className="text-emerald-700">{l.label}</Label>
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      id="signout"
                      textValue="Sign out"
                      variant="danger"
                    >
                      <Label>Sign Out</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => router.push("/login")}
              >
                Sign In
              </Button>
              <Button
                size="sm"
                onPress={() => router.push("/signup")}
                className="bg-gradient-to-r from-emerald-500 to-emerald-700 font-semibold text-white shadow-md shadow-emerald-500/30"
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-xl text-emerald-800 transition-colors hover:bg-emerald-50 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-emerald-100 bg-white/95 px-4 pb-5 pt-3 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(link.href)
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-emerald-50"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="size-1.5 rounded-full bg-emerald-600" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-2 border-t border-emerald-100 pt-4">
            {user ? (
              <>
                <Button
                  variant="soft"
                  size="sm"
                  className="flex-1"
                  onPress={() => {
                    setMenuOpen(false);
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  size="sm"
                  variant="bordered"
                  className="flex-1"
                  onPress={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onPress={() => {
                    setMenuOpen(false);
                    router.push("/login");
                  }}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-700 font-semibold text-white"
                  onPress={() => {
                    setMenuOpen(false);
                    router.push("/signup");
                  }}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}