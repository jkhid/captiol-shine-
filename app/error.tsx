"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", background: "#F7F7F5", margin: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: "28rem", textAlign: "center" }}>
            <p style={{ fontSize: "3.5rem", fontWeight: 700, color: "#D4A94B", marginBottom: "1rem" }}>
              Oops
            </p>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1B2A4A", marginBottom: "1rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#2D2D2D", opacity: 0.7, marginBottom: "2rem" }}>
              An unexpected error occurred. Please try again or contact us if the problem persists.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  background: "#1B2A4A",
                  color: "#fff",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #1B2A4A",
                  color: "#1B2A4A",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
