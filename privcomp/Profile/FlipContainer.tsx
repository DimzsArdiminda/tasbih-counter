"use client";

import { ReactNode } from "react";

interface FlipContainerProps {
  isFlipped: boolean;
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export default function FlipContainer({
  isFlipped,
  front,
  back,
  className = "",
}: FlipContainerProps) {
  return (
    <div className={`relative perspective-[1500px] ${className}`}>
      <div
        className={`
          relative
          h-full
          w-full
          transition-transform
          duration-700
          ease-in-out
          transform-3d
          ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
        `}
      >
        {/* Front */}
        <div
          className="
            absolute
            inset-0
            backface-hidden
          "
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="
            absolute
            inset-0
            transform-[rotateY(180deg)]
            backface-hidden
          "
        >
          {back}
        </div>
      </div>
    </div>
  );
}
