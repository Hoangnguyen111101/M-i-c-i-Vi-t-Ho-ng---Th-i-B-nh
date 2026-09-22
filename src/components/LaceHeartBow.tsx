import React from 'react';

interface LaceHeartBowProps {
  onClick?: () => void;
}

export const LaceHeartBow: React.FC<LaceHeartBowProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center cursor-pointer group select-none transition-transform duration-300"
    >
      {/* Soft romantic circular ambient glow */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-pink-200/35 via-rose-100/30 to-amber-100/35 blur-2xl animate-cute-glow pointer-events-none" />

      {/* Floating container with hover & active bounce */}
      <div className="relative animate-cute-float group-hover:scale-105 group-active:scale-95 transition-all duration-300">
        <svg
          className="w-56 h-48 sm:w-72 sm:h-60 md:w-84 md:h-70 filter drop-shadow-[0_16px_28px_rgba(50,30,20,0.18)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)] overflow-visible"
          viewBox="0 0 320 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft 3D Puffy Heart Radial Gradient (Round & bulbous) */}
            <radialGradient id="plumpHeartShading" cx="50%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FAF6F0" />
              <stop offset="70%" stopColor="#EFE6DA" />
              <stop offset="90%" stopColor="#DFCFC0" />
              <stop offset="100%" stopColor="#CBB7A4" />
            </radialGradient>

            {/* Left Lobe Round Highlight */}
            <radialGradient id="leftLobeGlow" cx="32%" cy="28%" r="45%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Right Lobe Round Highlight */}
            <radialGradient id="rightLobeGlow" cx="68%" cy="28%" r="45%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Outer Scallop Ruffle Lace Gradient */}
            <linearGradient id="scallopLaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F7F2EB" />
              <stop offset="100%" stopColor="#E2D4C4" />
            </linearGradient>

            {/* White Satin Ribbon Bow - Left Loop */}
            <linearGradient id="satinLeftLoop" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FAF7F2" />
              <stop offset="75%" stopColor="#E4DAD0" />
              <stop offset="100%" stopColor="#CFBFAF" />
            </linearGradient>

            {/* White Satin Ribbon Bow - Right Loop */}
            <linearGradient id="satinRightLoop" x1="85%" y1="10%" x2="15%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FAF7F2" />
              <stop offset="75%" stopColor="#E4DAD0" />
              <stop offset="100%" stopColor="#CFBFAF" />
            </linearGradient>

            {/* White Satin Ribbon Center Knot */}
            <radialGradient id="satinKnotGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#F5EFE8" />
              <stop offset="85%" stopColor="#D2C3B4" />
              <stop offset="100%" stopColor="#BBA998" />
            </radialGradient>

            {/* White Satin Ribbon Tails */}
            <linearGradient id="satinTailL" x1="40%" y1="0%" x2="10%" y2="100%">
              <stop offset="0%" stopColor="#FAF6F0" />
              <stop offset="60%" stopColor="#E4DAD0" />
              <stop offset="100%" stopColor="#C9B7A5" />
            </linearGradient>
            <linearGradient id="satinTailR" x1="60%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FAF6F0" />
              <stop offset="60%" stopColor="#E4DAD0" />
              <stop offset="100%" stopColor="#C9B7A5" />
            </linearGradient>
          </defs>

          {/* ==================== 1. SCALLOPED CROCHET LACE BORDER ==================== */}
          {/* Continuous round scalloped ruffle border */}
          <g id="crochet-scallop-border">
            {/* Outer soft shadow backing */}
            <path
              d="
                M 160 82
                C 142 50, 110 22, 76 22
                C 32 22, 4 56, 4 104
                C 4 158, 82 208, 160 258
                C 238 208, 316 158, 316 104
                C 316 56, 288 22, 244 22
                C 210 22, 178 50, 160 82
                Z
              "
              fill="#D6C4B2"
              opacity="0.5"
            />

            {/* Base Ruffle Scallop Shape */}
            <path
              d="
                M 160 82
                C 142 50, 110 24, 76 24
                C 34 24, 8 58, 8 104
                C 8 156, 84 206, 160 254
                C 236 206, 312 156, 312 104
                C 312 58, 286 24, 244 24
                C 210 24, 178 50, 160 82
                Z
              "
              fill="url(#scallopLaceGrad)"
              stroke="#E8DDD0"
              strokeWidth="2"
            />

            {/* Micro-Scallop Round Petal Loops around the perimeter (Authentic crochet look) */}
            <path
              d="
                M 160 82
                C 142 50, 110 24, 76 24
                C 34 24, 8 58, 8 104
                C 8 156, 84 206, 160 254
                C 236 206, 312 156, 312 104
                C 312 58, 286 24, 244 24
                C 210 24, 178 50, 160 82
                Z
              "
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeDasharray="7 8"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Secondary Inner Fine Scallop Stitch */}
            <path
              d="
                M 160 86
                C 144 56, 114 34, 82 34
                C 44 34, 20 66, 20 106
                C 20 152, 90 198, 160 244
                C 230 198, 300 152, 300 106
                C 300 66, 276 34, 238 34
                C 206 34, 176 56, 160 86
                Z
              "
              stroke="#D4C3B2"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              fill="none"
            />
          </g>

          {/* ==================== 2. MAIN ROUND & PLUMP HEART CUSHION ==================== */}
          <g id="plump-round-heart">
            {/* Plump Heart Body - Round & Bulbous Bézier Curves */}
            <path
              d="
                M 160 88
                C 146 58, 118 36, 84 36
                C 46 36, 22 68, 22 108
                C 22 154, 94 200, 160 244
                C 226 200, 298 154, 298 108
                C 298 68, 274 36, 236 36
                C 202 36, 174 58, 160 88
                Z
              "
              fill="url(#plumpHeartShading)"
              stroke="#E8DDD0"
              strokeWidth="1.2"
            />

            {/* Left Lobe Bulbous Round Highlight */}
            <ellipse
              cx="92"
              cy="84"
              rx="48"
              ry="38"
              fill="url(#leftLobeGlow)"
            />

            {/* Right Lobe Bulbous Round Highlight */}
            <ellipse
              cx="228"
              cy="84"
              rx="48"
              ry="38"
              fill="url(#rightLobeGlow)"
            />

            {/* Embossed Lace Floral Relief Patterns (Delicate Tone-on-Tone) */}
            <g stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8">
              {/* Left side floral branch & scroll */}
              <path d="M 72 100 C 65 118, 76 138, 96 148 C 114 156, 134 148, 140 134" />
              <path d="M 80 110 C 92 104, 102 112, 100 124 C 98 132, 88 136, 80 128" />
              <circle cx="68" cy="116" r="3.5" fill="#FAF6F0" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="88" cy="144" r="3" fill="#FAF6F0" stroke="#FFFFFF" strokeWidth="1" />

              {/* Right side floral branch & scroll */}
              <path d="M 248 100 C 255 118, 244 138, 224 148 C 206 156, 186 148, 180 134" />
              <path d="M 240 110 C 228 104, 218 112, 220 124 C 222 132, 232 136, 240 128" />
              <circle cx="252" cy="116" r="3.5" fill="#FAF6F0" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="232" cy="144" r="3" fill="#FAF6F0" stroke="#FFFFFF" strokeWidth="1" />

              {/* Bottom heart crevice floral scroll */}
              <path d="M 144 176 C 152 188, 160 200, 160 216" strokeWidth="1.8" />
              <path d="M 176 176 C 168 188, 160 200, 160 216" strokeWidth="1.8" />
            </g>

            {/* Soft Shadow Crease on Lace Embossing */}
            <g stroke="#C6B5A2" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5">
              <path d="M 73 101 C 66 119, 77 139, 97 149" />
              <path d="M 247 101 C 254 119, 243 139, 223 149" />
            </g>

            {/* Pierced Eyelet Holes along the Inner Curve (Crochet eyelets) */}
            <g fill="#D0BFAD" opacity="0.6">
              {/* Left eyelet dots */}
              <circle cx="140" cy="64" r="2.2" />
              <circle cx="114" cy="50" r="2.2" />
              <circle cx="86" cy="48" r="2.2" />
              <circle cx="60" cy="62" r="2.2" />
              <circle cx="44" cy="86" r="2.2" />
              <circle cx="42" cy="116" r="2.2" />
              <circle cx="56" cy="144" r="2.2" />
              <circle cx="80" cy="172" r="2.2" />
              <circle cx="110" cy="198" r="2.2" />
              <circle cx="138" cy="222" r="2.2" />

              {/* Right eyelet dots */}
              <circle cx="180" cy="64" r="2.2" />
              <circle cx="206" cy="50" r="2.2" />
              <circle cx="234" cy="48" r="2.2" />
              <circle cx="260" cy="62" r="2.2" />
              <circle cx="276" cy="86" r="2.2" />
              <circle cx="278" cy="116" r="2.2" />
              <circle cx="264" cy="144" r="2.2" />
              <circle cx="240" cy="172" r="2.2" />
              <circle cx="210" cy="198" r="2.2" />
              <circle cx="182" cy="222" r="2.2" />
            </g>
          </g>

          {/* ==================== 3. DAINTY WHITE SATIN RIBBON BOW ==================== */}
          <g id="white-satin-bow" transform="translate(160, 126)">
            {/* Satin Tails Soft Shadows */}
            <path
              d="M -6 10 C -15 30 -29 54 -40 72 L -24 67 L -17 76 C -5 54 -2 32 1 10 Z"
              fill="#9C8775"
              opacity="0.25"
            />
            <path
              d="M 6 10 C 15 30 29 54 40 72 L 24 67 L 17 76 C 5 54 2 32 -1 10 Z"
              fill="#9C8775"
              opacity="0.25"
            />

            {/* Left Satin Ribbon Tail */}
            <path
              d="M -6 8 C -15 28 -29 52 -40 70 L -24 65 L -17 74 C -5 52 -2 30 1 8 Z"
              fill="url(#satinTailL)"
              stroke="#DFD3C6"
              strokeWidth="0.8"
            />

            {/* Right Satin Ribbon Tail */}
            <path
              d="M 6 8 C 15 28 29 52 40 70 L 24 65 L 17 74 C 5 52 2 30 -1 8 Z"
              fill="url(#satinTailR)"
              stroke="#DFD3C6"
              strokeWidth="0.8"
            />

            {/* Left Satin Bow Loop */}
            <path
              d="M 0 -3 C -18 -22 -52 -18 -58 0 C -64 16 -40 24 -12 8 C -4 4 0 0 0 -3 Z"
              fill="url(#satinLeftLoop)"
              stroke="#DFD3C6"
              strokeWidth="1.2"
            />
            {/* Left loop inner silk sheen & shadow crease */}
            <path
              d="M -10 2 C -22 4 -38 2 -46 -2 C -36 -10 -20 -8 -10 -2 Z"
              fill="#BFAF9E"
              opacity="0.35"
            />
            {/* Top specular highlight on left loop */}
            <path
              d="M -48 -6 C -38 -16 -18 -16 -4 -4"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Right Satin Bow Loop */}
            <path
              d="M 0 -3 C 18 -22 52 -18 58 0 C 64 16 40 24 12 8 C 4 4 0 0 0 -3 Z"
              fill="url(#satinRightLoop)"
              stroke="#DFD3C6"
              strokeWidth="1.2"
            />
            {/* Right loop inner silk sheen & shadow crease */}
            <path
              d="M 10 2 C 22 4 38 2 46 -2 C 36 -10 20 -8 10 -2 Z"
              fill="#BFAF9E"
              opacity="0.35"
            />
            {/* Top specular highlight on right loop */}
            <path
              d="M 48 -6 C 38 -16 18 -16 4 -4"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />

            {/* Center Satin Bow Knot */}
            <rect
              x="-8"
              y="-8"
              width="16"
              height="16"
              rx="5"
              fill="url(#satinKnotGrad)"
              stroke="#D2C3B4"
              strokeWidth="1.2"
            />
            {/* Knot Highlight */}
            <path
              d="M -5 -5 Q 0 -8 5 -5"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ==================== 4. FLOATING PASTEL STARS & BLOSSOMS ==================== */}
          {/* Top-Right Golden Yellow Sparkle Star (✨) with yellow comet ray trail */}
          <g transform="translate(242, 22)">
            <path d="M -6 10 L 14 -10" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
            <path
              d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z"
              fill="#FACC15"
              stroke="#FEF08A"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
          </g>

          {/* Tiny Yellow Sparkle Dot near Top Right */}
          <g transform="translate(228, 48) scale(0.7)">
            <path d="M 0 -10 Q 0 0 10 0 Q 0 0 0 10 Q 0 0 -10 0 Q 0 0 0 -10 Z" fill="#FBBF24" />
          </g>

          {/* Top-Center Magenta Pink Sparkle Star (✦) */}
          <g transform="translate(186, 42) scale(1)">
            <path
              d="M 0 -15 Q 0 0 15 0 Q 0 0 0 15 Q 0 0 -15 0 Q 0 0 0 -15 Z"
              fill="#F43F5E"
              stroke="#FDA4AF"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
          </g>

          {/* Left Top Pastel Pink 4-Point Star */}
          <g transform="translate(100, 32) scale(0.75)">
            <path d="M 0 -12 Q 0 0 12 0 Q 0 0 0 12 Q 0 0 -12 0 Q 0 0 0 -12 Z" fill="#F472B6" />
          </g>

          {/* Left Mini Pastel Peach Blossom (🌸) */}
          <g transform="translate(98, 92) scale(0.8)">
            <circle cx="0" cy="-6" r="4.5" fill="#FBCFE8" />
            <circle cx="6" cy="-2" r="4.5" fill="#FBCFE8" />
            <circle cx="4" cy="5" r="4.5" fill="#FBCFE8" />
            <circle cx="-4" cy="5" r="4.5" fill="#FBCFE8" />
            <circle cx="-6" cy="-2" r="4.5" fill="#FBCFE8" />
            <circle cx="0" cy="0" r="2.2" fill="#F43F5E" />
          </g>

          {/* Right Mini Pastel Peach Blossom (🌸) */}
          <g transform="translate(258, 80) scale(0.8)">
            <circle cx="0" cy="-6" r="4.5" fill="#FBCFE8" />
            <circle cx="6" cy="-2" r="4.5" fill="#FBCFE8" />
            <circle cx="4" cy="5" r="4.5" fill="#FBCFE8" />
            <circle cx="-4" cy="5" r="4.5" fill="#FBCFE8" />
            <circle cx="-6" cy="-2" r="4.5" fill="#FBCFE8" />
            <circle cx="0" cy="0" r="2.2" fill="#F43F5E" />
          </g>

          {/* Floating pink sparkle dust */}
          <circle cx="78" cy="65" r="1.5" fill="#F472B6" opacity="0.8" />
          <circle cx="236" cy="108" r="1.8" fill="#FBBF24" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};
