import React, { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

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
        className={clsx("px-4 py-8 md:px-6 md:py-14 lg:py-16", className)}
        {...rest}
      >
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </Component>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;
