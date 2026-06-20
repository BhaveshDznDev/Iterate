"use client";

import { useRef } from "react";
import Script from "next/script";
import { APP_MARKUP } from "./app-markup";

export default function Home() {
  const mountedRef = useRef(false);

  return (
    <>
      <div
        ref={(el) => {
          if (el && !mountedRef.current) {
            mountedRef.current = true;
            el.innerHTML = APP_MARKUP;
          }
        }}
      />
      <Script
        src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/iterate-app.js" strategy="afterInteractive" />
    </>
  );
}
