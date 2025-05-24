"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import emailjs from "@emailjs/browser";

import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send, Mail, MapPin, Clock, ArrowRight, CheckCheck } from "lucide-react";
import { FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { Icon } from "@/slices/Approach";
import Link from "next/link";
import MagicButton from "@/components/ui/MagicButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const pageRef = useRef(null);

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

  const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;

  const emailjsTemplateId = process.env
    .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;

  const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        emailjsPublicKey,
      )
      .then(() => {
        setIsLoading(false);
        toast.success(
          "Thank you for your message, I'll get back to you shortly.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "dark",
          },
        );

        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error("I didn't get your message 😢. Please try again", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: 1,
          theme: "dark",
        });
      });
  };
  return (
    <>
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        ref={pageRef}
      >
        <div className="mx-auto my-8 max-w-7xl sm:py-16">
          <div className="mb-16 text-center">
            <p className="heading-anim mb-2 text-sm uppercase tracking-wider dark:text-purple-500">
              {slice.primary.heading}
            </p>
            <h1 className="heading-anim mb-4 text-4xl font-bold dark:text-white text-black-50 md:text-5xl">
              {slice.primary.sub_heading}
            </h1>
            <p className="heading-anim mx-auto mt-4 max-w-2xl text-lg text-black/80 dark:text-gray-300">
              {slice.primary.description}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <div className="contact-card rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/50 bg-white/20 p-8  backdrop-blur-sm lg:col-span-2">
              <div className="flex items-center justify-between space-x-2">
                <div className="mb-6 flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <Icon className="h-6 w-6 text-gray-400" />
              </div>

              <h2 className="mb-6 text-2xl font-bold dark:text-white text-black-50">
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium dark:text-white text-black-50"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-700 dark:bg-[#131a41]/50 bg-white/30 px-2 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium dark:text-white text-black-50"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-700 dark:bg-[#131a41]/50 px-2 bg-white/30 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium dark:text-white text-black-50"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, questions, or just say hello!"
                    className="w-full resize-none rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-700 dark:bg-[#131a41]/50 bg-white/30 px-2 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 via-violet-500 to-purple-700 px-6 py-3 font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:via-violet-600 hover:to-purple-600 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center text-xs dark:text-white/50 text-black/50">
                <span>
                  <MdOutlinePrivacyTip className="mr-1 inline h-4 w-4" />
                  <span>
                    Your information is kept confidential and will only be used
                    to respond to your message. I respect your privacy.
                  </span>
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="contact-card rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/50 bg-white/20 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-6 text-xl font-bold dark:text-white text-black-50">
                  Contact Information
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black-50 dark:bg-purple-600/20 dark:text-white text-white">
                        <Mail className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="-mt-1 ml-3">
                      <h3 className="text-sm font-medium dark:text-white">
                        Email
                      </h3>
                      <p className="mt-1 dark:text-gray-400 text-black/60">
                        <a
                          href={`mailto:${slice.primary.contact_email}`}
                          className="transition-colors dark:hover:text-purple-100 hover:text-black-50"
                        >
                          {slice.primary.contact_email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md dark:bg-yellow-700/20 bg-black-50 dark:text-yellow-500 text-white">
                        <MapPin className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="-mt-1 ml-3">
                      <h3 className="text-sm font-medium dark:text-white">
                        Location
                      </h3>
                      <p className="mt-1 dark:text-gray-400 text-black/60">
                        {slice.primary.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md dark:bg-green-700/20 dark:text-green-500 bg-black-50 text-white">
                        <Clock className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="-mt-1 ml-3">
                      <h3 className="text-sm font-medium dark:text-white">
                        Response Time
                      </h3>
                      <p className="mt-1 dark:text-gray-400 text-black/60">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-card rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/50 bg-white/20 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold dark:text-white text-black-50">
                  Connect with me:
                </h2>

                <div className="mt-4 flex space-x-4">
                  <a
                    href="https://github.com/namodynamic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black-50 dark:bg-[#131a41]/50 text-white transition-all hover:border-purple-500 hover:bg-purple-500"
                  >
                    <FaGithub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/ekechinnamdi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black-50 dark:bg-[#131a41]/50 text-white transition-all hover:border-purple-500 hover:bg-purple-500"
                  >
                    <FaLinkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>

                  <a
                    href="https://x.com/namodynamic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black-50 dark:bg-[#131a41]/50 text-white transition-all hover:border-purple-500 hover:bg-purple-500"
                  >
                    <FaXTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </div>
              </div>

              <div className="contact-card rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/50 bg-white/20 p-6 shadow-lg backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold dark:text-white text-black-50">Services</h2>
                <ul className="space-y-3">
                  {slice.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <GrServices className="mr-2 h-3 w-3 flex-shrink-0" />
                      <span className="dark:text-gray-300 text-black/80">{item.services}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="contact-card mt-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold dark:text-white text-black-50">
                {slice.primary.faq_title}
              </h2>
              <p className="mt-4 dark:text-gray-300 text-black/80">
                {slice.primary.faq_intro}
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              className="mx-auto max-w-3xl space-y-4"
            >
              {slice.primary.faq.map((item, index) => (
                <AccordionItem
                  value={`item-${index + 1}`}
                  key={index}
                  className="rounded-lg border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/50 bg-white/20 px-6 py-2 dark:text-white text-black-50 shadow-lg backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-base prose-invert text-black dark:text-slate-400">
                    <PrismicRichText field={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center text-purple-600 hover:text-purple-500"
              >
                View all FAQs
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="contact-card mt-20 rounded-xl border-[0.5px] border-zinc-400 dark:border-gray-800 dark:bg-blue-850/70 bg-white/20 p-6 shadow-lg backdrop-blur-sm sm:p-12">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold dark:text-white text-black-50">
                {slice.primary.cta_title}
              </h2>
              <p className="mx-auto mb-8 max-w-2xl dark:text-gray-300">
               {slice.primary.cta_intro}
              </p>
              <Link href="#">
                <MagicButton
                  title="Send a Message"
                  icon={
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  }
                  position="right"
                  otherClasses=""
                  isBeam
                />
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Bounded>
    </>
  );
};

export default Contact;
