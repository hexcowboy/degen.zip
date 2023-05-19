"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Input from "@/components/Input";
import PrettyBorder from "@/components/PrettyBorder";

import "./page.css";

enum PlaceholderOptions {
  ENS = "Enter an ENS",
  NFT = "Enter an NFT",
  Address = "Enter an address",
  Handle = "Enter a degen handle",
}

export default function Home() {
  const [value, setValue] = useState("");
  const [hitEnter, setHitEnter] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

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
      setHitEnter(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="rainbow">
        {hitEnter && "hit enter"}
        <PrettyBorder>
          <Input
            value={value}
            setValue={setValue}
            placeholder={currentPlaceholder}
            onKeyPress={handleKeyPress}
            className="w-64 font-bold sm:w-96"
            type="search"
          />
          <div
            className={twMerge(
              "absolute -bottom-6 right-0 mr-6 self-end text-xs transition-opacity",
              value ? "opacity-100" : "opacity-0"
            )}
          >
            Press return to search
          </div>
        </PrettyBorder>
      </div>
    </main>
  );
}
