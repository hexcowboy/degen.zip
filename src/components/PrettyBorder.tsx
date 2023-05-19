import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}

const PrettyBorder = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const angleX = (event.clientX - centerX) * 0.005;
    const angleY = (event.clientY - centerY) * -0.009;

    container.style.transform = `perspective(1000px) rotateX(${angleY}deg) rotateY(${angleX}deg)`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="rounded-3xl border border-solid border-neutral-700 border-opacity-10 bg-white/[.01] p-3 shadow-inner shadow-neutral-200 dark:border-neutral-500 dark:shadow-neutral-600"
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default PrettyBorder;
