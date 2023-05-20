"use client";

import blockies from "blockies-ts";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import Input from "@/components/Input";
import PrettyBorder from "@/components/PrettyBorder";
import Tilty from "@/components/Tilty";

import "./page.css";

enum PlaceholderOptions {
  ENS = "Enter an ENS",
  NFT = "Enter an NFT",
  Address = "Enter an address",
  Handle = "Enter a degen handle",
}

export default function Home() {
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
        // TODO if a search item is highlighted, navigate to it
        console.log(selectedRoute);
        inputRef.current?.blur();
      }
    },
    [selectedRoute]
  );

  const handleChange = useCallback((value: string) => {
    setValue(value.replace(/[^A-Za-z0-9.@]|^(?!@)/g, ""));
  }, []);

  const ClearButton = (
    <button
      key="clear"
      className="cursor-pointer rounded-xl bg-neutral-200 px-6 py-2 text-center font-mono dark:bg-neutral-800"
      onClick={() => setValue("")}
    >
      Clear
    </button>
  );

  useEffect(() => {
    if (value) {
      if (/^(0x)?[0-9a-fA-F]{40}$/i.test(value)) {
        const imgSrc = blockies.create({ seed: value }).toDataURL();
        const prefix = value.slice(0, 5);
        const suffix = value.slice(-4);

        setResults([
          <div
            key="address"
            className={twMerge(
              "flex cursor-pointer items-center gap-4 rounded-xl bg-blue-300 px-6 py-4 font-mono dark:bg-blue-700"
            )}
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
          </div>,
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
  }, [setResults, value, ClearButton]);

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
            onKeyPress={handleKeyPress}
            className="w-68 font-bold sm:w-96"
            type="search"
            ref={inputRef}
          />
        </PrettyBorder>

        <PrettyBorder
          className={twMerge(
            "mt-4 flex flex-col gap-3 transition-opacity",
            results.length && value ? "opacity-100" : "opacity-0"
          )}
        >
          {results.map((result) => result)}
        </PrettyBorder>
      </Tilty>
    </main>
  );
}
