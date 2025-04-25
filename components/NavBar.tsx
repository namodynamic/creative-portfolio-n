"use client";

import { useState, useEffect } from "react";
import { type Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 mx-auto my-4 flex max-w-7xl items-center justify-between py-2  transition-all duration-300 max-md:px-4 md:rounded-xl",
        scrolled
          ? "bg-black-100/50 bg-opacity-80 backdrop-blur-md md:px-2 md:shadow-lg"
          : "bg-transparent md:bg-black-100 md:backdrop-blur-sm",
      )}
    >
      {/* Logo */}
      <Link href="/" aria-label="Home page" className="z-50 flex items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-white bg-black-100 text-xl font-bold text-white"
        >
          NE
        </motion.div>
      </Link>

      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
            }
            className="h-0.5 w-6 bg-white transition-all"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6 bg-white transition-all"
          />
          <motion.span
            animate={
              mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="h-0.5 w-6 bg-white transition-all"
          />
        </button>
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
                    "text-md relative px-4 py-2 font-medium text-white/90 transition-colors hover:text-white",
                    pathname.includes(asLink(link) as string)
                      ? "text-white"
                      : "",
                  )}
                  aria-current={
                    pathname.includes(asLink(link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {label}
                  {/* <span className={cn("absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full",
                    pathname.includes(asLink(link) as string) ? "w-full" : "w-0",
                  )}/> */}

                  {pathname.includes(asLink(link) as string) && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 bg-white"
                    />
                  )}
                </PrismicNextLink>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-md font-thin text-white/50"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>

          <PrismicNextLink
            field={settings.data.cta_link}
            className="ml-4 flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-all hover:bg-opacity-90"
          >
            {settings.data.cta_label}
            <Send className="ml-1 h-3 w-3" />
          </PrismicNextLink>
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
            "absolute left-0 top-0 z-40 w-full overflow-hidden bg-black-100/90 backdrop-blur-md",
            mobileMenuOpen ? "flex" : "hidden",
          )}
        >
          <div className="flex w-full flex-col items-center justify-center gap-6 p-8 pt-20">
            <ul className="flex w-full flex-col items-center gap-4">
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
                      "block w-full py-2 text-lg font-medium text-white/90 transition-colors hover:text-white",
                      pathname.includes(asLink(link) as string)
                        ? "text-white"
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
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <PrismicNextLink
                field={settings.data.cta_link}
                className="flex items-center justify-center gap-1 rounded-lg bg-white px-6 py-2 text-navy-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {settings.data.cta_label}
                <Send className="ml-1 h-4 w-4" />
              </PrismicNextLink>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
