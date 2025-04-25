"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import emailjs from "@emailjs/browser";

import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
// import StarsCanvas from "@/components/Stars";
import { gsap } from "gsap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLocationArrow } from "react-icons/fa6";
import { Icon } from "@/slices/Approach";

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
        ".heading-anim",
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
          duration: 1,
        },
      );
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
          position: "bottom-left",
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
        ref={component}
      >
        <div className=" min-h-screen rounded-2xl border border-slate-800 my-10 md:my-20  bg-gray-950/90">
          <div className="w-full overflow-hidden rounded-xl shadow-lg">
            <div className="flex items-center justify-between space-x-2 bg-[#818BA6]/75 px-4 py-4">
              <div className="flex space-x-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <Icon className="h-6 w-6 text-gray-400" />
            </div>

            <div className="flex items-center  justify-center py-4">
              <div className=" contact-container">
                <h3 className="head-text"> {slice.primary.heading}</h3>
                <p className="mt-2 text-lg  text-white-600">
                  {slice.primary.sub_heading}
                </p>

                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="mt-12 flex flex-col space-y-7"
                >
                  <label className="space-y-3">
                    <span className="field-label">Full Name</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="field-input"
                      required
                    />
                  </label>
                  <label className="space-y-3">
                    <span className="field-label">Email Address</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="field-input"
                      required
                    />
                  </label>
                  <label className="space-y-3">
                    <span className="field-label">Your Message</span>
                    <textarea
                      rows={7}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Drop me a message, and i'll get back to you as soon as possible."
                      className="field-input"
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="field-btn"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                    <FaLocationArrow className="inline-block" />
                  </button>
                </form>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </Bounded>
      {/* <StarsCanvas /> */}
    </>
  );
};

export default Contact;
