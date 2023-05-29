import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { twMerge } from "tailwind-merge";

interface Props {
  text: string;
}

const TextComponent: React.FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="max-w-lg">
      <div
        className={twMerge(
          `overflow-hidden text-ellipsis break-words leading-normal transition-[max-height] duration-300`,
          isExpanded ? "max-h-[1000px]" : "max-h-12"
        )}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Read More
        </button>
      ) : (
        <button
          onClick={toggleClose}
          className="mt-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default TextComponent;
