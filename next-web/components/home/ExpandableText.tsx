"use client";

import { useState, useRef, useLayoutEffect } from "react";

export default function ExpandableText() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM measurement requires setState after render
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  return (
    <div className="text-base leading-relaxed text-text-gray">
      <p>
        We believe that the future should be accessible to everyone, and our mission is to empower investors with the tools they need to navigate the complexities of modern markets with ease and confidence.{" "}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-brand-green font-medium hover:underline inline cursor-pointer"
          >
            more
          </button>
        )}
      </p>

      <div
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-[height] duration-500 ease-out"
      >
        <div ref={contentRef} className="pt-3 space-y-3">
          <p>
            Our approach is rooted in the philosophy that clarity and simplicity are the ultimate forms of sophistication. By stripping away the unnecessary and focusing on the essential, we help our investors build lasting value in an ever-changing financial landscape.
          </p>
          <p>
            Whether you are an individual investor or a large institution, O4F provides the strategic insights and innovative solutions required to thrive in the years ahead.
          </p>
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-brand-green font-medium hover:underline cursor-pointer"
            >
              less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
