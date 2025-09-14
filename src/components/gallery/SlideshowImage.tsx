import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import React from "react";

interface SlideshowImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  isLoaded: boolean;
  isFirst: boolean;
  direction: 1 | -1;
  dx: number;
  onLoad: () => void;
}

export function SlideshowImage({
  src,
  alt,
  width,
  height,
  isLoaded,
  isFirst,
  direction,
  dx,
  onLoad,
}: SlideshowImageProps) {
  return (
    <AnimatePresence>
      <motion.img
        key={src}
        initial={{ x: direction * dx, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -direction * dx, opacity: 0 }}
        transition={{ duration: 0.28 }}
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={isFirst ? "eager" : "lazy"}
        fetchPriority={isFirst ? ("high" as const) : ("auto" as const)}
        onLoad={onLoad}
        className={clsx(
          "absolute inset-0 m-auto h-full w-full object-contain",
          "transition-opacity duration-200",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        sizes="(min-width: 1024px) 1024px, 100vw"
      />
    </AnimatePresence>
  );
}
