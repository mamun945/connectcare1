
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HeartHandshake,
  Menu,
  X,
  CalendarDays,
  LogIn,
  LogOut,
  User,
  PlusCircle,
  ClipboardList,
  CalendarCheck,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/app/lib/auth-client";
import { Spinner } from "./ui/spinner";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as unknown as {
    user?: {
      name?: string | null;
      image?: string | null;
      email?: string | null;
    };
  } | null)?.user;

  const [isOpen, setIsOpen] = useState(false);

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner className="text-xl" />
      </div>
    );
  }

  // Logout
  const handleSignOut = async () => {
    await authClient.signOut({});
    setIsOpen(false);
    router.push("/login");
  };

  // User Avatar
  const UserAvatar = () => (
    <Avatar className="h-10 w-10 border border-emerald-100">
      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
      <AvatarFallback className="bg-emerald-100 font-bold text-emerald-700">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );

  // Profile Menu Items
  const menuItems = [
    {
      title: "Create Event",
      href: "/add-events",
      icon: PlusCircle,
    },
    {
      title: "Manage Events",
      href: "/manage-events",
      icon: ClipboardList,
    },
    {
      title: "Joined Events",
      href: "/joineventpage",
      icon: CalendarCheck,
    },
    {
      title: "My Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <HeartHandshake size={24} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Care<span className="text-emerald-600">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <Link
            href="/upcomingevents"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <CalendarDays size={18} />
            Upcoming Events
          </Link>
        </div>

        {/* Desktop Profile / Login */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
              <Popover>

                {/* Profile Trigger */}
                <PopoverTrigger
                  render={
                    <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-emerald-300 hover:bg-emerald-50">
                      {/* <UserAvatar /> */}

                      <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                        {user?.name}
                      </span>

                      <ChevronDown size={16} className="text-slate-500" />
                    </button>
                  }
                />

                {/* Dropdown Content */}
                <PopoverContent align="end" className="w-72 p-2">

                  {/* User Information */}
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                    {
                      UserAvatar()
                    }
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-slate-800">
                        {user?.name}
                      </h3>

                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <div className="mt-2 space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <Icon size={18} />
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout */}
                  <div className="mt-2 border-t border-slate-100 pt-2">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>

                </PopoverContent>
              </Popover>

              <div className=" ">
                <Button
                  onClick={handleSignOut}
                  className="w-full rounded-lg bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                  <LogOut size={17} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>

          ) : (
            <Button className="rounded-lg bg-emerald-600 px-5 font-semibold text-white hover:bg-emerald-700">
              <Link href="/login" className="flex items-center gap-1">
                <LogIn size={17} className="mr-2" />
                Login
              </Link>
            </Button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg md:hidden">

          <div className="flex flex-col gap-3">

            {/* Upcoming Events */}
            <Link
              href="/events"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <CalendarDays size={19} />
              Upcoming Events
            </Link>

            {/* Mobile User Profile */}
            {user ? (
              <div className="rounded-xl border border-slate-200 bg-white p-3">

                {/* User Information */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  {/* <UserAvatar /> */}
                   {UserAvatar()}
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-slate-800">
                      {user?.name}
                    </h3>

                    <p className="truncate text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="mt-2 flex flex-col gap-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Icon size={18} />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Logout */}
                <div className="mt-2 border-t border-slate-100 pt-3">
                  <Button
                    onClick={handleSignOut}
                    className="w-full rounded-lg bg-red-600 font-semibold text-white hover:bg-red-700"
                  >
                    <LogOut size={17} className="mr-2" />
                    Logout
                  </Button>
                </div>

              </div>
            ) : (
              <Button className="w-full rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center"
                >
                  <LogIn size={17} className="mr-2" />
                  Login
                </Link>
              </Button>
            )}

          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
