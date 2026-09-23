import React from 'react';

interface RedVelvetBowProps {
  className?: string;
  isOpen?: boolean;
}

export const RedVelvetBow: React.FC<RedVelvetBowProps> = ({
  className = '',
  isOpen = false,
}) => {
  return (
    <div
      className={`relative select-none transition-transform duration-500 group-hover:scale-105 group-active:scale-95 ${className}`}
      style={{
        filter:
          'drop-shadow(0 22px 35px rgba(110, 0, 15, 0.45)) drop-shadow(0 4px 10px rgba(0, 0, 0, 0.25))',
      }}
    >
      <svg
        className="w-76 h-88 sm:w-92 sm:h-104 md:w-[410px] md:h-[470px] max-w-[92vw] max-h-[68vh]"
        viewBox="0 0 380 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Authentic Velvet Micro-pile Texture */}
          <filter id="velvetPile" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 0.11 0"
              result="softNoise"
            />
            <feBlend in="SourceGraphic" in2="softNoise" mode="multiply" />
          </filter>

          {/* Left Wing Main Velvet Gradient */}
          <radialGradient
            id="leftWingVelvet"
            cx="36%"
            cy="32%"
            r="68%"
            fx="30%"
            fy="26%"
          >
            <stop offset="0%" stopColor="#FF7A92" />
            <stop offset="14%" stopColor="#E61A3C" />
            <stop offset="42%" stopColor="#B30823" />
            <stop offset="72%" stopColor="#7E0013" />
            <stop offset="100%" stopColor="#450008" />
          </radialGradient>

          {/* Right Wing Main Velvet Gradient */}
          <radialGradient
            id="rightWingVelvet"
            cx="64%"
            cy="32%"
            r="68%"
            fx="70%"
            fy="26%"
          >
            <stop offset="0%" stopColor="#FF7A92" />
            <stop offset="14%" stopColor="#E61A3C" />
            <stop offset="42%" stopColor="#B30823" />
            <stop offset="72%" stopColor="#7E0013" />
            <stop offset="100%" stopColor="#450008" />
          </radialGradient>

          {/* Deep Shadow Fold Gradient for Inner Pockets */}
          <linearGradient id="innerCavityShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#280005" />
            <stop offset="45%" stopColor="#4D000C" />
            <stop offset="100%" stopColor="#820518" />
          </linearGradient>

          {/* Center Velvet Knot Gradient */}
          <radialGradient
            id="centerKnotVelvet"
            cx="48%"
            cy="32%"
            r="65%"
          >
            <stop offset="0%" stopColor="#FFA8B8" />
            <stop offset="20%" stopColor="#E61E40" />
            <stop offset="55%" stopColor="#A80922" />
            <stop offset="85%" stopColor="#63000E" />
            <stop offset="100%" stopColor="#330005" />
          </radialGradient>

          {/* Left Hanging Tail Velvet Gradient */}
          <linearGradient
            id="leftTailVelvet"
            x1="20%"
            y1="0%"
            x2="45%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#9E0A1E" />
            <stop offset="22%" stopColor="#CF1533" />
            <stop offset="48%" stopColor="#A3081D" />
            <stop offset="78%" stopColor="#6E0010" />
            <stop offset="100%" stopColor="#3C0006" />
          </linearGradient>

          {/* Right Hanging Tail Velvet Gradient */}
          <linearGradient
            id="rightTailVelvet"
            x1="80%"
            y1="0%"
            x2="55%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#9E0A1E" />
            <stop offset="22%" stopColor="#CF1533" />
            <stop offset="48%" stopColor="#A3081D" />
            <stop offset="78%" stopColor="#6E0010" />
            <stop offset="100%" stopColor="#3C0006" />
          </linearGradient>

          {/* Velvet Sheen Streak */}
          <linearGradient id="velvetSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFE8ED" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Soft Golden Heart Clasp */}
          <linearGradient id="bowGoldClasp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="35%" stopColor="#F8CB60" />
            <stop offset="70%" stopColor="#D49A24" />
            <stop offset="100%" stopColor="#8A5A0A" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* 1. LAYER 1: CASCADING VELVET RIBBON TAILS (2 DẢI ĐUÔI NƠ NHUNG DÀI) */}
        {/* ================================================================= */}
        <g id="bow-tails" filter="url(#velvetPile)">
          {/* Depth shadow behind tails */}
          <path
            d="M 168 180 C 148 260 120 345 92 442 L 148 358 L 175 432 C 185 320 185 240 185 180 Z"
            fill="#1E0003"
            opacity="0.45"
            transform="translate(3, 6)"
          />
          <path
            d="M 212 180 C 232 260 260 345 288 442 L 232 358 L 205 432 C 195 320 195 240 195 180 Z"
            fill="#1E0003"
            opacity="0.45"
            transform="translate(-3, 6)"
          />

          {/* LEFT VELVET TAIL */}
          <g id="left-tail">
            {/* Outer main silhouette with characteristic diagonal cut tip */}
            <path
              d="M 166 172 
                 C 152 230 134 300 114 372
                 C 104 402 96 428 90 445
                 L 142 358
                 L 162 432
                 C 174 345 178 260 184 176 Z"
              fill="url(#leftTailVelvet)"
              stroke="#4E0008"
              strokeWidth="1.2"
            />

            {/* Longitudinal Velvet Shadow Valley 1 */}
            <path
              d="M 166 172
                 C 150 250 130 325 114 372
                 L 128 366
                 C 144 305 160 228 172 176 Z"
              fill="#360005"
              opacity="0.88"
            />

            {/* Longitudinal Velvet Highlight Ridge 1 */}
            <path
              d="M 172 176
                 C 156 250 138 325 128 366
                 L 142 358
                 C 154 310 170 234 178 176 Z"
              fill="#E62040"
              opacity="0.95"
            />

            {/* Longitudinal Velvet Sheen Highlight 2 on outer flare */}
            <path
              d="M 152 205
                 C 138 270 122 340 102 432
                 L 108 427
                 C 126 338 144 268 156 205 Z"
              fill="#FF8A9E"
              opacity="0.5"
            />

            {/* Velvet Shadow Valley on inner drapery */}
            <path
              d="M 142 358
                 L 162 432
                 C 170 365 176 295 182 215
                 L 176 215
                 C 170 290 162 360 152 424 Z"
              fill="#2C0004"
              opacity="0.8"
            />

            {/* Soft luminous velvet sheen stroke */}
            <path
              d="M 164 185 C 150 255 134 325 118 395"
              stroke="url(#velvetSheen)"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>

          {/* RIGHT VELVET TAIL */}
          <g id="right-tail">
            {/* Outer main silhouette with characteristic diagonal cut tip */}
            <path
              d="M 214 172 
                 C 228 230 246 300 266 372
                 C 276 402 284 428 290 445
                 L 238 358
                 L 218 432
                 C 206 345 202 260 196 176 Z"
              fill="url(#rightTailVelvet)"
              stroke="#4E0008"
              strokeWidth="1.2"
            />

            {/* Longitudinal Velvet Shadow Valley 1 */}
            <path
              d="M 214 172
                 C 230 250 250 325 266 372
                 L 252 366
                 C 236 305 220 228 208 176 Z"
              fill="#360005"
              opacity="0.88"
            />

            {/* Longitudinal Velvet Highlight Ridge 1 */}
            <path
              d="M 208 176
                 C 224 250 242 325 252 366
                 L 238 358
                 C 226 310 210 234 202 176 Z"
              fill="#E62040"
              opacity="0.95"
            />

            {/* Longitudinal Velvet Sheen Highlight 2 on outer flare */}
            <path
              d="M 228 205
                 C 242 270 258 340 278 432
                 L 272 427
                 C 254 338 236 268 224 205 Z"
              fill="#FF8A9E"
              opacity="0.5"
            />

            {/* Velvet Shadow Valley on inner drapery */}
            <path
              d="M 238 358
                 L 218 432
                 C 210 365 204 295 198 215
                 L 204 215
                 C 210 290 218 360 228 424 Z"
              fill="#2C0004"
              opacity="0.8"
            />

            {/* Soft luminous velvet sheen stroke */}
            <path
              d="M 216 185 C 230 255 246 325 262 395"
              stroke="url(#velvetSheen)"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>
        </g>

        {/* ================================================================= */}
        {/* 2. LAYER 2: VOLUPTUOUS VELVET BOW WINGS (CÁNH NƠ NHUNG ĐỎ TO BỒNG BỀNH) */}
        {/* ================================================================= */}
        <g id="bow-wings" filter="url(#velvetPile)">
          {/* Wing Cast Shadows onto background */}
          <path
            d="M 172 165 C 132 88 58 80 24 125 C -6 170 14 225 64 248 C 118 268 158 218 176 178 Z"
            fill="#1E0003"
            opacity="0.4"
            transform="translate(4, 8)"
          />
          <path
            d="M 208 165 C 248 88 322 80 356 125 C 386 170 366 225 316 248 C 262 268 222 218 204 178 Z"
            fill="#1E0003"
            opacity="0.4"
            transform="translate(-4, 8)"
          />

          {/* ---------------- LEFT VELVET LOOP (CÁNH NƠ TRÁI) ---------------- */}
          <g id="left-loop">
            {/* Outer Flared Wing Body - Replicating photo's wing contour */}
            <path
              d="M 180 156
                 C 150 102 96 85 52 98
                 C 20 108 4 138 8 178
                 C 12 216 42 248 86 258
                 C 134 268 168 222 182 178 Z"
              fill="url(#leftWingVelvet)"
              stroke="#4E0008"
              strokeWidth="1.5"
            />

            {/* Deep Velvet Pocket / Inner Cavity Fold (Hốc cuộn 3D sâu) */}
            <path
              d="M 178 158
                 C 138 122 88 130 62 162
                 C 82 186 132 184 174 172 Z"
              fill="url(#innerCavityShadow)"
              stroke="#240003"
              strokeWidth="1.2"
            />

            {/* Upper Velvet Crease Fold Ridge */}
            <path
              d="M 170 152
                 C 134 106 82 100 48 118
                 C 34 125 24 138 18 155
                 C 26 140 48 124 76 118
                 C 116 110 152 132 172 154 Z"
              fill="#FF7890"
              opacity="0.65"
            />

            {/* Mid Velvet Shadow Crease (Nếp nhăn dập nổi bóng tối) */}
            <path
              d="M 174 172
                 C 138 178 96 188 56 172
                 C 48 186 58 208 82 224
                 C 116 244 154 218 176 182 Z"
              fill="#60000C"
              opacity="0.75"
            />

            {/* Lower Velvet Highlight Lobe (Gờ phồng nhung bên dưới) */}
            <path
              d="M 82 224
                 C 114 248 148 232 174 190
                 L 172 200
                 C 142 246 106 258 74 234 Z"
              fill="#E61E3E"
              opacity="0.85"
            />

            {/* Specular Velvet Sheen Glow on upper crest */}
            <ellipse
              cx="74"
              cy="118"
              rx="40"
              ry="13"
              transform="rotate(-20 74 118)"
              fill="url(#velvetSheen)"
              opacity="0.7"
            />

            {/* Soft Velvet Edge Luster */}
            <path
              d="M 22 136 C 14 162 18 198 38 226"
              stroke="#FFAAB8"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          </g>

          {/* ---------------- RIGHT VELVET LOOP (CÁNH NƠ PHẢI) ---------------- */}
          <g id="right-loop">
            {/* Outer Flared Wing Body - Replicating photo's wing contour */}
            <path
              d="M 200 156
                 C 230 102 284 85 328 98
                 C 360 108 376 138 372 178
                 C 368 216 338 248 294 258
                 C 246 268 212 222 198 178 Z"
              fill="url(#rightWingVelvet)"
              stroke="#4E0008"
              strokeWidth="1.5"
            />

            {/* Deep Velvet Pocket / Inner Cavity Fold */}
            <path
              d="M 202 158
                 C 242 122 292 130 318 162
                 C 298 186 248 184 206 172 Z"
              fill="url(#innerCavityShadow)"
              stroke="#240003"
              strokeWidth="1.2"
            />

            {/* Upper Velvet Crease Fold Ridge */}
            <path
              d="M 210 152
                 C 246 106 298 100 332 118
                 C 346 125 356 138 362 155
                 C 354 140 332 124 304 118
                 C 264 110 228 132 208 154 Z"
              fill="#FF7890"
              opacity="0.65"
            />

            {/* Mid Velvet Shadow Crease */}
            <path
              d="M 206 172
                 C 242 178 284 188 324 172
                 C 332 186 322 208 298 224
                 C 264 244 226 218 204 182 Z"
              fill="#60000C"
              opacity="0.75"
            />

            {/* Lower Velvet Highlight Lobe */}
            <path
              d="M 298 224
                 C 266 248 232 232 206 190
                 L 208 200
                 C 238 246 274 258 306 234 Z"
              fill="#E61E3E"
              opacity="0.85"
            />

            {/* Specular Velvet Sheen Glow on upper crest */}
            <ellipse
              cx="306"
              cy="118"
              rx="40"
              ry="13"
              transform="rotate(20 306 118)"
              fill="url(#velvetSheen)"
              opacity="0.7"
            />

            {/* Soft Velvet Edge Luster */}
            <path
              d="M 358 136 C 366 162 362 198 342 226"
              stroke="#FFAAB8"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          </g>
        </g>

        {/* ================================================================= */}
        {/* 3. LAYER 3: CENTER VELVET KNOT (NÚT THẮT NHUNG ĐỎ SANG TRỌNG XẾP LY) */}
        {/* ================================================================= */}
        <g id="center-knot" filter="url(#velvetPile)">
          {/* Knot Contact Shadow */}
          <ellipse
            cx="190"
            cy="182"
            rx="26"
            ry="32"
            fill="#1E0003"
            opacity="0.55"
            transform="translate(0, 4)"
          />

          {/* Main Wrapped Knot Barrel */}
          <rect
            x="171"
            y="152"
            width="38"
            height="58"
            rx="13"
            fill="url(#centerKnotVelvet)"
            stroke="#4C0008"
            strokeWidth="1.6"
          />

          {/* Vertical Fabric Gather Pleats (Nếp gấp nhung dập nổi giữa nút thắt) */}
          <path
            d="M 178 155 C 182 172 182 192 178 207"
            stroke="#300005"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 180 155 C 184 172 184 192 180 207"
            stroke="#FF94A6"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.8"
          />

          <path
            d="M 190 153 C 191 172 191 192 190 209"
            stroke="#FFB8C6"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.9"
          />

          <path
            d="M 200 155 C 196 172 196 192 200 207"
            stroke="#3E0007"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 202 155 C 198 172 198 192 202 207"
            stroke="#FF94A6"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Top highlight pillow edge on knot */}
          <path
            d="M 176 156 C 184 153 196 153 204 156"
            stroke="#FFF0F3"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Bottom shadow edge on knot */}
          <path
            d="M 176 206 C 184 208 196 208 204 206"
            stroke="#240003"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
