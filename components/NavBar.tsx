"use client";

import { useState, useEffect } from "react";
import { type Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import { SendHorizonal, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "motion/react";
import NameLogo from "./Namelogo";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentScrollY > 20);

          if (mobileMenuOpen) {
            setShowNav(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
            setShowNav(false);
          } else {
            setShowNav(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check if mobile on mount and when window resizes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: showNav ? 0 : -100, opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 mx-auto my-4 flex max-w-7xl items-center justify-between px-4 py-2  transition-all duration-300 max-md:px-4 md:rounded-xl",
        scrolled
          ? "bg-white-50 bg-opacity-80 backdrop-blur-md dark:bg-black-100/50 md:shadow-lg"
          : "bg-transparent",
      )}
    >
      <NameLogo
        name={settings.data.name_logo || ""}
        photoUrl={settings.data.logo.url || ""}
        href="/"
      />

      {/* Mobile menu button */}
      {isMobile && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
              }
              className="h-0.5 w-6 bg-black-100 transition-all dark:bg-white"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-black-100 transition-all dark:bg-white"
            />
            <motion.span
              animate={
                mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              className="h-0.5 w-6 bg-black-100 transition-all dark:bg-white"
            />
          </button>
        </div>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav className="flex items-center gap-2">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <li key={`${label}-${index}`} className="group relative">
                <PrismicNextLink
                  field={link}
                  className={cn(
                    "text-md relative px-4 py-2 font-medium text-black-75 transition-colors dark:text-white/70 dark:hover:text-white",
                    pathname.includes(asLink(link) as string)
                      ? "text-black dark:text-white"
                      : "",
                  )}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {label}
                  <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-0 bg-purple-700 transition-all duration-300 group-hover:w-1/2" />
                  {pathname.includes(asLink(link) as string) && (
                    <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 bg-black-100 dark:bg-white" />
                  )}
                </PrismicNextLink>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-md font-thin dark:text-white/50"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="icon" />
            <PrismicNextLink
              field={settings.data.cta_link}
              className="group relative ml-4 flex w-fit items-center justify-center overflow-hidden rounded-lg bg-slate-50 px-4 py-2 text-sm  font-bold text-slate-800 transition-transform ease-out  hover:text-white"
            >
              <span
                className={cn(
                  "absolute inset-0 z-0 h-full translate-y-8 bg-purple-600 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                )}
              />
              <span className="relative flex items-center justify-center gap-2">
                {settings.data.cta_label}
                <SendHorizonal className="ml h-3 w-3" />
              </span>
            </PrismicNextLink>
          </div>
        </nav>
      )}

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: mobileMenuOpen ? 1 : 0,
            height: mobileMenuOpen ? "auto" : 0,
          }}
          className={cn(
            "absolute -top-4 left-0 z-40 w-full overflow-hidden bg-slate-300 transition-all duration-300 ease-in-out dark:bg-navy-900",
            mobileMenuOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex h-screen w-full flex-col items-center justify-center gap-6 p-8">
            <div className="absolute left-0 top-1/2 block h-[380px] w-[960px] -translate-y-1/2 translate-x-[-290px] rotate-90">
              <Image
                src="/bg-outlines.svg"
                width={900}
                height={380}
                alt="outline"
                className="z-2 relative"
              />
              <Image
                src="/bg-outlines-fill.png"
                width={900}
                height={380}
                alt="outline"
                className="absolute inset-0 opacity-5 mix-blend-soft-light invert dark:invert-0"
              />
            </div>
            <ul className="relative z-10  flex w-full flex-col items-center gap-4">
              {settings.data.nav_item.map(({ link, label }) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full text-center"
                >
                  <PrismicNextLink
                    field={link}
                    className={cn(
                      "block w-full py-2 text-xl font-semibold text-black-100 dark:text-white/90",
                      pathname.includes(asLink(link) as string)
                        ? "text-purple-500 dark:text-purple-500"
                        : "",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </PrismicNextLink>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-3 rounded-lg bg-black/10 p-4 dark:bg-white/10"
            >
              <span className="text-xl font-medium text-black-100 dark:text-white/90">
                Appearance
              </span>
              <ThemeToggle variant="slider" />
            </motion.div>

            <PrismicNextLink
              field={settings.data.cta_link}
              className="relative z-10 flex items-center justify-center gap-1 rounded-lg bg-black-50 dark:bg-white px-6 py-2 font-semibold text-white dark:text-navy-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {settings.data.cta_label}
              <Send className="ml-1 h-4 w-4" />
            </PrismicNextLink>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
