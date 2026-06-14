"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { HeartPulse, Menu, X } from "lucide-react";
import { UserInfo } from "@/types/user.types";
import UserDropdown from "@/components/modules/Dashboord/UserDropdown";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

interface PublicNavbarProps {
  userInfo: UserInfo | null;
}

export default function PublicNavbar({ userInfo }: PublicNavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Consultation", href: "/consultation" },
    { label: "Diagnostics", href: "/diagnostics" },
    { label: "Health Plans", href: "/health-plans" },
    { label: "Medicine", href: "/medicine" },
    { label: "NGOs", href: "/ngos" },
  ];

  const dashboardRoute = userInfo ? getDefaultDashboardRoute(userInfo.role) : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <HeartPulse className="h-6 w-6 text-primary animate-pulse" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PH HealthCare
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons / User Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {userInfo ? (
            <div className="flex items-center gap-4">
              <Link href={dashboardRoute}>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  Dashboard
                </Button>
              </Link>
              <UserDropdown userInfo={userInfo} />
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          {userInfo && <UserDropdown userInfo={userInfo} />}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left flex items-center space-x-2">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">PH HealthCare</span>
              </SheetTitle>
              <SheetDescription className="text-left text-xs text-muted-foreground mt-1">
                Access healthcare services quickly and securely.
              </SheetDescription>
              <div className="flex flex-col gap-6 mt-8">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium transition-colors hover:text-primary ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="border-t pt-6 flex flex-col gap-3">
                  {userInfo ? (
                    <Link href={dashboardRoute} onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Go to Dashboard</Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Log in
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Sign up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
