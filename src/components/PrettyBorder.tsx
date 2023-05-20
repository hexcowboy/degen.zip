import { useCallback, useContext, useEffect, useRef } from "react";

import useIsMobile from "@/hooks/use-is-mobile";

interface Props {
  children: React.ReactNode;
}

const PrettyBorder = ({ children }: Props) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isMobile) return;
      const container = containerRef.current;
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

  return (
    <div
      className="rounded-3xl border border-solid border-neutral-700 border-opacity-10 bg-white/[.01] p-3 shadow-inner shadow-neutral-200 dark:border-neutral-500 dark:shadow-neutral-600 relative"
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default PrettyBorder;
