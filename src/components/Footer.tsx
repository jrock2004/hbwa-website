// Footer.tsx
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border border-t">
      <div className="container-page text-muted-foreground flex h-14 items-center justify-between text-sm">
        <p>© {year} Honey Brook Water Authority. All rights reserved.</p>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
