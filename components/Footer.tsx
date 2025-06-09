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
    <footer className="mt-12 w-full border-t-[0.5px] border-blue-200 dark:border-blue-200/80">
      <Bounded as="section">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Left Column */}
            <div className="z-20 space-y-6">
              <div className="items-center border-l-4 border-purple-800 pl-3">
                <h2 className="text-2xl font-bold text-black-100 dark:text-white-50">
                  {settings.data.name}
                </h2>
                <p className="dark:text-gray-400">{settings.data.role}</p>
              </div>
              <p className="text-sm dark:text-gray-400">
                {settings.data.footer_text}
              </p>

              <div className="flex gap-4">
                {isFilled.link(settings.data.github_link) && (
                  <PrismicNextLink
                    field={settings.data.github_link || ""}
                    className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white "
                    aria-label={settings.data.name + " on GitHub"}
                  >
                    <FaGithub size={20} />
                    <span className="sr-only">GitHub</span>
                  </PrismicNextLink>
                )}

                {isFilled.link(settings.data.linkedin_link) && (
                  <PrismicNextLink
                    field={settings.data.linkedin_link}
                    className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white "
                    aria-label={settings.data.name + " on LinkedIn"}
                  >
                    <FaLinkedin size={20} />
                    <span className="sr-only">LinkedIn</span>
                  </PrismicNextLink>
                )}
                {isFilled.link(settings.data.twitter_link) && (
                  <PrismicNextLink
                    field={settings.data.twitter_link}
                    className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
                    aria-label={settings.data.name + " on Twitter"}
                  >
                    <FaXTwitter size={20} />
                    <span className="sr-only">Twitter</span>
                  </PrismicNextLink>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <nav
              className="navigation grid grid-cols-2 gap-8"
              aria-label="Footer Navigation"
            >
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-black-100 dark:text-white-50">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
                    >
                      Home
                    </Link>
                  </li>
                  {settings.data.nav_item.map(({ link, label }, index) => (
                    <React.Fragment key={label}>
                      <li>
                        <PrismicNextLink
                          className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
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
                      className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="transition-colors hover:text-black/50 dark:text-gray-400 dark:hover:text-white"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* CTA */}
            <div className="relative space-y-6">
              <h3 className="text-lg font-semibold text-black-100 dark:text-white-50">
                Let&apos;s Work Together
              </h3>
              <p className="text-sm dark:text-gray-400">
                {settings.data.footer_cta_text}
              </p>
              <div className="relative z-20 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-lg bg-purple-800 px-6 py-3 font-medium text-white transition-all hover:bg-purple-600"
                >
                  Start a Project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-0 mt-12 border-t-[0.5px] border-blue-200/80 pt-6 text-center dark:border-white/[0.2]">
          <p className="text-sm dark:text-gray-400">
            &copy; {new Date().getFullYear()} {settings.data.name}. All rights
            reserved.
          </p>
        </div>
      </Bounded>
    </footer>
  );
}
