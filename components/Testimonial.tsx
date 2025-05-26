import TitleHeader from "./TitleHeader";
import GlowCard from "../components/GlowCard";
import Image from "next/image";
import { Content } from "@prismicio/client";

const Testimonials = ({ slice }: { slice: Content.TestimonialSlice }) => {
  return (
    <section
      id="testimonials"
      className="mt-20 flex items-center justify-center md:mt-40"
    >
      <div className="h-full w-full">
        <TitleHeader
          title="What People Say About Me?"
          subtitle="⭐️ Client feedback highlights"
        />

        <div className="mt-16 columns-1 md:columns-2 lg:columns-3">
          {slice.items.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
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
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
