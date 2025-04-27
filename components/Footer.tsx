import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <footer className="mt-12 w-full  border-t border-blue-200 bg-black/20 shadow-2xl shadow-white/70">
      <Bounded as="section">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Left Column - About */}
            <div className="z-20 space-y-6">
              <div className="items-center border-l-4 border-purple2 pl-3">
                <h2 className="text-2xl font-bold text-slate-300">
                  {settings.data.name}
                </h2>
                <p className="text-gray-400">{settings.data.role}</p>
              </div>
              <p className="text-sm text-gray-400">
                {settings.data.footer_text}
              </p>

              <div className="flex gap-4">
                {isFilled.link(settings.data.github_link) && (
                  <PrismicNextLink
                    field={settings.data.github_link || ""}
                    className="text-gray-400 transition-colors hover:text-white "
                    aria-label={settings.data.name + " on GitHub"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={20} />
                    <span className="sr-only">GitHub</span>
                  </PrismicNextLink>
                )}

                {isFilled.link(settings.data.linkedin_link) && (
                  <PrismicNextLink
                    field={settings.data.linkedin_link}
                    className="text-gray-400 transition-colors hover:text-white "
                    aria-label={settings.data.name + " on LinkedIn"}
                  >
                    <FaLinkedin size={20} />
                    <span className="sr-only">LinkedIn</span>
                  </PrismicNextLink>
                )}
                {isFilled.link(settings.data.twitter_link) && (
                  <PrismicNextLink
                    field={settings.data.twitter_link}
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label={settings.data.name + " on Twitter"}
                  >
                    <FaXTwitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </PrismicNextLink>
                )}
              </div>
            </div>

            {/* Middle Column - Quick Links */}
            <nav
              className="navigation grid grid-cols-2 gap-8"
              aria-label="Footer Navigation"
            >
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Home
                    </Link>
                  </li>
                  {settings.data.nav_item.map(({ link, label }, index) => (
                    <React.Fragment key={label}>
                      <li>
                        <PrismicNextLink
                          className="text-gray-400 transition-colors hover:text-white"
                          field={link}
                        >
                          {label}
                        </PrismicNextLink>
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              <div className="space-y-3 pt-[42px]">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Right Column - CTA */}
            <div className="relative space-y-6">
              <h3 className="text-lg font-semibold text-white">
                Let&apos;s Work Together
              </h3>
              <p className="text-sm text-gray-400">
                {settings.data.footer_cta_text}
              </p>
              <div className="relative z-20 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded bg-purple px-6 py-3 font-medium text-white transition-all hover:bg-purple2"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-0 mt-12 border-t border-blue-200/80 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {settings.data.name}. All rights
            reserved.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-10">
          <img src="/bg.png" alt="background" />
        </div>
        <div className="absolute bottom-0 right-0 z-10 max-md:hidden">
          <img src="/bg.png" alt="background" />
        </div>
      </Bounded>
    </footer>
  );
}
