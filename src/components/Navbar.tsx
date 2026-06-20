import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transition-all duration-500 ${scrolled ? "scale-95" : ""}`}>
      <div className="glass-strong flex items-center gap-1 rounded-full px-3 py-2 sm:gap-2 sm:px-4">
        <a href="#hero" className="group flex items-center gap-2 rounded-full px-3 py-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-full grad-cyan-violet font-display text-xs font-bold text-deep glow-cyan-sm">
            SP
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">Shreyash</span>
        </a>
        <div className="mx-1 h-5 w-px bg-white/10" />
        {links.map((l) => (
          <a key={l.href} href={l.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-cyan sm:text-sm">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
