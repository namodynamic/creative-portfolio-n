"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import Lottie from "react-lottie";

import { cn } from "@/utils/cn";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "./MagicButton";
import Image from "next/image";
import type { KeyTextField } from "@prismicio/client";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "md:grid-row-7 mx-auto grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-5 lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  leftLists,
  rightLists,
  copyEmail,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  leftLists?: KeyTextField[];
  rightLists?: KeyTextField[];
  copyEmail?: KeyTextField;
}) => {
  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = copyEmail || "";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
     className={cn(
  "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl transition duration-200 md:rounded-3xl",
  
  `${id === 2 && "dark:bg-dot-black-500"}`,
  `${id === 3 && "dark:bg-dot-black-500"}`,

  "bg-dot-white-500 backdrop-blur-lg bg-opacity-80 border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_40px_rgba(0,0,0,0.15)]",

  "dark:bg-[linear-gradient(90deg,_rgba(4,7,29,1)_0%,_rgba(12,14,35,1)_100%)] dark:border-white/10 dark:shadow-none dark:hover:shadow-xl",

  className,
)}
>
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="absolute h-full w-full">
          {img && (
            <Image
              src={img}
              width={220}
              height={220}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute bottom-0 right-0 ${
            id === 5 && "w-full"
          } `}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={220}
              height={220}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10",
          )}
        >
          <div className="z-10 font-sans text-sm font-extralight dark:text-[#C1C2D3] md:max-w-32 md:text-xs lg:text-base">
            {description}
          </div>

          <div
            className={cn(
              id === 1 && "absolute flex text-white flex-wrap",
              "text-md z-10 max-w-96 font-sans font-bold lg:text-2xl",
              id === 6 && "text-white",
            )}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-3 flex w-fit gap-1 lg:-right-2 text-white lg:gap-5">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists?.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg  bg-purple-700 px-3 py-2 text-center text-xs 
                    lg:px-3 lg:py-4 lg:text-base"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-lg  bg-[#5D38F2] px-3 py-4  text-center lg:px-3 lg:py-4"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="rounded-lg  bg-purple-700 px-3 py-4  text-center lg:px-3 lg:py-4"></span>
                {rightLists?.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg  bg-[#5D38F2] px-3 py-2 text-center text-xs 
                    lg:px-3 lg:py-4 lg:text-base"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="relative mt-5">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline className="mr-1" />}
                position="left"
                onClick={handleCopy}
                otherClasses="!bg-black-50 text-xs text-white"
              />
            </div>
          )}

          {id === 1 && <div className="h-[260px]"></div>}
        </div>
      </div>
    </div>
  );
};
