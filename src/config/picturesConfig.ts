export type Picture = {
  /** Path under /public, e.g. "/slideshow/photo.jpg" */
  src: string;
  /** Concise, descriptive alt text for accessibility */
  alt: string;
  /** Optional display title */
  title?: string;
  /** Optional caption/credit */
  caption?: string;
  /** Optional intrinsic size for layout stability */
  width?: number;
  height?: number;
};

export type PicturesConfig = {
  items: Picture[];
};
