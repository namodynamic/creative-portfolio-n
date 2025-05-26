'use client'

import { useRef, type MouseEvent, type ReactNode, type FC } from "react";
import { FaStar } from "react-icons/fa6";
import { Simplify, TestimonialSliceDefaultItem } from "@/prismicio-types";
import { asText } from "@prismicio/client";

interface GlowCardProps {
  card: Simplify<TestimonialSliceDefaultItem>;
  index: number;
  children: ReactNode;
}

const GlowCard = ({ card, index, children }: GlowCardProps) => {
  // Refs for each card by index
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (index: number) => (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    card.style.setProperty("--start", `${angle + 60}`);
  };

  return (
    <div
       ref={(el) => {
        cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
      className="card border group border-black-50 bg-black-100 timeline-card rounded-xl p-6 break-inside-avoid-column"
    >
      <div className="glow"></div>
      
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar key={i} className="text-white size-5" />
        ))}
      </div>

      <div className="mb-5">
        <p className="text-gray-300 text-base leading-relaxed"> { asText(card.feedback)}</p>
      </div>

      {children}
      <div className="absolute inset-0 z-0 bg-black/20  transition duration-500 md:group-hover:bg-black/5" />
    </div>
  );
};

export default GlowCard;
