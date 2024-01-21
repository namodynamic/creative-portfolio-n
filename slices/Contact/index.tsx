"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import StarsCanvas from "@/components/Stars";

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
          to_name: "Nnamdi",
          from_email: form.email,
          to_email: "nnamdi4u09@gamil.com",
          message: form.message,
        },
        emailjsPublicKey,
      )
      .then(() => {
        setIsLoading(false);
        alert("Thank you. I will get  back to you as soon as possible.");

        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        alert("Something went wrong. Please try again.");
      });
  };
  return (
    <>
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg" className="max-md:text-5xl">
        {slice.primary.heading}
      </Heading>
      <div className="mt-10 flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
        <div className="flex-[0.5] rounded-2xl bg-[#100d25] p-8">
          <p className=" text-[14px] uppercase tracking-wider text-[#aaa6c3] sm:text-[18px]">
            {slice.primary.sub_heading}
          </p>

          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="rounded-lg border-none bg-[#151030] px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Name</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="rounded-lg border-none bg-[#151030] px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-white">Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Drop me a message here and i'll get back to you."
                className="rounded-lg border-none bg-[#151030] px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
              />
            </label>

            <button
              type="submit"
              className="w-fit rounded-xl border-none bg-[#151030]  px-8 py-3 font-bold text-white shadow-md shadow-white outline-none"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      </Bounded>
      <StarsCanvas />
      </>
  );
};

export default Contact;
