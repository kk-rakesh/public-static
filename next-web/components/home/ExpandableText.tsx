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
        We believe the future should be accessible to everyone. At O4F, we&apos;re building generational wealth by empowering investors through clarity and simplification in navigating modern markets.{" "}
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
            Our approach combines deep systems expertise in fintech environments with quantitative and scientific rigor in research. Led by experienced fintech professionals, we bring platform engineering capabilities designed for trillion-dollar scale operations.
          </p>
          <p>
            We don&apos;t just build products; we build pathways to financial empowerment. Our mission is to democratize access to sophisticated investment tools and strategies that were once reserved for institutional players.
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
