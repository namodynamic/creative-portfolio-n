"use client";

import type { ChangeEvent, FormEvent, JSX, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import Link from "next/link";
import { toast } from "sonner";
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconBriefcase,
  IconCheck,
  IconClock,
  IconLoader2,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconSend,
  IconShieldLock,
} from "@tabler/icons-react";

import Bounded from "@/components/Bounded";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/namodynamic",
    icon: IconBrandGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ekechinnamdi",
    icon: IconBrandLinkedin,
  },
  {
    label: "X",
    href: "https://x.com/namodynamic",
    icon: IconBrandX,
  },
];

type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

function getEmailJsErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  if (error && typeof error === "object") {
    const emailJsError = error as { status?: number; text?: string };
    const status = emailJsError.status ? `EmailJS ${emailJsError.status}` : "";
    const text = emailJsError.text ?? "";
    const message = [status, text].filter(Boolean).join(": ");

    if (message) {
      return message;
    }
  }

  return "Please try again or email me directly.";
}

function getPublicEmailJsErrorDescription(error: unknown) {
  const details = getEmailJsErrorDetails(error);
  const isEmailProviderAuthError =
    details.includes("Gmail_API") ||
    details.toLowerCase().includes("invalid grant") ||
    details.toLowerCase().includes("insufficient authentication scopes");

  if (isEmailProviderAuthError) {
    return "Email delivery is temporarily unavailable. Please email me directly instead.";
  }

  if (process.env.NODE_ENV !== "production") {
    return details;
  }

  return "Please try again or email me directly.";
}

function ContactDetail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof IconMail;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg border">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <h3 className="text-foreground text-sm font-medium">{label}</h3>
        <div className="text-muted-foreground mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}

const Contact = ({ slice }: ContactProps): JSX.Element => {
  const pageRef = useRef(null);
  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".heading-anim",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
        },
      );

      tl.fromTo(
        ".contact-card",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
        },
        "-=0.4",
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
      toast.error("Email service is not configured yet.");
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: emailjsPublicKey },
      );

      toast.success("Message sent", {
        description: "Thank you. I will get back to you shortly.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Message failed to send", {
        description: getPublicEmailJsErrorDescription(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Bounded
      as="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={pageRef}
      className="mt-10 py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="heading-anim">
            {slice.primary.heading}
          </Badge>
          <h1 className="heading-anim text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            {slice.primary.sub_heading}
          </h1>
          <p className="heading-anim text-muted-foreground text-base leading-7 md:text-lg">
            {slice.primary.description}
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <Card
            id="message"
            className="contact-card bg-opacity-80 scroll-mt-24"
          >
            <CardHeader className="gap-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">
                    {slice.primary.form_title}
                  </CardTitle>
                  <CardDescription>
                    {slice.primary.form_description}
                  </CardDescription>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {slice.primary.form_cta_text}
                  </p>
                </div>
                <div className="bg-muted text-muted-foreground hidden size-10 shrink-0 items-center justify-center rounded-lg border sm:flex">
                  <IconMessageCircle className="size-5" />
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8">
                  <Field>
                    <FieldLabel htmlFor="name" className="uppercase">
                      Name
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email" className="uppercase">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </Field>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="message" className="uppercase">
                        Project brief
                      </FieldLabel>
                      <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me what you are building, what is not working yet, and what a great outcome would look like."
                        className="min-h-40 resize-none"
                        required
                      />
                    </Field>

                    <Button type="submit" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <IconLoader2
                          data-icon="inline-start"
                          className="animate-spin"
                        />
                      ) : (
                        <IconSend data-icon="inline-start" />
                      )}
                      {isLoading ? "Sending" : "Send message"}
                    </Button>
                  </FieldGroup>
                </div>
              </form>

              <div className="text-muted-foreground mt-5 flex items-start gap-2 text-sm">
                <IconShieldLock className="mt-0.5 size-4 shrink-0" />
                <p>
                  Your information stays confidential and is only used to
                  respond to your message.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card size="sm" className="contact-card bg-opacity-80">
              <CardHeader>
                <CardTitle>Contact details</CardTitle>
                <CardDescription>
                  Best for project inquiries, collaborations, and technical
                  consulting.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <ContactDetail icon={IconMail} label="Email">
                  <a
                    href={`mailto:${slice.primary.contact_email}`}
                    className="hover:text-foreground wrap-break-word transition-colors"
                  >
                    {slice.primary.contact_email}
                  </a>
                </ContactDetail>

                <ContactDetail icon={IconMapPin} label="Location">
                  {slice.primary.location}
                </ContactDetail>

                <ContactDetail icon={IconClock} label="Response time">
                  Within 24 hours
                </ContactDetail>
              </CardContent>
            </Card>

            <Card size="sm" className="contact-card bg-opacity-80">
              <CardHeader>
                <CardTitle>Socials</CardTitle>
                <CardDescription>
                  Follow the work, writing, and shipped experiments.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                {contactLinks.map(({ href, label, icon: Icon }) => (
                  <Button key={label} asChild variant="outline" size="icon">
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      <span className="sr-only">{label}</span>
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card size="sm" className="contact-card bg-opacity-80">
              <CardHeader>
                <CardTitle>Services</CardTitle>
                <CardDescription>
                  Focus areas I can support from strategy to launch.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {slice.items.map((item, index) => (
                  <Badge key={index} variant="secondary" className="gap-1.5">
                    <IconBriefcase className="size-3.5" />
                    {item.services}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="contact-card mx-auto flex w-full max-w-3xl flex-col gap-8">
          <div className="text-center">
            <h2 className="text-foreground text-3xl font-semibold">
              {slice.primary.faq_title}
            </h2>
            <p className="text-muted-foreground mt-3">
              {slice.primary.faq_intro}
            </p>
          </div>

          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {slice.primary.faq.map((item, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="bg-card rounded-xl border px-5"
              >
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground [&_p]:leading-7">
                  <PrismicRichText field={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center">
            <Button asChild variant="link">
              <Link href="/faq">
                View all FAQs
                <IconArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>

        <Card className="contact-card ring-foreground/5 bg-opacity-80">
          <CardContent className="flex flex-col items-center gap-5 p-8 text-center md:p-12">
            <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl border">
              <IconCheck className="size-5" />
            </div>
            <div className="max-w-2xl">
              <h2 className="text-foreground text-3xl font-semibold">
                {slice.primary.cta_title}
              </h2>
              <p className="text-muted-foreground mt-3">
                {slice.primary.cta_intro}
              </p>
            </div>
            <Button asChild size="lg">
              <a href="#message">
                Start the conversation
                <IconSend data-icon="inline-end" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
};

export default Contact;
