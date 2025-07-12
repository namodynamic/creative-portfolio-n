"use client";

import { useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

import Lottie from "react-lottie";

import { cn } from "@/utils/cn";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "./MagicButton";
import Image from "next/image";
import type { KeyTextField } from "@prismicio/client";
import { useInView, motion } from "motion/react";

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
  const [isThrottled, setIsThrottled] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: id * 0.1,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl transition duration-200 md:rounded-3xl",

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
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10",
          )}
        >
          <motion.div
            className="z-10 font-sans text-sm font-extralight dark:text-[#C1C2D3] md:max-w-32 md:text-xs lg:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: id * 0.1 + 0.2 }}
          >
            {description}
          </motion.div>

          <motion.div
            className={cn(
              id === 1 && "absolute flex flex-wrap text-white",
              "text-md z-10 max-w-96 font-sans font-bold lg:text-2xl",
              id === 6 && "text-white",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: id * 0.1 + 0.3 }}
          >
            {title}
          </motion.div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-3 flex w-fit gap-1 text-white lg:-right-2 lg:gap-5">
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
              {copied && (
                <div className="absolute -bottom-5 right-0 z-50">
                  <Lottie options={defaultOptions} height={200} width={400} />
                </div>
              )}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline className="mr-1" />}
                position="left"
                onClick={handleCopy}
                otherClasses="bg-gray-800 dark:bg-gray-900/90 text-xs backdrop-blur-sm  border border-white/20 dark:border-gray-700/20 hover:bg-gray-700 dark:hover:bg-gray-800/90"
              />
            </div>
          )}

          {id === 1 && <div className="h-[260px]"></div>}
        </div>
      </div>
    </motion.div>
  );
};
