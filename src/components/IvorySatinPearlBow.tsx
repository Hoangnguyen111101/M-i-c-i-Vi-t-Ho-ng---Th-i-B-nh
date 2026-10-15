import React from 'react';

interface IvorySatinPearlBowProps {
  className?: string;
  isOpen?: boolean;
}

export const IvorySatinPearlBow: React.FC<IvorySatinPearlBowProps> = ({
  className = '',
  isOpen = false,
}) => {
  return (
    <div
      className={`relative select-none transition-transform duration-500 group-hover:scale-105 group-active:scale-95 ${className}`}
      style={{
        filter:
          'drop-shadow(0 16px 28px rgba(78, 56, 42, 0.22)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.08))',
      }}
    >
      <svg
        viewBox="0 0 540 440"
        className="w-80 h-auto sm:w-[420px] md:w-[490px] max-w-[94vw] max-h-[66vh] object-contain pointer-events-none select-none transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* =========================================================================
              FILTERS FOR REALISTIC SATIN SHADOWS
             ========================================================================= */}
          {/* Soft Shadow for Bow and Tails over cardstock */}
          <filter id="bowCastShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#3F2B1E" floodOpacity="0.18" />
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3F2B1E" floodOpacity="0.12" />
          </filter>

          {/* Knot Shadow onto Tails & Loops */}
          <filter id="knotShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#483324" floodOpacity="0.32" />
          </filter>

          {/* Pearl Drop Shadow */}
          <filter id="pearlShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#422E1F" floodOpacity="0.3" />
          </filter>

          {/* =========================================================================
              GRADIENTS: SATIN SILK, PEARL SPHERICALS
             ========================================================================= */}

          {/* Left Loop Front Satin Gradient */}
          <linearGradient id="leftLoopGrad" x1="30%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFFDF9" />
            <stop offset="55%" stopColor="#F7EFE4" />
            <stop offset="85%" stopColor="#EADDCB" />
            <stop offset="100%" stopColor="#D4C1AC" />
          </linearGradient>

          {/* Right Loop Front Satin Gradient */}
          <linearGradient id="rightLoopGrad" x1="70%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFFDF9" />
            <stop offset="55%" stopColor="#F7EFE4" />
            <stop offset="85%" stopColor="#EADDCB" />
            <stop offset="100%" stopColor="#D4C1AC" />
          </linearGradient>

          {/* Loop Cavity Inside Shadow (Left) */}
          <linearGradient id="leftCavityGrad" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#DBCBB8" />
            <stop offset="60%" stopColor="#BEA890" />
            <stop offset="100%" stopColor="#A48C74" />
          </linearGradient>

          {/* Loop Cavity Inside Shadow (Right) */}
          <linearGradient id="rightCavityGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#DBCBB8" />
            <stop offset="60%" stopColor="#BEA890" />
            <stop offset="100%" stopColor="#A48C74" />
          </linearGradient>

          {/* Center Knot Vertical Wrap Gradient */}
          <linearGradient id="knotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D6C5B2" />
            <stop offset="18%" stopColor="#EFE5D7" />
            <stop offset="42%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#FFFFFF" />
            <stop offset="82%" stopColor="#E8DC CD" />
            <stop offset="100%" stopColor="#C9B8A4" />
          </linearGradient>

          {/* Left Tail Satin Draped Gradient */}
          <linearGradient id="leftTailGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#EFE3D4" />
            <stop offset="25%" stopColor="#FFFDF8" />
            <stop offset="55%" stopColor="#F6EEE2" />
            <stop offset="85%" stopColor="#E2D1BE" />
            <stop offset="100%" stopColor="#C8B49E" />
          </linearGradient>

          {/* Right Tail Satin Draped Gradient */}
          <linearGradient id="rightTailGrad" x1="80%" y1="0%" x2="20%" y2="100%">
            <stop offset="0%" stopColor="#EFE3D4" />
            <stop offset="25%" stopColor="#FFFDF8" />
            <stop offset="55%" stopColor="#F6EEE2" />
            <stop offset="85%" stopColor="#E2D1BE" />
            <stop offset="100%" stopColor="#C8B49E" />
          </linearGradient>

          {/* Pearl 3D Spherical Radial Gradient */}
          <radialGradient id="pearlSphereGrad" cx="35%" cy="32%" r="62%" fx="30%" fy="26%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="22%" stopColor="#FFFDF9" />
            <stop offset="55%" stopColor="#F7F1E7" />
            <stop offset="82%" stopColor="#DFD2C0" />
            <stop offset="96%" stopColor="#C6B5A1" />
            <stop offset="100%" stopColor="#AE9C86" />
          </radialGradient>
        </defs>


        {/* =========================================================================
            LAYER 3: THE HAUTE COUTURE IVORY SILK SATIN BOW
           ========================================================================= */}
        <g filter="url(#bowCastShadow)">
          {/* ---------- 3A. LEFT DRAPING TAIL WITH SWALLOWTAIL V-NOTCH ---------- */}
          <g>
            {/* Left Tail Soft Drop Shadow on Card */}
            <path
              d="M 258 202 L 180 326 L 208 290 L 228 310 L 265 210 Z"
              fill="#3A281C"
              opacity="0.14"
              transform="translate(-2, 6)"
              filter="blur(4px)"
            />
            {/* Left Tail Main Silk Ribbon Body */}
            <path
              d="M 256 195 
                 C 250 205 240 220 226 245
                 C 208 278 190 310 178 328
                 L 208 290
                 L 228 312
                 C 238 288 252 250 262 216
                 Z"
              fill="url(#leftTailGrad)"
            />
            {/* Left Tail Inner Longitudinal Crease & Lustrous Sheen */}
            <path
              d="M 254 200
                 C 236 230 216 270 208 290
                 C 214 266 234 230 258 205
                 Z"
              fill="#FFFFFF"
              opacity="0.65"
            />
            {/* Outer edge crisp bevel */}
            <path
              d="M 256 195 C 240 220 208 278 178 328"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.75"
            />
            {/* Shadow fold near knot juncture */}
            <path
              d="M 254 200 C 250 212 245 224 240 236"
              stroke="#BAA692"
              strokeWidth="1.2"
              opacity="0.4"
            />
          </g>

          {/* ---------- 3B. RIGHT DRAPING TAIL WITH SWALLOWTAIL V-NOTCH ---------- */}
          <g>
            {/* Right Tail Soft Drop Shadow on Card */}
            <path
              d="M 282 202 L 360 326 L 332 290 L 312 310 L 275 210 Z"
              fill="#3A281C"
              opacity="0.14"
              transform="translate(2, 6)"
              filter="blur(4px)"
            />
            {/* Right Tail Main Silk Ribbon Body */}
            <path
              d="M 284 195 
                 C 290 205 300 220 314 245
                 C 332 278 350 310 362 328
                 L 332 290
                 L 312 312
                 C 302 288 288 250 278 216
                 Z"
              fill="url(#rightTailGrad)"
            />
            {/* Right Tail Inner Longitudinal Crease & Lustrous Sheen */}
            <path
              d="M 286 200
                 C 304 230 324 270 332 290
                 C 326 266 306 230 282 205
                 Z"
              fill="#FFFFFF"
              opacity="0.65"
            />
            {/* Outer edge crisp bevel */}
            <path
              d="M 284 195 C 300 220 332 278 362 328"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.75"
            />
            {/* Shadow fold near knot juncture */}
            <path
              d="M 286 200 C 290 212 295 224 300 236"
              stroke="#BAA692"
              strokeWidth="1.2"
              opacity="0.4"
            />
          </g>

          {/* ---------- 3C. LEFT BOW LOOP (CÁNH NƠ TRÁI) ---------- */}
          <g>
            {/* Hollow Cavity / Inside Shadow of Left Loop */}
            <path
              d="M 252 186
                 C 220 162 175 145 152 165
                 C 142 174 142 190 156 200
                 C 180 214 225 204 252 195
                 Z"
              fill="url(#leftCavityGrad)"
            />

            {/* Front Satin Surface of Left Loop */}
            <path
              d="M 255 174
                 C 225 152 178 142 148 160
                 C 132 170 130 190 142 204
                 C 156 218 190 222 254 206
                 C 246 195 246 185 255 174
                 Z"
              fill="url(#leftLoopGrad)"
            />

            {/* Top Luminous Silk Specular Sheen (Curving Along the Arch) */}
            <path
              d="M 250 176
                 C 222 155 182 146 154 163
                 C 144 169 138 180 144 188
                 C 148 178 160 165 186 156
                 C 214 148 244 165 250 176
                 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Subtle soft fold lines feeding into knot */}
            <path
              d="M 252 188 C 235 190 210 195 185 192"
              stroke="#D6C4B0"
              strokeWidth="1.2"
              opacity="0.45"
              fill="none"
            />
          </g>

          {/* ---------- 3D. RIGHT BOW LOOP (CÁNH NƠ PHẢI) ---------- */}
          <g>
            {/* Hollow Cavity / Inside Shadow of Right Loop */}
            <path
              d="M 288 186
                 C 320 162 365 145 388 165
                 C 398 174 398 190 384 200
                 C 360 214 315 204 288 195
                 Z"
              fill="url(#rightCavityGrad)"
            />

            {/* Front Satin Surface of Right Loop */}
            <path
              d="M 285 174
                 C 315 152 362 142 392 160
                 C 408 170 410 190 398 204
                 C 384 218 350 222 286 206
                 C 294 195 294 185 285 174
                 Z"
              fill="url(#rightLoopGrad)"
            />

            {/* Top Luminous Silk Specular Sheen (Curving Along the Arch) */}
            <path
              d="M 290 176
                 C 318 155 358 146 386 163
                 C 396 169 402 180 396 188
                 C 392 178 380 165 354 156
                 C 326 148 296 165 290 176
                 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Subtle soft fold lines feeding into knot */}
            <path
              d="M 288 188 C 305 190 330 195 355 192"
              stroke="#D6C4B0"
              strokeWidth="1.2"
              opacity="0.45"
              fill="none"
            />
          </g>

          {/* ---------- 3E. CENTER KNOT (NÚT THẮT CHÍNH GIỮA) ---------- */}
          <g filter="url(#knotShadow)">
            {/* Knot Main Cylindrical Wrapped Body */}
            <path
              d="M 254 172
                 C 260 169 280 169 286 172
                 C 289 178 288 206 286 214
                 C 280 217 260 217 254 214
                 C 251 206 252 178 254 172
                 Z"
              fill="url(#knotGrad)"
            />
            {/* Top rounded wrap fold */}
            <path
              d="M 254 172 C 262 170 278 170 286 172"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              opacity="0.9"
            />
            {/* Vertical Crest Highlight (Gloss reflection down the center fold) */}
            <path
              d="M 268 172 L 268 214"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.85"
            />
            {/* Subtle fabric wrinkle / indentation in knot */}
            <path
              d="M 257 194 C 263 192 277 192 283 194"
              stroke="#D1BEAA"
              strokeWidth="0.8"
              opacity="0.4"
            />
            {/* Bottom wrap rim shadow */}
            <path
              d="M 254 214 C 262 216 278 216 286 214"
              stroke="#A89480"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        </g>

        {/* =========================================================================
            LAYER 4: THE THREE GLISTENING PEARLS (3 VIÊN NGỌC TRAI TRÒN TRỊA)
            Directly below the knot, nestling between the two diverging tails
           ========================================================================= */}
        <g filter="url(#pearlShadow)">
          {/* Pearl 1: Left (X: 248, Y: 242, R: 8.5) */}
          <g>
            <circle cx="248" cy="242" r="8.5" fill="url(#pearlSphereGrad)" />
            {/* Specular bright glint */}
            <circle cx="245.5" cy="239.5" r="2.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="244.5" cy="238.5" r="0.8" fill="#FFFFFF" />
          </g>

          {/* Pearl 2: Center (X: 270, Y: 242, R: 9) */}
          <g>
            <circle cx="270" cy="242" r="9" fill="url(#pearlSphereGrad)" />
            {/* Specular bright glint */}
            <circle cx="267.5" cy="239.2" r="2.4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="266.2" cy="238" r="0.9" fill="#FFFFFF" />
          </g>

          {/* Pearl 3: Right (X: 292, Y: 242, R: 8.5) */}
          <g>
            <circle cx="292" cy="242" r="8.5" fill="url(#pearlSphereGrad)" />
            {/* Specular bright glint */}
            <circle cx="289.5" cy="239.5" r="2.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="288.5" cy="238.5" r="0.8" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
};
