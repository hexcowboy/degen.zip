"use client";

import { HTMLAttributes, createElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const elementTag = "input";
type Element = HTMLInputElement;
interface Props extends HTMLAttributes<Element> {
  value: string;
  setValue: (value: string) => void;
}

const TextInput = (
  { value, setValue, className, ...props }: Props,
  ref: React.Ref<Element>
) => {
  return createElement(elementTag, {
    ref,
    className: twMerge(
      "rounded-xl h-12 text-xl drop-shadow dark:bg-black px-6 outline-none border border-transparent dark:border-neutral-700",
      className
    ),
    ...props,
    value,
    onChange: (e) => setValue(e.target.value),
  });
};

export default forwardRef(TextInput);
