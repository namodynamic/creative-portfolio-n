"use client";

import TitleHeader from "./TitleHeader";
import Image from "next/image";
import { asText, Content } from "@prismicio/client";
import { FaStar } from "react-icons/fa6";
import { Quote } from "lucide-react";

const TestimonialCard = ({ slice }: { slice: Content.TestimonialSlice }) => {
 

  return (
    <section
      className="mt-20 flex items-center justify-center md:mt-40"
    >
      <div className="h-full w-full">
        <TitleHeader
          title="Testimonials"
          subtitle="What People Say"
          icon={<Quote className="w-5 h-5 text-white-50" />}
          intro="Feedback from colleagues and clients I've worked with"
        />

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3">
          {slice.items.map((testimonial, index) => (
            <div
              key={index}
              className="group mb-5 break-inside-avoid-column rounded-xl border border-black-50 bg-black-100 p-6"
            >
              <div className="mb-5 flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="size-5 text-white-50" />
                ))}
              </div>
              <div className="mb-5">
                <p className="text-base leading-relaxed text-gray-300">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCard;
