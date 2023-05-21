"use client";

import blockies from "blockies-ts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Input from "@/components/Input";
import PrettyBorder from "@/components/PrettyBorder";
import Tilty from "@/components/Tilty";
import { ADDRESS_REGEX } from "@/ethereum/regex";

import "./page.css";

enum PlaceholderOptions {
  ENS = "Enter an ENS",
  NFT = "Enter an NFT",
  Address = "Enter an address",
  Handle = "Enter a degen handle",
}

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [results, setResults] = useState<Array<React.ReactElement>>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>();

  const currentPlaceholder =
    Object.values(PlaceholderOptions)[placeholderIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(PlaceholderOptions).length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (selectedRoute) router.push(selectedRoute);
        inputRef.current?.blur();
      }
    },
    [selectedRoute, router]
  );

  const handleChange = useCallback((value: string) => {
    setValue(value.replace(/[^A-Za-z0-9.@]|^(?!@)/g, ""));
  }, []);

  useEffect(() => {
    if (value) {
      const ClearButton = (
        <button
          key="clear"
          className="cursor-pointer rounded-xl bg-neutral-200 px-6 py-2 text-center font-mono dark:bg-neutral-800"
          onClick={() => setValue("")}
        >
          Clear
        </button>
      );

      if (ADDRESS_REGEX.test(value)) {
        const imgSrc = blockies.create({ seed: value }).toDataURL();
        const prefix = value.slice(0, 5);
        const suffix = value.slice(-4);

        setResults([
          <Link
            key="address"
            className={twMerge(
              "flex cursor-pointer items-center gap-4 rounded-xl bg-blue-300 px-6 py-4 font-mono dark:bg-blue-700"
            )}
            href={`/${value}`}
          >
            <Image
              src={imgSrc}
              alt="Address blockie"
              className="mr-2 inline-block h-8 w-8 rounded-lg"
              width={32}
              height={32}
            />
            <span>
              Address: {prefix}...{suffix}
            </span>
            <span className="ml-auto font-sans text-xl">→</span>
          </Link>,
          ClearButton,
        ]);
        setSelectedRoute(`/${value}`);
      } else {
        setResults([
          <div key="no-results-found" className="px-4 py-2 text-lg">
            No results found
          </div>,
          ClearButton,
        ]);
        setSelectedRoute(undefined);
      }
    } else {
      setSelectedRoute(undefined);
    }
  }, [setResults, value]);

  return (
    <main className="rainbow flex grow flex-col items-center p-24">
      <Tilty
        className={twMerge(
          "transition-[margin]",
          results.length && value ? "mt-0" : "mt-20"
        )}
      >
        <PrettyBorder>
          <Input
            value={value}
            setValue={handleChange}
            placeholder={currentPlaceholder}
            onKeyDown={handleKeyPress}
            className="w-68 font-bold sm:w-96"
            type="search"
            ref={inputRef}
          />
        </PrettyBorder>

        <PrettyBorder
          className={twMerge(
            "relative z-10 mt-4 flex flex-col gap-3 transition-opacity",
            results.length && value ? "opacity-100" : "opacity-0"
          )}
        >
          {results.map((result) => result)}
        </PrettyBorder>
      </Tilty>
    </main>
  );
}
