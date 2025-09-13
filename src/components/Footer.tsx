// Footer.tsx
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t" role="contentinfo">
      {/* <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4"> */}
      {/*   {[1, 2, 3, 4].map((i) => ( */}
      {/*     <div key={i} className="space-y-3"> */}
      {/*       <div className="bg-muted h-4 w-32 rounded" aria-hidden /> */}
      {/*       {[1, 2, 3, 4].map((j) => ( */}
      {/*         <div key={j} className="bg-muted h-3 w-40 rounded" aria-hidden /> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   ))} */}
      {/* </div> */}
      <div className="flex items-center justify-center gap-8 py-4 text-xs">
        <p className="text-muted-foreground">© {year} Honey Brook Water Authority</p>
        <div className="">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
