"use client";

import { useState } from "react";

import Lottie from "react-lottie";

import { cn } from "@/utils/cn";

import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import Image from "next/image";
import type { KeyTextField } from "@prismicio/client";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { IconCheck, IconCopy } from "@tabler/icons-react";

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
        "md:grid-row-7 mx-auto grid grid-cols-1 gap-5 px-2 sm:px-4 md:grid-cols-6 lg:grid-cols-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  title,
  description,
  img,
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
    <Card
      size="sm"
      className={cn(
        "group/bento text-card-foreground relative row-span-1 flex flex-col justify-between rounded-2xl transition duration-200",
        "bg-opacity-80",
        `${id === 1 && "md:col-span-6 md:row-span-4 lg:col-span-3 lg:min-h-[60vh]"}`,
        `${id === 2 && "md:col-span-3 md:row-span-2 lg:col-span-2"}`,
        `${id === 3 && "md:col-span-3 md:row-span-2 lg:col-span-2"}`,
        `${id === 4 && "md:col-span-3 md:row-span-1 lg:col-span-2"}`,
        `${id === 5 && "md:col-span-3 md:row-span-2"}`,
        `${id === 6 && "md:col-span-3 md:row-span-1 lg:col-span-2"}`,
      )}
    >
      <CardContent className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="absolute inset-0">
          {img && (
            <Image
              src={img}
              width={400}
              height={400}
              alt={img}
              className={cn(
                "object-cover object-center",
                id === 1 && "h-full w-full",
                id === 4 && "absolute right-0 bottom-0 w-60 md:w-96",
                id === 5 && "absolute right-0 bottom-0 w-60 md:w-96",
                id === 6 && "h-full w-full",
              )}
            />
          )}
        </div>
        <div className={`absolute right-0 bottom-0 ${id === 5 && "inset-0"} `}>
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
            "relative flex min-h-40 flex-col p-4 transition duration-200 group-hover/bento:translate-x-2 sm:min-h-44 sm:p-5 md:h-full md:p-6 lg:p-8 xl:p-10",
            id === 1 && "justify-end",
            id === 2 && "justify-start",
            id === 3 && "justify-center",
            id === 4 && "justify-start",
            id === 5 && "justify-center md:justify-start lg:justify-center",
            id === 6 && "max-w-60 justify-center text-center md:max-w-full",
          )}
        >
          <p className="text-muted-foreground z-10 text-xs sm:text-sm md:max-w-32 md:text-xs lg:max-w-40 lg:text-sm xl:text-base">
            {description}
          </p>

          <div
            className={cn(
              id === 1 && "absolute max-w-lg text-white!",
              "text-foreground z-10 max-w-md font-sans text-base leading-tight font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl",
              id === 6 && "text-white",
            )}
          >
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="absolute -right-4 flex w-fit gap-1 text-white sm:gap-2 md:gap-3 lg:gap-5">
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-10">
                {leftLists?.map((item, i) => (
                  <Badge key={i} className="h-10 min-w-20 rounded-md">
                    {item}
                  </Badge>
                ))}
                <Badge className="h-10 min-w-20 rounded-md bg-indigo-500" />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-10">
                <Badge className="h-10 min-w-20 rounded-md" />
                {rightLists?.map((item, i) => (
                  <Badge
                    key={i}
                    className="h-10 min-w-20 rounded-md bg-indigo-500"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="relative mt-3 sm:mt-5">
              {copied && (
                <div className="absolute right-0 -bottom-3 z-50 sm:-bottom-5">
                  <div className="h-37.5 w-75 sm:h-50 sm:w-100">
                    <Lottie
                      options={defaultOptions}
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                disabled={isThrottled}
              >
                {copied ? (
                  <IconCheck data-icon="inline-start" />
                ) : (
                  <IconCopy data-icon="inline-start" />
                )}
                {copied ? "Email copied" : "Copy my email"}
              </Button>
            </div>
          )}

          {id === 1 && <div className="1min-h-40"></div>}
        </div>
      </CardContent>
    </Card>
  );
};
