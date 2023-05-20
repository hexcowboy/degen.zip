"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
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
  const [results, setResults] = useState<Array<ReactNode>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(PlaceholderOptions).length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPlaceholder =
    Object.values(PlaceholderOptions)[placeholderIndex];

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // TODO if a search item is highlighted, navigate to it
      inputRef.current?.blur();
    }
  };

  const handleChange = (value: string) => {
    setValue(value.replace(/[^A-Za-z0-9.@]|^(?!@)/g, ""));
  };

  useEffect(() => {
    if (value) {
      setResults([
        <div key="no-results-found" className="px-4 py-2">
          No results found
        </div>,
      ]);
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
            onKeyPress={handleKeyPress}
            className="w-64 font-bold sm:w-96"
            type="search"
            ref={inputRef}
          />
        </PrettyBorder>

        <PrettyBorder
          className={twMerge(
            "mt-4 transition-opacity",
            results.length && value ? "opacity-100" : "opacity-0"
          )}
        >
          {results.map((result) => result)}
        </PrettyBorder>
      </Tilty>
    </main>
  );
}
