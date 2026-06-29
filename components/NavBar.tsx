"use client";

import { useEffect, useState } from "react";
import { type Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { IconMenu2, IconSend2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";
import NameLogo from "./Namelogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveLink = (href: string | null | undefined) => {
    if (!href) {
      return false;
    }

    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-4"
    >
      <div
        className={cn(
          "border-border/60 mx-auto flex h-14 w-full max-w-7xl min-w-0 items-center justify-between gap-3 rounded-2xl border px-3 transition-all duration-300 sm:px-4",
          scrolled || mobileMenuOpen
            ? "bg-background/90 shadow-sm shadow-black/5 backdrop-blur-xl"
            : "bg-background/60 backdrop-blur-md",
        )}
      >
        <NameLogo
          name={settings.data.name_logo || ""}
          photoUrl={settings.data.logo.url || ""}
          href="/"
        />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {settings.data.nav_item.map(({ link, label }) => {
            const href = asLink(link);
            const isActive = isActiveLink(href);

            return (
              <PrismicNextLink
                key={label}
                field={link}
                className={cn(
                  "text-muted-foreground hover:text-foreground hover:bg-muted/70 inline-flex h-7 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                  isActive && "bg-muted text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </PrismicNextLink>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle variant="icon" />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <PrismicNextLink field={settings.data.cta_link}>
              {settings.data.cta_label}
              <IconSend2 data-icon="inline-end" />
            </PrismicNextLink>
          </Button>

          <DropdownMenu
            modal={false}
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              id="mobile-navigation"
              align="end"
              sideOffset={8}
              collisionPadding={12}
              className="animate-in border-border/60 bg-background/95 fade-in slide-in-from-top-2 mt-2 w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] rounded-2xl p-3 shadow-lg shadow-black/5 backdrop-blur-xl sm:w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] md:hidden"
              onCloseAutoFocus={(event) => event.preventDefault()}
            >
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1">
                  {settings.data.nav_item.map(({ link, label }) => {
                    const href = asLink(link);
                    const isActive = isActiveLink(href);

                    return (
                      <li key={label}>
                        <PrismicNextLink
                          field={link}
                          className={cn(
                            "text-muted-foreground hover:text-foreground hover:bg-muted flex h-9 items-center rounded-xl px-3 text-base font-medium transition-colors",
                            isActive && "bg-muted text-foreground",
                          )}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                        </PrismicNextLink>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-border mt-3 flex items-center justify-between border-t pt-3">
                  <div className="text-muted-foreground flex flex-col">
                    <span className="text-foreground text-sm font-medium">
                      Appearance
                    </span>
                    <span className="text-xs">
                      Switch between light and dark.
                    </span>
                  </div>
                  <ThemeToggle variant="slider" />
                </div>

                <Button asChild className="mt-3 w-full">
                  <PrismicNextLink
                    field={settings.data.cta_link}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {settings.data.cta_label}
                    <IconSend2 data-icon="inline-end" />
                  </PrismicNextLink>
                </Button>
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
