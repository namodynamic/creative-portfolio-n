import React, { ElementType, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BoundedProps<T extends ElementType = "section"> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const Bounded = forwardRef<HTMLElement, BoundedProps>(
  ({ as: Component = "section", className, children, ...rest }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("px-4 py-20 md:px-6 md:py-14 lg:py-16", className)}
        {...rest}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Component>
    );
  },
);

Bounded.displayName = "Bounded";

export default Bounded;
