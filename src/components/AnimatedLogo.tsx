"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface AnimatedLogoProps {
  className?: string;
  showNames?: boolean;
}

function setDash(pathEl: SVGPathElement) {
  const len = pathEl.getTotalLength?.();
  if (!len) return;
  pathEl.style.strokeDasharray = String(len);
  pathEl.style.strokeDashoffset = String(len);
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function AnimatedLogo({ className = "", showNames = true }: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgLoaded, setSvgLoaded] = useState({ monogram: false, names: false });

  useEffect(() => {
    if (!containerRef.current) return;
    if (!svgLoaded.monogram) return;

    const monogramSvg = containerRef.current.querySelector(".monogram-container object") as HTMLObjectElement | null;
    const namesSvg = containerRef.current.querySelector(".names-container object") as HTMLObjectElement | null;
    
    const monogramDoc = monogramSvg?.contentDocument;
    const namesDoc = namesSvg?.contentDocument;

    if (prefersReducedMotion()) {
      if (monogramDoc) {
        gsap.set(monogramDoc.querySelectorAll(".monoPath, .monoInner"), { opacity: 1 });
      }
      if (namesDoc) {
        const maskWipe = namesDoc.querySelector(".maskWipe");
        if (maskWipe) gsap.set(maskWipe, { attr: { width: 900 } });
      }
      return;
    }

    const tl = gsap.timeline();

    if (monogramDoc) {
      const monoPath = monogramDoc.querySelector(".monoPath") as SVGPathElement | null;
      const foilSweep = monogramDoc.querySelector(".foilSweep");

      if (monoPath) {
        setDash(monoPath);
        tl.to(monoPath, {
          strokeDashoffset: 0,
          duration: 1.35,
          ease: "power2.out",
        }, 0.15);
      }

      if (foilSweep) {
        tl.set(foilSweep, { opacity: 0.0 }, 0);
        tl.to(foilSweep, { opacity: 0.55, duration: 0.25, ease: "power1.out" }, 1.05);
        tl.to(foilSweep, { x: 560, duration: 1.05, ease: "power1.inOut" }, 1.05);
        tl.to(foilSweep, { opacity: 0.0, duration: 0.25, ease: "power1.out" }, 2.0);
      }
    }

    if (namesDoc && svgLoaded.names) {
      const maskWipe = namesDoc.querySelector(".maskWipe");
      if (maskWipe) {
        tl.to(maskWipe, { attr: { width: 900 }, duration: 0.9, ease: "power2.out" }, 1.55);
      }
    }

    const sparkles = containerRef.current.querySelector(".sparkles-overlay");
    if (sparkles) {
      tl.to(sparkles, { opacity: 0.85, duration: 0.25, ease: "power1.out" }, 2.05);
      tl.to(sparkles, { opacity: 0.0, duration: 0.7, ease: "power1.out" }, 2.35);
    }

    return () => {
      tl.kill();
    };
  }, [svgLoaded]);

  const handleMonogramLoad = () => {
    setSvgLoaded((prev) => ({ ...prev, monogram: true }));
  };

  const handleNamesLoad = () => {
    setSvgLoaded((prev) => ({ ...prev, names: true }));
  };

  return (
    <div ref={containerRef} className={`logo-stage ${className}`}>
      <div className="logo-foil-layer" />
      <img 
        src="/logo/sparkles.svg" 
        alt="" 
        className="sparkles-overlay"
        aria-hidden="true"
      />
      
      <div className="monogram-container">
        <object
          type="image/svg+xml"
          data="/logo/monogram.svg"
          aria-hidden="true"
          onLoad={handleMonogramLoad}
          style={{ width: "280px", height: "auto", display: "block", margin: "0 auto" }}
        />
      </div>

      {showNames && (
        <div className="names-container">
          <object
            type="image/svg+xml"
            data="/logo/names.svg"
            aria-hidden="true"
            onLoad={handleNamesLoad}
            style={{ width: "min(680px, 100%)", height: "auto", display: "block", margin: "8px auto 0" }}
          />
        </div>
      )}
    </div>
  );
}
