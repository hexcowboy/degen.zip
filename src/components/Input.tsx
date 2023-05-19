"use client";

import { HTMLAttributes, createElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type Element = HTMLInputElement;
interface Props extends HTMLAttributes<Element> {
  value: string;
  setValue: (value: string) => void;
  type?: "search" | "text" | "email" | "password" | "url";
}

const TextInput = (
  { value, setValue, type = "text", className, ...props }: Props,
  ref: React.Ref<Element>
) => {
  let enterKeyHint;
  if (type === "search") enterKeyHint = { enterkeyhint: "go" };

  return createElement("input", {
    ref,
    className: twMerge(
      "!rounded-xl h-12 text-xl drop-shadow dark:bg-black px-6 outline-none border border-transparent dark:border-neutral-700",
      className
    ),
    ...props,
    ...enterKeyHint,
    type,
    value,
    onChange: (e) => setValue(e.target.value),
    style: { WebkitBorderRadius: 0 },
  });
};

export default forwardRef(TextInput);
