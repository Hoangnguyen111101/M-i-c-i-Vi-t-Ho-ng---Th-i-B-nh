import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Gem } from 'lucide-react';

export type RealMaterialType = 'gilded_wax' | 'cast_gold_pearl' | 'carved_plaster';

interface RealMaterialHeartSealProps {
  onClick?: () => void;
  defaultMaterial?: RealMaterialType;
}

export const RealMaterialHeartSeal: React.FC<RealMaterialHeartSealProps> = ({
  onClick,
  defaultMaterial = 'gilded_wax',
}) => {
  const [material, setMaterial] = useState<RealMaterialType>(defaultMaterial);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.35, y: -0.45 }); // Light direction
  const animFrameRef = useRef<number | null>(null);

  // Track mouse position for dynamic physical light reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.35, y: -0.45 });
  };

  // Re-render canvas when material or light direction changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const size = 680;
    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const lightX = mousePos.x;
    const lightY = mousePos.y;

    ctx.clearRect(0, 0, size, size);

    // =========================================================================
    // 1. DRAW REAL WOVEN SILK RIBBON SASH (VẢI LỤA TƠ TẰM DỆT THẬT)
    // =========================================================================
    drawRealisticSilkWovenRibbon(ctx, size, cx, cy, lightX, lightY);

    // =========================================================================
    // 2. RENDER THE PHYSICAL MATERIAL PIECE (SÁP / VÀNG / THẠCH CAO)
    // =========================================================================
    if (material === 'gilded_wax') {
      drawRealGildedWaxSeal(ctx, size, cx, cy, lightX, lightY);
    } else if (material === 'cast_gold_pearl') {
      drawRealCastGoldPearlBrooch(ctx, size, cx, cy, lightX, lightY);
    } else {
      drawRealCarvedPlasterGold(ctx, size, cx, cy, lightX, lightY);
    }

  }, [material, mousePos]);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft warm luxury ambient halo */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-[#DFBE82]/25 via-[#F3E5D0]/30 to-[#8A1A2C]/20 blur-3xl pointer-events-none" />

      {/* Main Interactive Seal Container */}
      <div
        onClick={onClick}
        className="relative cursor-pointer group transition-transform duration-500 hover:scale-[1.025] active:scale-[0.97]"
        title="Chạm vào để mở thiệp"
      >
        <canvas
          ref={canvasRef}
          className="w-60 h-60 sm:w-76 sm:h-76 md:w-88 md:h-88 filter drop-shadow-[0_24px_38px_rgba(45,20,25,0.32)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.14)]"
          style={{ width: '100%', maxWidth: '340px', height: 'auto', aspectRatio: '1/1' }}
        />
      </div>

      {/* Material Selector - Realistic Options */}
      <div
        className="mt-2 sm:mt-3 z-40 flex items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DFBE82]/50 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setMaterial('gilded_wax')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            material === 'gilded_wax'
              ? 'bg-[#7E1525] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5A3F33] hover:text-[#7E1525] hover:bg-black/5'
          }`}
        >
          <Shield className="w-3 h-3 text-[#E69F80]" />
          <span>Sáp Dát Vàng Thật</span>
        </button>

        <button
          type="button"
          onClick={() => setMaterial('cast_gold_pearl')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            material === 'cast_gold_pearl'
              ? 'bg-[#2B1B14] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5A3F33] hover:text-[#2B1B14] hover:bg-black/5'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#DFBE82]" />
          <span>Vàng 18K & Ngọc Trai</span>
        </button>

        <button
          type="button"
          onClick={() => setMaterial('carved_plaster')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            material === 'carved_plaster'
              ? 'bg-[#433831] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5A3F33] hover:text-[#433831] hover:bg-black/5'
          }`}
        >
          <Gem className="w-3 h-3 text-[#E4D6C7]" />
          <span>Điêu Khắc Mỹ Thuật</span>
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// SUB-ROUTINE: DRAW REAL WOVEN SILK SATIN RIBBON (VẢI LỤA DỆT SỢI THẬT)
// =============================================================================
function drawRealisticSilkWovenRibbon(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Draw cascading ribbon tails behind seal
  const tailWidth = 44;
  const tailLength = 170;

  // Left Tail
  ctx.save();
  ctx.translate(cx - 24, cy + 30);
  ctx.rotate(-0.18);
  ctx.shadowColor = 'rgba(30, 15, 10, 0.28)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 12;

  // Fabric gradient with subtle anisotropic sheen
  const tailGradL = ctx.createLinearGradient(0, 0, tailWidth, tailLength);
  tailGradL.addColorStop(0, '#FFFFFF');
  tailGradL.addColorStop(0.3, '#FAF7F2');
  tailGradL.addColorStop(0.7, '#E5D9CC');
  tailGradL.addColorStop(1, '#C9B8A4');

  ctx.beginPath();
  ctx.moveTo(-tailWidth / 2, 0);
  ctx.lineTo(tailWidth / 2, 0);
  ctx.lineTo(tailWidth / 2 + 10, tailLength);
  ctx.lineTo(0, tailLength - 18); // Elegant V-cut
  ctx.lineTo(-tailWidth / 2 - 10, tailLength);
  ctx.closePath();
  ctx.fillStyle = tailGradL;
  ctx.fill();

  // Render micro-woven twill thread texture on ribbon
  renderSilkRibbonThreads(ctx, -tailWidth / 2 - 10, 0, tailWidth + 20, tailLength);
  ctx.restore();

  // Right Tail
  ctx.save();
  ctx.translate(cx + 24, cy + 30);
  ctx.rotate(0.18);
  ctx.shadowColor = 'rgba(30, 15, 10, 0.28)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 12;

  const tailGradR = ctx.createLinearGradient(0, 0, -tailWidth, tailLength);
  tailGradR.addColorStop(0, '#FFFFFF');
  tailGradR.addColorStop(0.3, '#FAF7F2');
  tailGradR.addColorStop(0.7, '#E5D9CC');
  tailGradR.addColorStop(1, '#C9B8A4');

  ctx.beginPath();
  ctx.moveTo(-tailWidth / 2, 0);
  ctx.lineTo(tailWidth / 2, 0);
  ctx.lineTo(tailWidth / 2 + 10, tailLength);
  ctx.lineTo(0, tailLength - 18); // Elegant V-cut
  ctx.lineTo(-tailWidth / 2 - 10, tailLength);
  ctx.closePath();
  ctx.fillStyle = tailGradR;
  ctx.fill();

  renderSilkRibbonThreads(ctx, -tailWidth / 2 - 10, 0, tailWidth + 20, tailLength);
  ctx.restore();

  // Horizontal Draped Silk Band
  const bandY = cy - 22;
  const bandH = 44;
  const bandGrad = ctx.createLinearGradient(0, bandY, 0, bandY + bandH);
  bandGrad.addColorStop(0, '#FFFFFF');
  bandGrad.addColorStop(0.2, '#FAF8F4');
  bandGrad.addColorStop(0.5, '#EDE3D6');
  bandGrad.addColorStop(0.85, '#DFD1C0');
  bandGrad.addColorStop(1, '#C2B09C');

  ctx.fillStyle = bandGrad;
  ctx.fillRect(0, bandY, size, bandH);

  // Micro-woven threads on horizontal band
  renderSilkRibbonThreads(ctx, 0, bandY, size, bandH);

  // Woven gold edge piping on ribbon
  ctx.strokeStyle = 'rgba(212, 178, 120, 0.65)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, bandY + 2);
  ctx.lineTo(size, bandY + 2);
  ctx.moveTo(0, bandY + bandH - 2);
  ctx.lineTo(size, bandY + bandH - 2);
  ctx.stroke();

  ctx.restore();
}

