import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "h-11 px-6 py-2.5 bg-blue-600 rounded-lg justify-center items-center inline-flex text-center text-white text-base font-medium leading-normal hover:bg-blue-500 active:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-100 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        // destructive:
        //   "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "h-11 px-6 py-2.5 rounded-lg border border-blue-600 justify-center items-center gap-2 inline-flex text-blue-600 text-base font-medium leading-normal hover:text-blue-400 hover:border-blue-400 active:text-blue-800 active:border-blue-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        // ghost:
        //   "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "h-7 px-2 py-0.5 rounded-lg justify-start items-start gap-2.5 inline-flex text-blue-600 text-base font-semibold underline leading-normal hover:text-blue-400 active:text-blue-800 disabled:text-gray-400 dark:text-slate-50",
        "outline-primary":
          "border border-[#336DF2] text-[#336DF2] hover:bg-[#336DF2] hover:text-white",
        myPrimary:
          "text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-800  disabled:bg-gray-300 disabled:text-gray-100 no-underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
