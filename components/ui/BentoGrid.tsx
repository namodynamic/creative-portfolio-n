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
        "md:grid-row-7 mx-auto grid grid-cols-1 gap-3 px-2 sm:gap-4 sm:px-4 md:grid-cols-6 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:gap-8",
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
  const [isThrottled, setIsThrottled] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    if (isThrottled) return;
    navigator.clipboard.writeText(copyEmail || "");
    setCopied(true);
    setIsThrottled(true);

    setTimeout(() => {
      setCopied(false);
      setIsThrottled(false);
    }, 5000);
  };

  return (
    <div
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-3 overflow-hidden rounded-lg transition duration-200 sm:space-y-4 sm:rounded-xl md:rounded-2xl lg:rounded-3xl",

        `${id === 2 && "dark:bg-dot-black-500"}`,
        `${id === 3 && "dark:bg-dot-black-500"}`,

        "border border-white/30 bg-opacity-80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-lg bg-dot-white-500 hover:shadow-[0_6px_40px_rgba(0,0,0,0.15)]",

        "dark:border-white/10 dark:bg-[linear-gradient(90deg,_rgba(4,7,29,1)_0%,_rgba(12,14,35,1)_100%)] dark:shadow-none dark:hover:shadow-xl",

        className,
      )}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="absolute h-full w-full">
          {img && (
            <Image
              src={img}
              width={400}
              height={400}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div className={`absolute bottom-0 right-0 ${id === 5 && "inset-0"} `}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={300}
              height={300}
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
            "relative flex min-h-32 flex-col p-4 transition duration-200 group-hover/bento:translate-x-2 sm:min-h-40 sm:p-5 md:h-full md:p-6 lg:p-8 xl:p-10",
          )}
        >
          <div className="z-10 font-sans text-xs font-extralight dark:text-[#C1C2D3] sm:text-sm md:max-w-32 md:text-xs lg:max-w-40 lg:text-sm xl:text-base">
            {description}
          </div>

          <div
            className={cn(
              id === 1 && "absolute flex flex-wrap text-white",
              "z-10 max-w-full font-sans text-sm font-bold sm:text-base md:text-lg lg:max-w-96 lg:text-xl xl:text-2xl",
              id === 6 && "text-white",
            )}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-2 flex w-fit gap-1 text-white sm:-right-3 sm:gap-2 md:gap-3 lg:-right-2 lg:gap-5">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-8">
                {leftLists?.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-purple-700 px-2 py-1.5 text-center text-[10px] sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs md:text-sm lg:px-3 lg:py-4 lg:text-base"
                  >
                    {item}
                  </span>
                ))}
                <span className="rounded-md bg-[#5D38F2] px-2 py-3 text-center sm:rounded-lg sm:px-3 sm:py-4 lg:px-3 lg:py-4"></span>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-8">
                <span className="rounded-md bg-purple-700 px-2 py-3 text-center sm:rounded-lg sm:px-3 sm:py-4 lg:px-3 lg:py-4"></span>
                {rightLists?.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-[#5D38F2] px-2 py-1.5 text-center text-[10px] sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs md:text-sm lg:px-3 lg:py-4 lg:text-base"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="relative mt-3 sm:mt-5">
              {copied && (
                <div className="absolute -bottom-3 right-0 z-50 sm:-bottom-5">
                  <div className="h-[150px] w-[300px] sm:h-[200px] sm:w-[400px]">
                    <Lottie
                      options={defaultOptions}
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              )}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline className="mr-1" />}
                position="left"
                onClick={handleCopy}
                otherClasses="bg-gray-800 dark:bg-gray-900/90 text-[10px] sm:text-xs backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-gray-700 dark:hover:bg-gray-800/90"
              />
            </div>
          )}

          {id === 1 && (
            <div className="h-[180px] sm:h-[220px] md:h-[260px]"></div>
          )}
        </div>
      </div>
    </div>
  );
};
