"use client";

import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  text: string;
  className?: string;
}

export default function MathRenderer({ text, className }: MathRendererProps) {
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);

  const rendered = parts.map((part, i) => {
    if (part.startsWith("$$") && part.endsWith("$$")) {
      const math = part.slice(2, -2);
      try {
        const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
        return (
          <span
            key={i}
            className="block my-2 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return <span key={i}>{part}</span>;
      }
    }
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      const math = part.slice(1, -1);
      try {
        const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
        return (
          <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
        );
      } catch {
        return <span key={i}>{part}</span>;
      }
    }
    return <span key={i}>{part}</span>;
  });

  return <span className={className}>{rendered}</span>;
}
