import clsx from "clsx";
import Image from "next/image";
import React, { memo } from "react";

interface Props {
  zIndex?: number;
}

function SnowfallEffect({ zIndex }: Props) {
  return (
    <div
      className={clsx(
        "absolute top-[-20px] left-0 w-full h-full pointer-events-none",
        zIndex && `z-${zIndex}`
      )}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <Image
          src="/svgs/snow.svg"
          alt="Snowflake Icon"
          width={16}
          height={16}
          key={index}
          className="absolute animate-falling-snow opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );
}

export default memo(SnowfallEffect);
