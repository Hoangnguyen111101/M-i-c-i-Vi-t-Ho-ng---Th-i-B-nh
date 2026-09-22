import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Crown } from 'lucide-react';

export type SatinHeartStyle = 'ivory_satin_gold' | 'sculpted_satin_heart' | 'burgundy_satin_gold';

interface RealSatinHeartBowProps {
  onClick?: () => void;
  defaultStyle?: SatinHeartStyle;
}

export const RealSatinHeartBow: React.FC<RealSatinHeartBowProps> = ({
  onClick,
  defaultStyle = 'ivory_satin_gold',
}) => {
  const [activeStyle, setActiveStyle] = useState<SatinHeartStyle>(defaultStyle);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightDir, setLightDir] = useState({ x: 0.3, y: -0.45 });

  // Handle interactive physical lighting when hovering / moving
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setLightDir({ x, y });
  };

  const handleMouseLeave = () => {
    setLightDir({ x: 0.3, y: -0.45 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const size = 720;
    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 - 10;
    const lx = lightDir.x;
    const ly = lightDir.y;

    ctx.clearRect(0, 0, size, size);

    // =========================================================================
    // RENDER PHOTOREALISTIC SATIN SILK BOW & REAL MATERIAL HEART
    // =========================================================================
    if (activeStyle === 'ivory_satin_gold') {
      renderIvoryCoutureSatinBow(ctx, size, cx, cy, lx, ly, 'gold_pearl');
    } else if (activeStyle === 'sculpted_satin_heart') {
      renderSculptedSatinFabricHeart(ctx, size, cx, cy, lx, ly);
    } else {
      renderIvoryCoutureSatinBow(ctx, size, cx, cy, lx, ly, 'burgundy_gold');
    }
  }, [activeStyle, lightDir]);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Luxury ambient light bloom */}
      <div className="absolute w-80 h-80 sm:w-104 sm:h-104 rounded-full bg-gradient-to-r from-[#DFBE82]/20 via-[#FAF7F2]/40 to-[#C8A870]/20 blur-3xl pointer-events-none" />

      {/* Main Interactive Satin Bow Container */}
      <div
        onClick={onClick}
        className="relative cursor-pointer group transition-transform duration-500 hover:scale-[1.025] active:scale-[0.97]"
        title="Chạm vào nơ để mở thiệp"
      >
        <canvas
          ref={canvasRef}
          className="w-68 h-68 sm:w-84 sm:h-84 md:w-96 md:h-96 filter drop-shadow-[0_24px_40px_rgba(40,25,18,0.3)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
          style={{ width: '100%', maxWidth: '380px', height: 'auto', aspectRatio: '1/1' }}
        />
      </div>

      {/* Style Toggle - Satin Silk Materials */}
      <div
        className="mt-2 z-40 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[#DFBE82]/50 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setActiveStyle('ivory_satin_gold')}
          className={`px-3 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            activeStyle === 'ivory_satin_gold'
              ? 'bg-[#2D1C13] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5C4234] hover:text-[#2D1C13] hover:bg-black/5'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#DFBE82]" />
          <span>Lụa Satin & Khóa Vàng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStyle('sculpted_satin_heart')}
          className={`px-3 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            activeStyle === 'sculpted_satin_heart'
              ? 'bg-[#80182A] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5C4234] hover:text-[#80182A] hover:bg-black/5'
          }`}
        >
          <Heart className="w-3 h-3 text-[#FFB3C0]" />
          <span>Trái Tim Lụa Đệm Phồng</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveStyle('burgundy_satin_gold')}
          className={`px-3 py-1 rounded-full text-[11px] font-serif transition-all flex items-center gap-1 cursor-pointer ${
            activeStyle === 'burgundy_satin_gold'
              ? 'bg-[#5C0A18] text-[#FAF5EE] shadow-xs font-semibold'
              : 'text-[#5C4234] hover:text-[#5C0A18] hover:bg-black/5'
          }`}
        >
          <Crown className="w-3 h-3 text-[#E5A88B]" />
          <span>Lụa Đỏ Rượu & Trái Tim Vàng</span>
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// STYLE 1: HAUTE COUTURE IVORY SILK SATIN BOW WITH REAL JEWELED HEART CLASP
// =============================================================================
function renderIvoryCoutureSatinBow(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number,
  heartType: 'gold_pearl' | 'burgundy_gold'
) {
  const isBurgundy = heartType === 'burgundy_gold';

  // 1. Horizontal Silk Sash Running Behind Bow
  drawHorizontalSilkSash(ctx, size, cy, lx, ly, isBurgundy);

  // 2. Cascading Ribbon Tails Draped Downwards
  drawSatinRibbonTails(ctx, cx, cy, lx, ly, isBurgundy);

  // 3. Voluptuous 3D Satin Bow Loops (Cánh nơ lụa satin căng phồng)
  drawSatinBowLoops(ctx, cx, cy, lx, ly, isBurgundy);

  // 4. Center Tied Knot with Fabric Puckers (Nút thắt nơ lụa satin)
  drawSatinCenterKnot(ctx, cx, cy, lx, ly, isBurgundy);

  // 5. The Real Material Heart Clasp in the Exact Center (Trái tim vật liệu thật ở giữa)
  if (!isBurgundy) {
    drawRealCastGoldPearlHeart(ctx, cx, cy, 56, lx, ly);
  } else {
    drawRealRoyalBurgundyGoldHeart(ctx, cx, cy, 56, lx, ly);
  }
}

// =============================================================================
// SUB-ROUTINE: HORIZONTAL SATIN SASH (DẢI LỤA SATIN VẮT NGANG THIỆP)
// =============================================================================
function drawHorizontalSilkSash(
  ctx: CanvasRenderingContext2D,
  size: number,
  cy: number,
  lx: number,
  ly: number,
  isBurgundy: boolean
) {
  ctx.save();
  const sashY = cy - 26;
  const sashH = 52;

  // Contact shadow onto door surface
  ctx.shadowColor = 'rgba(40, 20, 10, 0.25)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;

  const grad = ctx.createLinearGradient(0, sashY, 0, sashY + sashH);
  if (!isBurgundy) {
    // Ivory / Champagne Silk Satin
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.2, '#FAF7F2');
    grad.addColorStop(0.5, '#EFE5D8');
    grad.addColorStop(0.85, '#D5C4B0');
    grad.addColorStop(1, '#B9A690');
  } else {
    // Royal Burgundy Wine Silk Satin
    grad.addColorStop(0, '#B32439');
    grad.addColorStop(0.25, '#8C1627');
    grad.addColorStop(0.5, '#720F1E');
    grad.addColorStop(0.85, '#560915');
    grad.addColorStop(1, '#3B040C');
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, sashY, size, sashH);

  // Anisotropic Sheen Highlight on Sash (Ánh bóng lướt theo sợi lụa)
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  const sheenGrad = ctx.createLinearGradient(0, sashY, 0, sashY + sashH);
  sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
  sheenGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
  sheenGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.1)');
  sheenGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, sashY + 4, size, sashH * 0.4);
  ctx.restore();

  // Fine Woven Twill Threads on Satin
  renderSatinMicroWeave(ctx, 0, sashY, size, sashH);

  // Woven Gold Metallic Piping on Top and Bottom Edges
  ctx.strokeStyle = isBurgundy
    ? 'rgba(223, 190, 130, 0.75)'
    : 'rgba(200, 168, 112, 0.6)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, sashY + 2);
  ctx.lineTo(size, sashY + 2);
  ctx.moveTo(0, sashY + sashH - 2);
  ctx.lineTo(size, sashY + sashH - 2);
  ctx.stroke();

  ctx.restore();
}

// =============================================================================
// SUB-ROUTINE: CASCADING SATIN RIBBON TAILS (ĐUÔI NƠ LỤA SATIN BUÔNG RỦ)
// =============================================================================
function drawSatinRibbonTails(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number,
  isBurgundy: boolean
) {
  ctx.save();

  // LEFT TAIL
  ctx.save();
  ctx.translate(cx - 32, cy + 30);
  ctx.rotate(-0.16);

  ctx.shadowColor = 'rgba(30, 15, 10, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetX = -8;
  ctx.shadowOffsetY = 16;

  const tailW = 54;
  const tailH = 200;

  const leftTailGrad = ctx.createLinearGradient(0, 0, tailW, tailH);
  if (!isBurgundy) {
    leftTailGrad.addColorStop(0, '#FFFFFF');
    leftTailGrad.addColorStop(0.25, '#FAF6F0');
    leftTailGrad.addColorStop(0.55, '#E2D5C4');
    leftTailGrad.addColorStop(0.85, '#C4B19C');
    leftTailGrad.addColorStop(1, '#A9937E');
  } else {
    leftTailGrad.addColorStop(0, '#A82337');
    leftTailGrad.addColorStop(0.3, '#821323');
    leftTailGrad.addColorStop(0.65, '#610B18');
    leftTailGrad.addColorStop(1, '#3E050E');
  }

  ctx.beginPath();
  ctx.moveTo(-tailW / 2, 0);
  // Graceful undulating drape
  ctx.bezierCurveTo(-tailW / 2 - 8, 70, -tailW / 2 - 4, 140, -tailW / 2 - 8, tailH);
  ctx.lineTo(0, tailH - 24); // Sharp V-notch cut
  ctx.lineTo(tailW / 2 + 6, tailH);
  ctx.bezierCurveTo(tailW / 2 + 4, 140, tailW / 2, 70, tailW / 2, 0);
  ctx.closePath();
  ctx.fillStyle = leftTailGrad;
  ctx.fill();

  // Satin Specular Streak down the left tail (Ánh bóng lụa satin uốn theo nếp)
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = isBurgundy
    ? 'rgba(255, 150, 170, 0.55)'
    : 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-tailW * 0.15, 10);
  ctx.bezierCurveTo(-tailW * 0.25, 70, -tailW * 0.1, 130, -tailW * 0.2, tailH - 30);
  ctx.stroke();
  ctx.restore();

  renderSatinMicroWeave(ctx, -tailW / 2 - 10, 0, tailW + 20, tailH);
  ctx.restore();

  // RIGHT TAIL
  ctx.save();
  ctx.translate(cx + 32, cy + 30);
  ctx.rotate(0.16);

  ctx.shadowColor = 'rgba(30, 15, 10, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 16;

  const rightTailGrad = ctx.createLinearGradient(0, 0, -tailW, tailH);
  if (!isBurgundy) {
    rightTailGrad.addColorStop(0, '#FFFFFF');
    rightTailGrad.addColorStop(0.25, '#FAF6F0');
    rightTailGrad.addColorStop(0.55, '#E2D5C4');
    rightTailGrad.addColorStop(0.85, '#C4B19C');
    rightTailGrad.addColorStop(1, '#A9937E');
  } else {
    rightTailGrad.addColorStop(0, '#A82337');
    rightTailGrad.addColorStop(0.3, '#821323');
    rightTailGrad.addColorStop(0.65, '#610B18');
    rightTailGrad.addColorStop(1, '#3E050E');
  }

  ctx.beginPath();
  ctx.moveTo(-tailW / 2, 0);
  ctx.bezierCurveTo(-tailW / 2, 70, -tailW / 2 - 4, 140, -tailW / 2 - 6, tailH);
  ctx.lineTo(0, tailH - 24); // Sharp V-notch cut
  ctx.lineTo(tailW / 2 + 8, tailH);
  ctx.bezierCurveTo(tailW / 2 + 4, 140, tailW / 2 + 8, 70, tailW / 2, 0);
  ctx.closePath();
  ctx.fillStyle = rightTailGrad;
  ctx.fill();

  // Satin Specular Streak down the right tail
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = isBurgundy
    ? 'rgba(255, 150, 170, 0.55)'
    : 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(tailW * 0.15, 10);
  ctx.bezierCurveTo(tailW * 0.25, 70, tailW * 0.1, 130, tailW * 0.2, tailH - 30);
  ctx.stroke();
  ctx.restore();

  renderSatinMicroWeave(ctx, -tailW / 2 - 10, 0, tailW + 20, tailH);
  ctx.restore();

  ctx.restore();
}

// =============================================================================
// SUB-ROUTINE: 3D VOLUPTUOUS SATIN BOW LOOPS (CÁNH NƠ LỤA SATIN CĂNG PHỒNG)
// =============================================================================
function drawSatinBowLoops(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number,
  isBurgundy: boolean
) {
  ctx.save();

  // --- LEFT LOOP (CÁNH NƠ TRÁI) ---
  ctx.save();
  ctx.shadowColor = 'rgba(25, 12, 8, 0.42)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = -12;
  ctx.shadowOffsetY = 16;

  // Left Loop Outer Surface
  const leftLoopGrad = ctx.createRadialGradient(
    cx - 105 + lx * 45,
    cy - 15 + ly * 45,
    15,
    cx - 85,
    cy - 5,
    125
  );
  if (!isBurgundy) {
    leftLoopGrad.addColorStop(0, '#FFFFFF'); // Specular Apex
    leftLoopGrad.addColorStop(0.25, '#FAF6F0');
    leftLoopGrad.addColorStop(0.6, '#DFCEBD');
    leftLoopGrad.addColorStop(0.85, '#BFA993');
    leftLoopGrad.addColorStop(1, '#8C745E'); // Deep gathering crease
  } else {
    leftLoopGrad.addColorStop(0, '#CC334C');
    leftLoopGrad.addColorStop(0.3, '#9E1C2E');
    leftLoopGrad.addColorStop(0.7, '#6E0E1C');
    leftLoopGrad.addColorStop(1, '#38040B');
  }

  ctx.beginPath();
  ctx.moveTo(cx - 20, cy + 8);
  // Outer sweeping curve of the left bow loop
  ctx.bezierCurveTo(cx - 70, cy + 68, cx - 180, cy + 45, cx - 185, cy - 8);
  ctx.bezierCurveTo(cx - 190, cy - 65, cx - 110, cy - 75, cx - 20, cy - 22);
  ctx.closePath();
  ctx.fillStyle = leftLoopGrad;
  ctx.fill();

  // Left Loop Inner Cavity (Hốc rỗng bên trong cánh nơ - tạo độ dày 3D thực tế)
  const leftHoleGrad = ctx.createRadialGradient(
    cx - 135,
    cy - 10,
    5,
    cx - 135,
    cy - 10,
    45
  );
  if (!isBurgundy) {
    leftHoleGrad.addColorStop(0, '#423326');
    leftHoleGrad.addColorStop(0.6, '#6B5441');
    leftHoleGrad.addColorStop(1, '#B09A84');
  } else {
    leftHoleGrad.addColorStop(0, '#1F0206');
    leftHoleGrad.addColorStop(0.6, '#42060E');
    leftHoleGrad.addColorStop(1, '#781220');
  }

  ctx.beginPath();
  ctx.moveTo(cx - 65, cy - 2);
  ctx.bezierCurveTo(cx - 100, cy + 22, cx - 165, cy + 12, cx - 165, cy - 10);
  ctx.bezierCurveTo(cx - 165, cy - 35, cx - 110, cy - 35, cx - 65, cy - 14);
  ctx.closePath();
  ctx.fillStyle = leftHoleGrad;
  ctx.fill();

  // Left Loop Anisotropic Satin Highlight Ribbon Arc
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = isBurgundy
    ? 'rgba(255, 170, 190, 0.7)'
    : 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 45, cy - 32);
  ctx.bezierCurveTo(cx - 105, cy - 64, cx - 168, cy - 48, cx - 176, cy - 12);
  ctx.stroke();
  ctx.restore();

  renderSatinMicroWeave(ctx, cx - 190, cy - 80, 180, 150);
  ctx.restore();

  // --- RIGHT LOOP (CÁNH NƠ PHẢI) ---
  ctx.save();
  ctx.shadowColor = 'rgba(25, 12, 8, 0.42)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = 12;
  ctx.shadowOffsetY = 16;

  const rightLoopGrad = ctx.createRadialGradient(
    cx + 105 + lx * 45,
    cy - 15 + ly * 45,
    15,
    cx + 85,
    cy - 5,
    125
  );
  if (!isBurgundy) {
    rightLoopGrad.addColorStop(0, '#FFFFFF');
    rightLoopGrad.addColorStop(0.25, '#FAF6F0');
    rightLoopGrad.addColorStop(0.6, '#DFCEBD');
    rightLoopGrad.addColorStop(0.85, '#BFA993');
    rightLoopGrad.addColorStop(1, '#8C745E');
  } else {
    rightLoopGrad.addColorStop(0, '#CC334C');
    rightLoopGrad.addColorStop(0.3, '#9E1C2E');
    rightLoopGrad.addColorStop(0.7, '#6E0E1C');
    rightLoopGrad.addColorStop(1, '#38040B');
  }

  ctx.beginPath();
  ctx.moveTo(cx + 20, cy + 8);
  ctx.bezierCurveTo(cx + 70, cy + 68, cx + 180, cy + 45, cx + 185, cy - 8);
  ctx.bezierCurveTo(cx + 190, cy - 65, cx + 110, cy - 75, cx + 20, cy - 22);
  ctx.closePath();
  ctx.fillStyle = rightLoopGrad;
  ctx.fill();

  // Right Loop Inner Cavity
  const rightHoleGrad = ctx.createRadialGradient(
    cx + 135,
    cy - 10,
    5,
    cx + 135,
    cy - 10,
    45
  );
  if (!isBurgundy) {
    rightHoleGrad.addColorStop(0, '#423326');
    rightHoleGrad.addColorStop(0.6, '#6B5441');
    rightHoleGrad.addColorStop(1, '#B09A84');
  } else {
    rightHoleGrad.addColorStop(0, '#1F0206');
    rightHoleGrad.addColorStop(0.6, '#42060E');
    rightHoleGrad.addColorStop(1, '#781220');
  }

  ctx.beginPath();
  ctx.moveTo(cx + 65, cy - 2);
  ctx.bezierCurveTo(cx + 100, cy + 22, cx + 165, cy + 12, cx + 165, cy - 10);
  ctx.bezierCurveTo(cx + 165, cy - 35, cx + 110, cy - 35, cx + 65, cy - 14);
  ctx.closePath();
  ctx.fillStyle = rightHoleGrad;
  ctx.fill();

  // Right Loop Anisotropic Satin Highlight Ribbon Arc
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = isBurgundy
    ? 'rgba(255, 170, 190, 0.7)'
    : 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 16;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + 45, cy - 32);
  ctx.bezierCurveTo(cx + 105, cy - 64, cx + 168, cy - 48, cx + 176, cy - 12);
  ctx.stroke();
  ctx.restore();

  renderSatinMicroWeave(ctx, cx + 10, cy - 80, 180, 150);
  ctx.restore();

  ctx.restore();
}

// =============================================================================
// SUB-ROUTINE: CENTER TIED KNOT WITH FABRIC PUCKERING
// =============================================================================
function drawSatinCenterKnot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number,
  isBurgundy: boolean
) {
  ctx.save();
  ctx.shadowColor = 'rgba(20, 8, 4, 0.55)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;

  // Knot Pillow Shape
  const kw = 64;
  const kh = 54;
  const knotGrad = ctx.createRadialGradient(
    cx + lx * 20,
    cy + ly * 20,
    5,
    cx,
    cy,
    kw * 0.8
  );
  if (!isBurgundy) {
    knotGrad.addColorStop(0, '#FFFFFF');
    knotGrad.addColorStop(0.3, '#FAF5ED');
    knotGrad.addColorStop(0.7, '#D8C5B2');
    knotGrad.addColorStop(1, '#9B846F');
  } else {
    knotGrad.addColorStop(0, '#B32439');
    knotGrad.addColorStop(0.3, '#8C1525');
    knotGrad.addColorStop(0.7, '#630B17');
    knotGrad.addColorStop(1, '#38040B');
  }

  ctx.beginPath();
  ctx.ellipse(cx, cy, kw / 2, kh / 2, 0, 0, Math.PI * 2);
  ctx.fillStyle = knotGrad;
  ctx.fill();

  // Natural Fabric Puckering Wrinkles (Nếp nhăn vải lụa bị thắt chặt)
  ctx.save();
  ctx.strokeStyle = isBurgundy
    ? 'rgba(45, 4, 8, 0.65)'
    : 'rgba(110, 85, 65, 0.45)';
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(cx - 18, cy - 14);
  ctx.quadraticCurveTo(cx - 4, cy - 2, cx - 16, cy + 14);
  ctx.moveTo(cx + 18, cy - 14);
  ctx.quadraticCurveTo(cx + 4, cy - 2, cx + 16, cy + 14);
  ctx.stroke();

  // Subtle highlight on fold creases
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - 16, cy - 14);
  ctx.quadraticCurveTo(cx - 2, cy - 2, cx - 14, cy + 14);
  ctx.moveTo(cx + 16, cy - 14);
  ctx.quadraticCurveTo(cx + 2, cy - 2, cx + 14, cy + 14);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// =============================================================================
// SUB-ROUTINE: REAL CAST 18K GOLD & FRESHWATER PEARL HEART CLASP
// =============================================================================
function drawRealCastGoldPearlHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Deep Contact Shadow onto Satin Knot
  ctx.shadowColor = 'rgba(25, 10, 5, 0.65)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = -lx * 4;
  ctx.shadowOffsetY = 10 - ly * 4;

  // Solid 18K Cast Gold Foundation
  const goldGrad = ctx.createLinearGradient(
    cx - scale + lx * 30,
    cy - scale + ly * 30,
    cx + scale,
    cy + scale
  );
  goldGrad.addColorStop(0, '#FFF6DB');
  goldGrad.addColorStop(0.25, '#DFC082');
  goldGrad.addColorStop(0.5, '#F8E6C2');
  goldGrad.addColorStop(0.75, '#AC8444');
  goldGrad.addColorStop(1, '#6B4C20');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale);
  ctx.fillStyle = goldGrad;
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Inner Ivory Nacre Inlay (Khảm xà cừ ngọc trai)
  const nacreGrad = ctx.createRadialGradient(
    cx + lx * 15,
    cy + ly * 15,
    10,
    cx,
    cy,
    scale * 0.75
  );
  nacreGrad.addColorStop(0, '#FFFFFF');
  nacreGrad.addColorStop(0.4, '#FAF5ED');
  nacreGrad.addColorStop(0.75, '#EDE0D1');
  nacreGrad.addColorStop(1, '#CDB8A2');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale * 0.74);
  ctx.fillStyle = nacreGrad;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#9C7A40';
  ctx.stroke();

  // Freshwater Pearl Halo Encircling the Heart Rim (Ngọc trai biển tròn đều)
  const numPearls = 18;
  for (let i = 0; i < numPearls; i++) {
    const t = (i / numPearls) * Math.PI * 2;
    const px = cx + (scale * 0.96) * 0.94 * Math.sin(t) * Math.sin(t) * Math.sin(t);
    const py =
      cy -
      4 -
      (scale * 0.96) *
        (0.75 * Math.cos(t) -
          0.3 * Math.cos(2 * t) -
          0.12 * Math.cos(3 * t) -
          0.06 * Math.cos(4 * t));

    const pr = 4.8;

    // Golden Prong
    ctx.beginPath();
    ctx.arc(px, py, pr + 1, 0, Math.PI * 2);
    ctx.fillStyle = '#9E783B';
    ctx.fill();

    // 3D Spherical Pearl with Nacre Sheen
    const pearlGrad = ctx.createRadialGradient(
      px + lx * (pr * 0.5),
      py + ly * (pr * 0.5),
      pr * 0.1,
      px,
      py,
      pr
    );
    pearlGrad.addColorStop(0, '#FFFFFF');
    pearlGrad.addColorStop(0.45, '#FAF6EE');
    pearlGrad.addColorStop(0.8, '#ECE1D2');
    pearlGrad.addColorStop(1, '#A8927E');

    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = pearlGrad;
    ctx.fill();

    // Specular glint
    ctx.beginPath();
    ctx.arc(px + lx * (pr * 0.35), py + ly * (pr * 0.35), pr * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fill();
  }

  // Center Solitaire Diamond & Gold Filigree Motif
  ctx.beginPath();
  ctx.arc(cx, cy - 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = goldGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy - 2, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

// =============================================================================
// SUB-ROUTINE: REAL ROYAL BURGUNDY & GILDED GOLD HEART
// =============================================================================
function drawRealRoyalBurgundyGoldHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Contact Shadow
  ctx.shadowColor = 'rgba(30, 6, 10, 0.7)';
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;

  // Rich Bordeaux Wax Core with Subsurface Scattering
  const waxGrad = ctx.createRadialGradient(
    cx + lx * 20,
    cy + ly * 20,
    10,
    cx,
    cy,
    scale
  );
  waxGrad.addColorStop(0, '#A31C30');
  waxGrad.addColorStop(0.4, '#7D1121');
  waxGrad.addColorStop(0.75, '#560714');
  waxGrad.addColorStop(1, '#2E0208');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale);
  ctx.fillStyle = waxGrad;
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // 24K Hand-Gilded Gold Leaf Rim
  const goldGrad = ctx.createLinearGradient(
    cx - scale,
    cy - scale,
    cx + scale,
    cy + scale
  );
  goldGrad.addColorStop(0, '#FFF5D6');
  goldGrad.addColorStop(0.3, '#E6BF75');
  goldGrad.addColorStop(0.7, '#A87D38');
  goldGrad.addColorStop(1, '#6E4D1B');

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale);
  ctx.lineWidth = 4;
  ctx.strokeStyle = goldGrad;
  ctx.stroke();

  // Inner Laurel Wreath in Gilded Gold
  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 4, scale * 0.65);
  ctx.lineWidth = 1.6;
  ctx.strokeStyle = 'rgba(255, 235, 180, 0.9)';
  ctx.stroke();

  // Center Gilded Diamond Monogram
  ctx.beginPath();
  ctx.moveTo(cx, cy - 14);
  ctx.lineTo(cx, cy + 14);
  ctx.moveTo(cx - 8, cy);
  ctx.lineTo(cx + 8, cy);
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = goldGrad;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

// =============================================================================
// STYLE 2: SCULPTED 3D PADDED SATIN SILK HEART (TRÁI TIM BẰNG VẢI LỤA SATIN ĐỆM PHỒNG)
// =============================================================================
function renderSculptedSatinFabricHeart(
  ctx: CanvasRenderingContext2D,
  size: number,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  // 1. Horizontal Silk Sash
  drawHorizontalSilkSash(ctx, size, cy, lx, ly, false);

  // 2. Cascading Ribbon Tails
  drawSatinRibbonTails(ctx, cx, cy, lx, ly, false);

  // 3. Huge Voluptuous Padded Satin Fabric Heart in the Center
  ctx.save();
  const heartScale = 126;

  // Deep Contact Ambient Shadow
  ctx.shadowColor = 'rgba(35, 18, 10, 0.45)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetX = -lx * 12;
  ctx.shadowOffsetY = 22 - ly * 8;

  // Voluptuous Padded Satin Silk Shading (Cook-Torrance / Ward Anisotropic Luster)
  const satinPillowGrad = ctx.createRadialGradient(
    cx + lx * 45,
    cy - 20 + ly * 45,
    15,
    cx,
    cy - 10,
    heartScale * 1.05
  );
  satinPillowGrad.addColorStop(0, '#FFFFFF'); // Specular Apex
  satinPillowGrad.addColorStop(0.25, '#FAF6EF');
  satinPillowGrad.addColorStop(0.55, '#E5D6C5');
  satinPillowGrad.addColorStop(0.85, '#C6B29C');
  satinPillowGrad.addColorStop(1, '#8C755E'); // Deep gathering seam

  ctx.beginPath();
  drawHeartShape(ctx, cx, cy - 10, heartScale);
  ctx.fillStyle = satinPillowGrad;
  ctx.fill();

  ctx.shadowColor = 'transparent';

  // Satin Micro-Weave on Heart Surface
  renderSatinMicroWeave(ctx, cx - heartScale, cy - heartScale, heartScale * 2, heartScale * 2);

  // Elegant Pleated Fabric Folds Radiating across the Satin Heart (Nếp gấp lụa nghệ thuật)
  ctx.save();
  ctx.strokeStyle = 'rgba(120, 95, 75, 0.35)';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  // Left fold lines
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy + 30);
  ctx.quadraticCurveTo(cx - 65, cy, cx - 80, cy - 40);
  ctx.moveTo(cx - 10, cy + 45);
  ctx.quadraticCurveTo(cx - 45, cy + 20, cx - 55, cy - 10);
  ctx.stroke();

  // Right fold lines
  ctx.beginPath();
  ctx.moveTo(cx + 15, cy + 30);
  ctx.quadraticCurveTo(cx + 65, cy, cx + 80, cy - 40);
  ctx.moveTo(cx + 10, cy + 45);
  ctx.quadraticCurveTo(cx + 45, cy + 20, cx + 55, cy - 10);
  ctx.stroke();

  // Highlight crest on folds
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 13, cy + 29);
  ctx.quadraticCurveTo(cx - 63, cy - 1, cx - 78, cy - 41);
  ctx.moveTo(cx + 17, cy + 29);
  ctx.quadraticCurveTo(cx + 67, cy - 1, cx + 82, cy - 41);
  ctx.stroke();
  ctx.restore();

  // Fine Gold Thread Embroidered Edge (Đường viền thêu chỉ vàng 18K quanh mép lụa)
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#D4B374';
  ctx.stroke();

  // Center Gold Brooch Clasp on the Padded Heart
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 16, 0, Math.PI * 2);
  const broochGrad = ctx.createRadialGradient(cx - 3, cy - 13, 2, cx, cy - 10, 16);
  broochGrad.addColorStop(0, '#FFF6DB');
  broochGrad.addColorStop(0.4, '#E5C076');
  broochGrad.addColorStop(0.8, '#9E7736');
  broochGrad.addColorStop(1, '#5E421A');
  ctx.fillStyle = broochGrad;
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = '#3D280E';
  ctx.stroke();

  // Solitaire Pearl in Center
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  ctx.restore();
}

// =============================================================================
// HELPER: RENDER HIGH-FREQUENCY SATIN MICRO-WEAVE THREADS
// =============================================================================
function renderSatinMicroWeave(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 0.5;
  // Very tight diagonal twill satin threads
  for (let i = -w; i < w + h; i += 3) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i + h, y + h);
    ctx.stroke();
  }
  ctx.restore();
}

// =============================================================================
// HELPER: DRAW MATHEMATICALLY SMOOTH GOLDEN-RATIO HEART SHAPE
// =============================================================================
function drawHeartShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
) {
  ctx.moveTo(x, y + size * 0.72);
  // Left lobe
  ctx.bezierCurveTo(
    x - size * 1.05,
    y + size * 0.12,
    x - size * 0.95,
    y - size * 0.85,
    x,
    y - size * 0.38
  );
  // Right lobe
  ctx.bezierCurveTo(
    x + size * 0.95,
    y - size * 0.85,
    x + size * 1.05,
    y + size * 0.12,
    x,
    y + size * 0.72
  );
}
