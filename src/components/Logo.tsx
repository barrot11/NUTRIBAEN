import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id="logo-svg"
    >
      {/* Lime green background circle */}
      <circle cx="250" cy="250" r="225" fill="#beff52" />
      
      {/* Large "PBE" text in serif font */}
      <text
        x="250"
        y="295"
        textAnchor="middle"
        fill="#171717"
        style={{
          fontFamily: "'Playfair Display', 'Didot', 'Bodoni MT', 'Georgia', serif",
          fontWeight: 900,
          fontSize: "175px",
          letterSpacing: "-4px"
        }}
      >
        PBE
      </text>

      {/* Horizontal cut matching the background color */}
      <rect x="100" y="222" width="300" height="34" fill="#beff52" />

      {/* "NUTRI BAEN" text in the center cut-out */}
      <text
        x="254"
        y="246"
        textAnchor="middle"
        fill="#171717"
        style={{
          fontFamily: "'Inter', 'Space Grotesk', 'Helvetica', sans-serif",
          fontWeight: 900,
          fontSize: "15px",
          letterSpacing: "10px"
        }}
      >
        NUTRI BAEN
      </text>
    </svg>
  );
}
