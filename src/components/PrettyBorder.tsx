import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const PrettyBorder = (
  { children, className, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) => {
  return (
    <div
      {...props}
      className={twMerge(
        "rounded-3xl border border-solid border-neutral-700 border-opacity-10 bg-white/[.01] p-3 shadow-inner shadow-neutral-200 dark:border-neutral-500 dark:shadow-neutral-600",
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default forwardRef(PrettyBorder);