function renderSilkRibbonThreads(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 0.6;
  // Diagonal twill weave pattern
  for (let i = -w; i < w + h; i += 3.5) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i + h, y + h);
    ctx.stroke();
  }
  ctx.restore();
}

// =============================================================================
// MATERIAL 1: REAL GILDED BURGUNDY WAX SEAL (SÁP TỰ NHIÊN DÁT VÀNG LÁ 24K)
// =============================================================================
function drawRealGildedWaxSeal(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Calculate dynamic light reflection parameters
  const lightDist = Math.hypot(lx, ly);
  const specAngle = Math.atan2(ly, lx);
  const baseRadius = 132;

  // Generate real organic molten wax silhouette points
  const points: { x: number; y: number }[] = [];
  const numPoints = 80;
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    // Harmonic fluid wave frequencies simulating liquid wax surface tension
    const r =
      baseRadius +
      14 * Math.sin(angle * 3 + 0.4) +
      9 * Math.cos(angle * 5 - 0.7) +
      6 * Math.sin(angle * 8 + 1.2) +
      3 * Math.cos(angle * 12);
    points.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }

  // --- A. Contact Ambient Shadow underneath the wax ---
  ctx.save();
  ctx.shadowColor = 'rgba(35, 8, 12, 0.55)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = -lx * 8;
  ctx.shadowOffsetY = 16 - ly * 6;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }
  ctx.closePath();
  ctx.fillStyle = '#42060F';
  ctx.fill();
  ctx.restore();

  // --- B. Wax Body with Subsurface Scattering & Glossy Specular Gradient ---
  const waxGrad = ctx.createRadialGradient(
    cx + lx * 35,
    cy + ly * 35,
    15,
    cx,
    cy,
    baseRadius + 20
  );
  // Rich Royal Wine Burgundy with warm translucent amber subsurface scattering
  waxGrad.addColorStop(0, '#B32439'); // Translucent warm core
  waxGrad.addColorStop(0.35, '#8D1526');
  waxGrad.addColorStop(0.7, '#670C1B');
  waxGrad.addColorStop(0.9, '#4D0813');
  waxGrad.addColorStop(1, '#33040C'); // Deep bevel rim

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }
  ctx.closePath();
  ctx.fillStyle = waxGrad;
  ctx.fill();

  // --- C. Thick Molten Rim (Gờ sáp dày cuộn mép) ---
  ctx.lineWidth = 14;
  const rimGrad = ctx.createRadialGradient(
    cx + lx * 60,
    cy + ly * 60,
    60,
    cx,
    cy,
    baseRadius + 10
  );
  rimGrad.addColorStop(0, 'rgba(235, 78, 98, 0.45)');
  rimGrad.addColorStop(0.6, 'rgba(145, 20, 35, 0.3)');
  rimGrad.addColorStop(1, 'rgba(30, 2, 6, 0.7)');
  ctx.strokeStyle = rimGrad;
  ctx.stroke();

  // Glossy Specular Arc on Top Rim (Ánh bóng bề mặt sáp nến)
  ctx.save();
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(255, 180, 195, 0.65)';
  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius - 8, -Math.PI * 0.85, -Math.PI * 0.15);
  ctx.stroke();
  ctx.restore();

  // --- D. Depressed Central Coin (Vùng dập chìm con dấu kim loại) ---
  const coinR = 86;
  const coinGrad = ctx.createRadialGradient(
    cx - lx * 20,
    cy - ly * 20,
    20,
    cx,
    cy,
    coinR
  );
  coinGrad.addColorStop(0, '#751322');
  coinGrad.addColorStop(0.7, '#580C18');
  coinGrad.addColorStop(1, '#38050E'); // Inner shadow groove

  ctx.beginPath();
  ctx.arc(cx, cy, coinR, 0, Math.PI * 2);
  ctx.fillStyle = coinGrad;
  ctx.fill();

  // Inner coin carved bevel groove
  ctx.strokeStyle = 'rgba(30, 2, 6, 0.85)';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Outer Gilded Beaded Ring
  drawGoldBeadedRing(ctx, cx, cy, 76, lx, ly);

  // --- E. Deeply Embossed Heart Crest with 24K Real Gold Leaf Foil Gilding ---
  drawEmbossedGildedHeart(ctx, cx, cy, 54, lx, ly);

  // --- F. Real Microscopic Gold Dust & Foil Flecks (Vảy vàng lá tán mỏng thủ công) ---
  renderRealGoldLeafFlakes(ctx, cx, cy, coinR - 10);

  ctx.restore();
}

