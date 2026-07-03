import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import Link from "next/link";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

const secondaryLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQs" },
];

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const socialLinks = [
    {
      field: settings.data.github_link,
      label: "GitHub",
      icon: IconBrandGithub,
    },
    {
      field: settings.data.linkedin_link,
      label: "LinkedIn",
      icon: IconBrandLinkedin,
    },
    {
      field: settings.data.twitter_link,
      label: "X",
      icon: IconBrandX,
    },
  ];

  return (
    <footer className="border-border/70 w-full border-t">
      <Bounded as="section" className="py-10 md:py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="flex flex-col gap-5">
              <div className="border-primary/70 flex flex-col gap-1 border-l-2 pl-4">
                <h2 className="text-foreground text-2xl font-semibold">
                  {settings.data.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {settings.data.role}
                </p>
              </div>
              <p className="text-muted-foreground max-w-sm text-sm leading-6">
                {settings.data.bio}
              </p>

              <div className="flex items-center gap-2">
                {socialLinks.map(({ field, label, icon: Icon }) =>
                  isFilled.link(field) ? (
                    <Button
                      key={label}
                      asChild
                      variant="outline"
                      size="icon-sm"
                      aria-label={`${settings.data.name} on ${label}`}
                    >
                      <PrismicNextLink field={field}>
                        <Icon />
                        <span className="sr-only">{label}</span>
                      </PrismicNextLink>
                    </Button>
                  ) : null,
                )}
              </div>
            </div>

            <nav
              className="navigation grid grid-cols-2 gap-8 text-sm"
              aria-label="Footer Navigation"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-foreground text-base font-semibold">
                  Quick Links
                </h3>
                <ul className="text-muted-foreground flex flex-col gap-3">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-foreground transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  {settings.data.nav_item.map(({ link, label }) => (
                    <li key={label}>
                      <PrismicNextLink
                        className="hover:text-foreground transition-colors"
                        field={link}
                      >
                        {label}
                      </PrismicNextLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <ul className="text-muted-foreground flex flex-col gap-3">
                  {secondaryLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="hover:text-foreground transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="flex flex-col gap-5">
              <h3 className="text-foreground text-base font-semibold">
                {settings.data.footer_cta_heading}
              </h3>
              <p className="text-muted-foreground text-sm leading-6">
                {settings.data.footer_cta_text}
              </p>
              <Button asChild className="w-fit">
                <Link href="/contact">
                  {settings.data.footer_cta_button_text}
                  <IconArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <p className="text-muted-foreground text-xs leading-5">
                {settings.data.footer_cta_secondary_text}
              </p>
            </div>
          </div>

          <div className="border-border/70 text-muted-foreground flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {settings.data.name}. All rights
              reserved.
            </p>
            <p>{settings.data.footer_bottom_note}</p>
          </div>
        </div>
      </Bounded>
    </footer>
  );
}
