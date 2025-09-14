export function A11yPanels({ pictures, regionId }: A11yPanelsProps) {
  return (
    <div className="sr-only" aria-live="polite">
      {pictures.map((p, i) => (
        <div key={i} id={`${regionId}-panel-${i}`} role="tabpanel">
          {p.title || p.caption || p.alt}
        </div>
      ))}
    </div>
  );
}

interface A11yPanelsProps {
  pictures: { title?: string; caption?: string; alt: string }[];
  regionId: string;
}