// Draw real gilded gold beaded ring
function drawGoldBeadedRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  lx: number,
  ly: number
) {
  ctx.save();
  const count = 44;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const bx = cx + Math.cos(angle) * r;
    const by = cy + Math.sin(angle) * r;

    // 3D spherical gold bead shading
    const beadGrad = ctx.createRadialGradient(
      bx + lx * 1.5,
      by + ly * 1.5,
      0.5,
      bx,
      by,
      2.5
    );
    beadGrad.addColorStop(0, '#FFF6DB');
    beadGrad.addColorStop(0.4, '#E5C076');
    beadGrad.addColorStop(0.8, '#9E7736');
    beadGrad.addColorStop(1, '#5E421A');

    ctx.beginPath();
    ctx.arc(bx, by, 2, 0, Math.PI * 2);
    ctx.fillStyle = beadGrad;
    ctx.fill();
  }
  ctx.restore();
}

// Draw real embossed gilded heart & laurel wreath
function drawEmbossedGildedHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Real 24K Gold Leaf Metallic Shading with Specular Glint
  const goldGrad = ctx.createLinearGradient(
    cx - scale + lx * 40,
    cy - scale + ly * 40,
    cx + scale,
    cy + scale
  );
  goldGrad.addColorStop(0, '#FFFBE8');
  goldGrad.addColorStop(0.2, '#FBE19A');
  goldGrad.addColorStop(0.5, '#E2BC6B');
  goldGrad.addColorStop(0.75, '#B2883E');
  goldGrad.addColorStop(1, '#7A551E');

  // Contact shadow under the embossed gold crest
  ctx.shadowColor = 'rgba(20, 2, 4, 0.75)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = -lx * 3;
  ctx.shadowOffsetY = 4 - ly * 2;

  // Embossed Heart Path
  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale * 0.85);
  ctx.lineWidth = 5.5;
  ctx.strokeStyle = goldGrad;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Inner fine gold hairline heart
  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale * 0.62);
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = 'rgba(255, 240, 200, 0.85)';
  ctx.stroke();

  // Symmetrical Laurel Wreath Embracing the Heart
  drawGildedLaurelBranch(ctx, cx, cy, scale, -1, goldGrad);
  drawGildedLaurelBranch(ctx, cx, cy, scale, 1, goldGrad);

  // Center Gilded Monogram / Cross Knot
  ctx.beginPath();
  ctx.moveTo(cx, cy - 18);
  ctx.lineTo(cx, cy + 18);
  ctx.moveTo(cx - 10, cy);
  ctx.lineTo(cx + 10, cy);
  ctx.lineWidth = 2.4;
  ctx.strokeStyle = goldGrad;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Diamond spark in center
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

