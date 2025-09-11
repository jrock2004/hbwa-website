import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

export default function App() {
  return (
    <div className="bg-background text-foreground theme-transition flex min-h-svh flex-col">
      {/* Skip link appears when focused (Tab at page load) */}
      <a
        href="#main"
        className="bg-background border-border sr-only fixed top-2 left-2 z-[100] rounded-md border px-3 py-2 shadow focus:not-sr-only"
        onClick={() => {
          const el = document.getElementById("main");
          // move programmatic focus so SR/keyboard users land in content
          if (el) (el as HTMLElement).focus();
        }}
      >
        Skip to content
      </a>

      <Navbar />

      {/* Main content landmark */}
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
