import React from 'react';

interface FloralEmbossPatternProps {
  side: 'left' | 'right';
}

export const FloralEmbossPattern: React.FC<FloralEmbossPatternProps> = ({ side }) => {
  const isLeft = side === 'left';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Luxury fine paper grain texture */}
      <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-multiply pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id={`paperGrain_${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.8  0 0 0 0 0.75  0 0 0 0.45 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#paperGrain_${side})`} />
      </svg>

      {/* Subtle radial lighting to give a gentle dome highlight across the paper */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.7)_0%,transparent_75%)]" />

      {/* Book page edge effect: layered vertical paper edges on outer margin */}
      <div
        className={`absolute top-0 bottom-0 ${
          isLeft ? 'left-0 border-r border-[#E3D4C5]' : 'right-0 border-l border-[#E3D4C5]'
        } w-3.5 sm:w-6 flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} justify-between px-1 bg-gradient-to-r from-[#F4ECE3] to-[#FAF6F0] shadow-sm opacity-80`}
      >
        <div className="w-[1px] h-full bg-[#DDCFBF] opacity-70" />
        <div className="w-[1px] h-full bg-[#FFFFFF] opacity-90" />
        <div className="w-[1px] h-full bg-[#E5D7C8] opacity-60" />
        <div className="w-[1px] h-full bg-[#D6C5B3] opacity-50" />
      </div>

      {/* Inner spine / fold shading near center split */}
      <div
        className={`absolute top-0 bottom-0 ${
          isLeft ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'
        } from-black/8 to-transparent w-8 sm:w-16 pointer-events-none`}
      />

      {/* ================= TRUE BLIND EMBOSSED BOTANICAL PATTERN ================= */}
      <svg
        className={`absolute inset-0 w-full h-full object-cover ${isLeft ? '' : 'scale-x-[-1]'}`}
        viewBox="0 0 600 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Authentic Blind Embossing Filter: Tone-on-tone relief using specular light & dual drop-shadows */}
          <filter id={`trueBlindEmboss_${side}`} x="-20%" y="-20%" width="140%" height="140%">
            {/* Top-left crisp highlight */}
            <feDropShadow dx="-1.8" dy="-1.8" stdDeviation="1" floodColor="#FFFFFF" floodOpacity="0.98" />
            {/* Bottom-right warm tactile bevel shadow */}
            <feDropShadow dx="2" dy="2.8" stdDeviation="2" floodColor="#8B705C" floodOpacity="0.22" />
          </filter>

          {/* Deep Embossed Crease Filter for Leaf Veins and Petal Ribs */}
          <filter id={`embossCrease_${side}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1.2" dy="1.6" stdDeviation="1" floodColor="#8B705C" floodOpacity="0.28" />
            <feDropShadow dx="-1" dy="-1" stdDeviation="0.8" floodColor="#FFFFFF" floodOpacity="0.85" />
          </filter>

          {/* Embossed Paper Surface Color (Matches the card tone so it's genuine blind embossing) */}
          <linearGradient id={`embossPaperTone_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="50%" stopColor="#F8F4EE" />
            <stop offset="100%" stopColor="#F5EFE6" />
          </linearGradient>
        </defs>

        {/* Group with Blind Emboss Filter Applied - All elements have no dark strokes */}
        <g filter={`url(#trueBlindEmboss_${side})`}>
          {/* ================= TOP VINE & ROSE BLOSSOMS ================= */}
          {/* Main top stem curving across upper portion */}
          <path
            d="M -10 110 C 80 80 160 130 220 90 C 270 55 330 70 380 40 C 420 15 450 35 480 20"
            stroke={`url(#embossPaperTone_${side})`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Secondary branch branching toward center */}
          <path
            d="M 160 110 C 200 170 270 200 320 220 C 370 240 410 290 430 340"
            stroke={`url(#embossPaperTone_${side})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Large Embossed Camellia / Peony Flower (Top-Left Center) */}
          <g transform="translate(230, 95) rotate(-10)">
            {/* Outer Tier Petals */}
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(0)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(40)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(80)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(120)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(160)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(200)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(240)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(280)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -35 -55 35 -55 0 0 Z"
              transform="rotate(320)"
              fill={`url(#embossPaperTone_${side})`}
            />

            {/* Inner Tier Petals */}
            <circle cx="0" cy="0" r="22" fill={`url(#embossPaperTone_${side})`} />
            <path
              d="M -12 -12 C -6 -20 6 -20 12 -12 C 18 -4 14 8 6 12 C -4 16 -14 10 -12 -12 Z"
              fill={`url(#embossPaperTone_${side})`}
            />
            <circle cx="0" cy="0" r="6" fill={`url(#embossPaperTone_${side})`} />
          </g>

          {/* Embossed Leaves along Top Vine */}
          {/* Leaf 1 */}
          <path
            d="M 100 90 C 70 40 120 20 145 55 C 150 85 120 100 100 90 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          {/* Leaf 2 */}
          <path
            d="M 160 130 C 140 180 80 170 100 135 C 120 110 150 115 160 130 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          {/* Leaf 3 */}
          <path
            d="M 290 85 C 330 45 370 80 340 105 C 310 120 290 100 290 85 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          {/* Leaf 4 */}
          <path
            d="M 250 180 C 290 150 320 185 300 210 C 275 230 250 205 250 180 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          {/* Leaf 5 */}
          <path
            d="M 320 220 C 370 200 395 240 365 265 C 340 280 315 250 320 220 Z"
            fill={`url(#embossPaperTone_${side})`}
          />

          {/* Rose Bud Top Right */}
          <g transform="translate(390, 45) rotate(30)">
            <path
              d="M 0 0 C 18 -30 42 -20 30 12 C 18 30 0 25 0 0 Z"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M -6 12 C -24 -12 6 -30 12 -6 Z"
              fill={`url(#embossPaperTone_${side})`}
            />
          </g>

          {/* Secondary Rose Blossom Top Left */}
          <g transform="translate(70, 70) rotate(15)">
            <circle cx="0" cy="0" r="18" fill={`url(#embossPaperTone_${side})`} />
            <path
              d="M 0 0 C -20 -30 20 -30 0 0 Z"
              transform="rotate(0)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -20 -30 20 -30 0 0 Z"
              transform="rotate(72)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -20 -30 20 -30 0 0 Z"
              transform="rotate(144)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -20 -30 20 -30 0 0 Z"
              transform="rotate(216)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -20 -30 20 -30 0 0 Z"
              transform="rotate(288)"
              fill={`url(#embossPaperTone_${side})`}
            />
          </g>

          {/* ================= BOTTOM VINE & BLOSSOMS ================= */}
          {/* Main bottom stem */}
          <path
            d="M -10 710 C 90 740 180 660 260 720 C 320 760 390 720 450 760 C 490 785 520 760 550 780"
            stroke={`url(#embossPaperTone_${side})`}
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Branch reaching upward toward center */}
          <path
            d="M 170 680 C 210 610 280 570 330 530 C 380 490 410 440 420 380"
            stroke={`url(#embossPaperTone_${side})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom Blooming Camellia Blossom */}
          <g transform="translate(190, 685) rotate(25)">
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(0)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(50)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(100)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(150)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(200)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(250)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <path
              d="M 0 0 C -30 -45 30 -45 0 0 Z"
              transform="rotate(300)"
              fill={`url(#embossPaperTone_${side})`}
            />
            <circle cx="0" cy="0" r="18" fill={`url(#embossPaperTone_${side})`} />
            <circle cx="0" cy="0" r="5" fill={`url(#embossPaperTone_${side})`} />
          </g>

          {/* Leaves along bottom vine */}
          <path
            d="M 280 720 C 320 680 355 715 325 740 C 295 760 280 740 280 720 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          <path
            d="M 100 725 C 65 765 115 790 140 755 C 145 725 115 715 100 725 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          <path
            d="M 340 520 C 380 480 415 515 385 540 C 355 560 340 540 340 520 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
          <path
            d="M 405 430 C 445 390 480 425 450 450 C 420 470 405 450 405 430 Z"
            fill={`url(#embossPaperTone_${side})`}
          />
        </g>
      </svg>
    </div>
  );
};
