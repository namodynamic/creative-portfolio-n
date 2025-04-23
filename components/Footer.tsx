import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { KeyTextField } from "@prismicio/client";

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="rounded-2xl border-2 border-[#0e0b38] bg-[#0e0b38]/80  shadow-xl md:hidden"
    >
      <p className=" rounded-xl border-2 border-white p-1 text-xl font-extrabold tracking-tighter text-slate-300">
        NE
      </p>
    </Link>
  );
}

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 sm:mt-10 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-2 gap-y-2 sm:flex-row sm:justify-self-start">
          <NameLogo name={settings.data.name} />

          <p className=" text-sm text-slate-300 ">
            Copyright © {new Date().getFullYear()}{" "}
            <strong>{settings.data.name}</strong>{" "}
          </p>
        </div>
        <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {settings.data.nav_item.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <PrismicNextLink
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:text-slate-300",
                    )}
                    field={link}
                  >
                    {label}
                  </PrismicNextLink>
                </li>
                {index < settings.data.nav_item.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div className="socials inline-flex justify-center sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:text-white "
              aria-label={settings.data.name + " on GitHub"}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.twitter_link) && (
            <PrismicNextLink
              field={settings.data.twitter_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:text-white"
              aria-label={settings.data.name + " on Twitter"}
            >
              <FaXTwitter />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:text-white "
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-10">
        <img src="/bg.png" alt="background" />
      </div>
    </Bounded>
  );
}
