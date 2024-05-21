"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import StarsCanvas from "@/components/Stars";
import { gsap } from "gsap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactGlobe } from "@/components/ContactGlobe";

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
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".heading",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1,0.3)",
          duration: 2,
        },
      );

      tl.from(".form-animation", { opacity: 0, x: -100, duration: 1 });
    }, component);
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
          to_name: "Nnamdi",
          from_email: form.email,
          to_email: "nnamdi4u09@gamil.com",
          message: form.message,
        },
        emailjsPublicKey,
      )
      .then(() => {
        setIsLoading(false);
        toast.success("Thank you, I will get back to you shortly.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "dark",
        });

        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        toast.error("Something went wrong. Please try again", {
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
        ref={component}
      >
        <Heading as="h2" size="lg" className="heading max-md:text-5xl">
          {slice.primary.heading}
        </Heading>
        <div className="mt-10 flex flex-col-reverse justify-between gap-10 overflow-hidden md:py-20 xl:mt-12 xl:flex-row">
          <div className="form-animation w-full flex-1 bg-black-100/75 p-8  text-white">
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
                  className="rounded-lg border-none bg-black-300 px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
                  required
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-4 font-medium text-white">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="rounded-lg border-none bg-black-300  px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
                  required
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
                  className="rounded-lg border-none bg-black-300 px-6 py-4 font-medium text-white outline-none placeholder:text-[#aaa6c3]"
                />
              </label>

              <button
                type="submit"
                className="w-fit rounded-xl border-none bg-black-200  px-8 py-3 font-bold text-white shadow-md shadow-white outline-none hover:shadow-purple"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
          <div className="z-0 h-[350px] w-full md:h-[550px] lg:h-auto  lg:w-1/2">
            <ContactGlobe />
          </div>
          <ToastContainer />
        </div>
      </Bounded>
      <StarsCanvas />
    </>
  );
};

export default Contact;
