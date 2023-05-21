import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import useIsMobile from "@/hooks/use-is-mobile";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  window_?: boolean;
  enlarge?: boolean;
  intensity?: number;
}

const Tilty = ({
  children,
  window_ = true,
  enlarge = false,
  intensity = 1,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isHovered && enlarge) return;
      if (isMobile || !ref.current) return;

      const container = ref.current;
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const angleX = (event.clientX - centerX) * (0.006 * intensity);
      const angleY = (event.clientY - centerY) * (-0.01 * intensity);
      const scale = enlarge ? 1.01 : 1;

      container.style.transform = `perspective(1000px) scale(${scale}) rotateX(${angleY}deg) rotateY(${angleX}deg)`;
    },
    [isMobile, intensity, isHovered, enlarge]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (ref.current) {
      ref.current.style.transition = "transform 0.15s ease";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (ref.current) {
      const container = ref.current;
      container.style.transition = "transform 0.75s ease";
      container.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
    }
  }, []);

  useEffect(() => {
    const target = window_ ? window : ref.current;
    if (!target) return;

    target.addEventListener(
      "mousemove",
      handleMouseMove as EventListenerOrEventListenerObject
    );
    return () => {
      target.removeEventListener(
        "mousemove",
        handleMouseMove as EventListenerOrEventListenerObject
      );
    };
  }, [window_, handleMouseMove]);

  return createElement(
    "div",
    {
      ref,
      onMouseEnter: enlarge ? handleMouseEnter : undefined,
      onMouseLeave: enlarge ? handleMouseLeave : undefined,
      ...props,
      className: twMerge(
        enlarge ? "transition-[transform]" : "",
        props.className
      ),
    },
    children
  );
};

export default Tilty;
