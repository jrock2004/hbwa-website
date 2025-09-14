import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";

export function SlideshowCaption({ src, title, caption }: SlideshowCaptionProps) {
  if (!title && !caption) return null;
  return (
    <AnimatePresence>
      <motion.figcaption
        key={`${src}-caption`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.18 }}
        className={clsx(
          "pointer-events-none absolute inset-x-0 bottom-0",
          "flex flex-col gap-0.5 p-3 sm:p-4",
          "bg-gradient-to-t from-black/60 to-transparent text-white",
        )}
      >
        {title && <span className="text-sm font-medium sm:text-base">{title}</span>}
        {caption && <span className="text-xs opacity-90 sm:text-sm">{caption}</span>}
      </motion.figcaption>
    </AnimatePresence>
  );
}

interface SlideshowCaptionProps {
  src: string;
  title?: string;
  caption?: string;
}
