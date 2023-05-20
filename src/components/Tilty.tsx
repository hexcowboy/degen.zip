import { createElement, useCallback, useEffect, useRef } from "react";

import useIsMobile from "@/hooks/use-is-mobile";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Tilty = ({ children, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isMobile) return;
      const container = ref.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;
      const angleX = (event.clientX - centerX) * 0.006;
      const angleY = (event.clientY - centerY) * -0.01;

      container.style.transform = `perspective(1000px) rotateX(${angleY}deg) rotateY(${angleX}deg)`;
    },
    [isMobile]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return createElement("div", { ref, ...props }, children);
};

export default Tilty;
