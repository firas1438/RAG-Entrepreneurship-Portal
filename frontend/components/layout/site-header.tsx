"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-zinc-300 bg-white">
      <div className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-8 py-1.5 text-xs sm:px-6 xl:px-0">
          <p className="flex flex-wrap items-center gap-x-2">
            <span className="font-normal">{site.republic}</span>
            <span className="hidden text-zinc-400 sm:inline" aria-hidden>
              |
            </span>
            <span className="font-medium" lang="ar" dir="rtl">
              {site.republicAr}
            </span>
          </p>
          <p className="hidden text-zinc-300 sm:block">{site.agency}</p>
        </div>
      </div>

      <div className="h-1 bg-primary" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-4 sm:px-6 xl:px-0">
        <Link href="/" className="flex items-center no-underline">
          <Image
            src="/logo.png"
            alt="Foundry"
            width={220}
            height={48}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-zinc-800 no-underline hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className="rounded-xs bg-primary px-6 py-5 text-sm font-semibold text-white shadow-xs hover:bg-primary/90">
            <Link href="/services">Commencer</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu />
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 rounded-none">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="Menu mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-base text-zinc-800 no-underline hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-2 px-4">
              <Button asChild className="w-full rounded-xs bg-primary py-5 text-sm font-semibold text-white hover:bg-primary/90">
                <Link href="/services" onClick={() => setOpen(false)}>
                  Commencer
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