function drawGildedLaurelBranch(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  side: number, // -1 for left, 1 for right
  goldGrad: CanvasGradient
) {
  ctx.save();
  ctx.strokeStyle = goldGrad;
  ctx.fillStyle = goldGrad;
  ctx.lineWidth = 2;

  // Stem curve
  ctx.beginPath();
  ctx.moveTo(cx + side * 14, cy + scale * 0.7);
  ctx.quadraticCurveTo(
    cx + side * (scale * 0.95),
    cy,
    cx + side * (scale * 0.65),
    cy - scale * 0.6
  );
  ctx.stroke();

  // Laurel Leaf pairs along the stem
  const leaves = [
    { t: 0.15, r: 12, deg: 40 * side },
    { t: 0.4, r: 14, deg: 25 * side },
    { t: 0.65, r: 14, deg: 0 },
    { t: 0.85, r: 12, deg: -25 * side },
  ];

  leaves.forEach((l) => {
    const x = cx + side * (scale * 0.75) * (1 - l.t * 0.35);
    const y = cy + scale * (0.6 - l.t * 1.1);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((l.deg * Math.PI) / 180);
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  ctx.restore();
}

function drawHeartShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.moveTo(x, y + size * 0.7);
  // Left curve
  ctx.bezierCurveTo(
    x - size,
    y + size * 0.1,
    x - size * 0.9,
    y - size * 0.8,
    x,
    y - size * 0.35
  );
  // Right curve
  ctx.bezierCurveTo(
    x + size * 0.9,
    y - size * 0.8,
    x + size,
    y + size * 0.1,
    x,
    y + size * 0.7
  );
}

function renderRealGoldLeafFlakes(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  ctx.save();
  // Pseudorandom organic gold leaf flakes
  const flakes = 35;
  for (let i = 0; i < flakes; i++) {
    const angle = (i * 137.5 * Math.PI) / 180;
    const dist = (Math.sqrt((i + 0.5) / flakes) * radius) * 0.88;
    const fx = cx + Math.cos(angle) * dist;
    const fy = cy + Math.sin(angle) * dist;
    const fsize = 1.2 + ((i * 7) % 2.5);

    ctx.fillStyle = i % 3 === 0 ? '#FFFBE6' : '#DFBE82';
    ctx.globalAlpha = 0.55 + ((i % 4) * 0.12);
    ctx.beginPath();
    ctx.arc(fx, fy, fsize, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// =============================================================================
// MATERIAL 2: REAL CAST 18K GOLD & FRESHWATER PEARL BROOCH
// =============================================================================
function drawRealCastGoldPearlBrooch(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();
  const heartScale = 118;

  // Deep Contact Shadow
  ctx.shadowColor = 'rgba(25, 12, 6, 0.45)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = -lx * 10;
  ctx.shadowOffsetY = 18 - ly * 6;

  // 18K Solid Cast Gold Bezel Foundation
  const goldBodyGrad = ctx.createLinearGradient(
    cx - heartScale + lx * 50,
    cy - heartScale + ly * 50,
    cx + heartScale,
    cy + heartScale
  );
  goldBodyGrad.addColorStop(0, '#FFF6DB');
  goldBodyGrad.addColorStop(0.25, '#DFC082');
  goldBodyGrad.addColorStop(0.5, '#F8E6C2');
  goldBodyGrad.addColorStop(0.75, '#AC8444');
  goldBodyGrad.addColorStop(1, '#6B4C20');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 6, heartScale);
  ctx.fillStyle = goldBodyGrad;
  ctx.fill();

  // Reset shadow for inner details
  ctx.shadowColor = 'transparent';

  // Micro-brushed gold texture lines
  ctx.save();
  ctx.clip();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 0.8;
  for (let y = cy - heartScale; y < cy + heartScale; y += 3) {
    ctx.beginPath();
    ctx.moveTo(cx - heartScale, y);
    ctx.lineTo(cx + heartScale, y);
    ctx.stroke();
  }
  ctx.restore();

  // Inner Ivory Nacre Inlay (Khảm xà cừ ngọc trai tự nhiên)
  const nacreGrad = ctx.createRadialGradient(
    cx + lx * 30,
    cy + ly * 30,
    20,
    cx,
    cy,
    heartScale * 0.75
  );
  nacreGrad.addColorStop(0, '#FFFFFF');
  nacreGrad.addColorStop(0.4, '#FBF8F2');
  nacreGrad.addColorStop(0.75, '#EDE3D6');
  nacreGrad.addColorStop(0.92, '#DFCFC0');
  nacreGrad.addColorStop(1, '#BFA996');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 6, heartScale * 0.74);
  ctx.fillStyle = nacreGrad;
  ctx.fill();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#A37E44';
  ctx.stroke();

  // Natural Freshwater Pearls Around Perimeter (Real 3D Spheres with Iridescence)
  const numPearls = 22;
  for (let i = 0; i < numPearls; i++) {
    const t = (i / numPearls) * Math.PI * 2;
    // Heart perimeter coordinate calculation
    const px = cx + (heartScale * 0.96) * 0.95 * Math.sin(t) * Math.sin(t) * Math.sin(t);
    const py =
      cy -
      6 -
      (heartScale * 0.96) *
        (0.75 * Math.cos(t) -
          0.3 * Math.cos(2 * t) -
          0.12 * Math.cos(3 * t) -
          0.06 * Math.cos(4 * t));

    const pr = 7.5;

    // Pearl Golden Prong
    ctx.beginPath();
    ctx.arc(px, py, pr + 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#9E793E';
    ctx.fill();

    // Pearl Real Nacre Luster
    const pearlGrad = ctx.createRadialGradient(
      px + lx * (pr * 0.5),
      py + ly * (pr * 0.5),
      pr * 0.1,
      px,
      py,
      pr
    );
    pearlGrad.addColorStop(0, '#FFFFFF');
    pearlGrad.addColorStop(0.4, '#FAF5ED');
    pearlGrad.addColorStop(0.75, '#EDE2D4');
    pearlGrad.addColorStop(0.9, '#DAC6B3');
    pearlGrad.addColorStop(1, '#9C8472');

    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = pearlGrad;
    ctx.fill();

    // Specular Highlight Glint
    ctx.beginPath();
    ctx.arc(px + lx * (pr * 0.4), py + ly * (pr * 0.4), pr * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
  }

  // Center 18K Gold Baroque Knot
  ctx.beginPath();
  ctx.arc(cx, cy - 4, 15, 0, Math.PI * 2);
  ctx.fillStyle = goldBodyGrad;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#5E421A';
  ctx.stroke();

  // Diamond Solitaire in Center
  ctx.beginPath();
  ctx.arc(cx, cy - 4, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

// =============================================================================
// MATERIAL 3: REAL CARVED PLASTER & ANTIQUE GILDED GOLD RELIEF
// =============================================================================
function drawRealCarvedPlasterGold(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();
  const heartScale = 120;

  // Contact Shadow
  ctx.shadowColor = 'rgba(30, 20, 15, 0.35)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetX = -lx * 8;
  ctx.shadowOffsetY = 16 - ly * 5;

  // Matte Porous European Bisque Plaster Surface
  const plasterGrad = ctx.createRadialGradient(
    cx + lx * 40,
    cy + ly * 40,
    30,
    cx,
    cy,
    heartScale * 1.1
  );
  plasterGrad.addColorStop(0, '#FFFFFF');
  plasterGrad.addColorStop(0.45, '#F7F3EB');
  plasterGrad.addColorStop(0.85, '#EAE1D5');
  plasterGrad.addColorStop(1, '#D0C1B0');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 6, heartScale);
  ctx.fillStyle = plasterGrad;
  ctx.fill();

  // Antique Gilded Gold Edge Leaf
  ctx.lineWidth = 4.5;
  ctx.strokeStyle = '#C99E52';
  ctx.stroke();

  // Sculpted High-Relief Botanical Leaves in Center
  ctx.save();
  ctx.shadowColor = 'rgba(80, 60, 45, 0.25)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = -lx * 4;
  ctx.shadowOffsetY = 5 - ly * 3;

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx - 24, cy - 20, 18, 0, Math.PI * 1.4);
  ctx.arc(cx + 24, cy - 20, 18, Math.PI * 1.6, Math.PI * 3);
  ctx.stroke();

  // Gilded Gold Trim on Carved Relief
  ctx.strokeStyle = '#DFBE82';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}
