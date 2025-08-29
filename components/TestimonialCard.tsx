"use client";

import TitleHeader from "./TitleHeader";
import Image from "next/image";
import { asText, Content } from "@prismicio/client";
import { FaStar } from "react-icons/fa6";
import { Quote } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

const TestimonialCard = ({ slice }: { slice: Content.TestimonialSlice }) => {
  const ref = useRef(null);

  return (
    <section className="mt-20 flex items-center justify-center md:mt-40">
      <div className="h-full w-full">
        <TitleHeader
          title="Testimonials"
          subtitle="What People Say"
          icon={<Quote className="h-5 w-5 text-white-50" />}
          intro="Feedback from colleagues and clients I've worked with"
        />

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3">
          {slice.items.map((testimonial, index) => (
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.6,
                delay: index * 0.15,
              }}
              key={index}
              className="group mb-5 break-inside-avoid-column rounded-xl border border-black-50 bg-black-50/90 p-6 will-change-transform dark:bg-black-100"
            >
              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="size-5 text-white-50" />
                ))}
              </div>
              <div className="mb-5">
                <p className="text-base leading-relaxed text-gray-300 transition-colors duration-300 hover:text-white">
                  {asText(testimonial.feedback)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src={testimonial.avatar.url || ""}
                    width={64}
                    height={64}
                    alt={testimonial.name || ""}
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-white-50">{testimonial.occupation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
