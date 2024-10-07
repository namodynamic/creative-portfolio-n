"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Content, KeyTextField, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Button from "./Button";
import { usePathname } from "next/navigation";
import { FloatingNav } from "./ui/FloatingNavbar";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Check the initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="">
      <ul
        className={clsx(
          "flex flex-col justify-between  rounded-b-lg  px-4  py-2 md:m-4 md:flex-row md:items-center md:rounded-xl",
        )}
        style={
          isDesktop
            ? {
                backdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(17, 25, 40, 0.75)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.125)",
              }
            : {}
        }
      >
        <NameLogo name={settings.data.name} />

        <FloatingNav settings={settings} />
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="hidden rounded-2xl border-2 border-[#0e0b38] bg-[#0e0b38]/80  shadow-xl md:block"
    >
      <p className=" rounded-xl border-2 border-white p-1 text-2xl font-extrabold tracking-tighter text-slate-300">
        NE
      </p>
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 py-0 md:flex">
      {settings.data.nav_item.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <PrismicNextLink
              className={clsx(
                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-300 hover:text-white",
              )}
              field={link}
              aria-current={
                pathname.includes(asLink(link) as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-purple transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(asLink(link) as string)
                    ? "translate-y-6"
                    : "translate-y-8",
                )}
              />
              <span className="relative">{label}</span>
            </PrismicNextLink>
          </li>
          {index < settings.data.nav_item.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}
