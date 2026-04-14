"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const pendingNav = useRef<string | null>(null);

  const isProblems = pathname === "/problems" || pathname.startsWith("/problems/");

  const navigate = (href: string) => {
    const isCurrent = isProblems ? href === "/problems" : href === "/arxiv";
    if (spinning || isCurrent) return;
    pendingNav.current = href;
    setSpinning(true);
  };

  const handleAnimationEnd = () => {
    setSpinning(false);
    if (pendingNav.current) {
      router.push(pendingNav.current);
      pendingNav.current = null;
    }
  };

  const dark = "#111827";
  const light = "#e5e7eb";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div className="flex h-12 items-center justify-end px-4">
        <div
          className={spinning ? "spin-once" : ""}
          style={{ width: 34, height: 34 }}
          onAnimationEnd={handleAnimationEnd}
        >
          <svg
            viewBox="0 0 100 100"
            width="34"
            height="34"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(isProblems ? "/arxiv" : "/problems")}
            aria-label={isProblems ? "Go to arXiv" : "Go to Problems"}
          >
            <title>{isProblems ? "arXiv" : "Problems"}</title>
            <path
              d="M50,5 A45,45,0,0,0,50,95 A22.5,22.5,0,0,0,50,50 A22.5,22.5,0,0,1,50,5 Z"
              fill={light}
            />
            <circle cx="50" cy="27.5" r="8" fill={dark} />
            <path
              d="M50,5 A45,45,0,0,1,50,95 A22.5,22.5,0,0,1,50,50 A22.5,22.5,0,0,0,50,5 Z"
              fill={light}
            />
            <circle cx="50" cy="72.5" r="8" fill={dark} />
          </svg>
        </div>
      </div>
    </header>
  );
}
