import React, { useEffect, useRef, useState } from 'react';

interface LaceHeartBowProps {
  className?: string;
  onClick?: () => void;
}

export const LaceHeartBow: React.FC<LaceHeartBowProps> = ({
  className = 'w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 max-w-[92vw]',
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightDir, setLightDir] = useState({ x: 0.35, y: -0.45 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setLightDir({ x, y });
  };

  const handleMouseLeave = () => {
    setLightDir({ x: 0.35, y: -0.45 });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const size = 700;
    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2 + 10;
    const lx = lightDir.x;
    const ly = lightDir.y;

    ctx.clearRect(0, 0, size, size);

    // =========================================================================
    // 1. SHADOW OF LACE HEART ONTO THE DOOR SURFACE (Deep ambient & soft falloff)
    // =========================================================================
    drawLaceHeartDropShadow(ctx, cx, cy);

    // =========================================================================
    // 2. EMBROIDERED COTTON LACE HEART (Chất liệu ren thêu thủ công)
    // =========================================================================
    drawRealisticEmbroideredLaceHeart(ctx, cx, cy, lx, ly);

    // =========================================================================
    // 3. PURE IVORY SILK SATIN BOW ON TOP (Nơ lụa satin thật thắt trên đầu tim)
    // =========================================================================
    drawRealisticSatinBowOnTop(ctx, cx, cy - 88, lx, ly);

  }, [lightDir]);

  return (
    <div
      className={`relative flex items-center justify-center select-none cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto drop-shadow-[0_20px_35px_rgba(40,24,18,0.22)] transition-transform duration-500 group-hover:scale-[1.02] group-active:scale-[0.98]"
        style={{ aspectRatio: '1/1' }}
      />
    </div>
  );
};

// =============================================================================
// 1. SOFT MULTI-TIER CONTACT SHADOW ONTO THE DOOR
// =============================================================================
function drawLaceHeartDropShadow(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.shadowColor = 'rgba(38, 20, 12, 0.26)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 24;

  ctx.beginPath();
  traceHeartPath(ctx, cx, cy, 142);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fill();

  ctx.shadowColor = 'rgba(45, 22, 14, 0.18)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 8;
  ctx.fill();
  ctx.restore();
}

// =============================================================================
// 2. REALISTIC EMBROIDERED COTTON LACE HEART
// =============================================================================
function drawRealisticEmbroideredLaceHeart(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // --- A. UNDERLYING FINE COTTON TULLE / MESH BASE ---
  ctx.save();
  ctx.beginPath();
  traceHeartPath(ctx, cx, cy, 140);
  ctx.clip();

  // Subtle natural ecru/cream gradient of the lace cushion
  const baseGrad = ctx.createRadialGradient(
    cx + lx * 40,
    cy - 20 + ly * 40,
    20,
    cx,
    cy,
    160
  );
  baseGrad.addColorStop(0, '#FFFFFF');
  baseGrad.addColorStop(0.4, '#FDFBF7');
  baseGrad.addColorStop(0.75, '#F5ECE1');
  baseGrad.addColorStop(1, '#E8DAC8');

  ctx.fillStyle = baseGrad;
  ctx.fill();

  // Fine Tulle Mesh Weave (Mạng lưới ren lục giác / lưới chỉ thấu quang)
  drawTulleHexMesh(ctx, cx - 160, cy - 160, 320, 320);

  // Concentric guipure lace inner rings
  drawInnerGuipureEmbroidery(ctx, cx, cy, lx, ly);

  ctx.restore();

  // --- B. SCALLOPED PICOT BORDER (VÒM HOA REN MÓC VIỀN QUANH TRÁI TIM) ---
  drawLacePerimeterScallops(ctx, cx, cy, lx, ly);

  // --- C. RAISED CORDED EMBROIDERY (HOA VĂN DÂY NỔI CORDONNET) ---
  drawRaisedCordedHeartBorder(ctx, cx, cy, lx, ly);

  // --- D. INNER EMBROIDERED FLORAL MEDALLION (HOA REN TRUNG TÂM NỔI KHỐI) ---
  drawCenterFloralLaceMotif(ctx, cx, cy + 24, lx, ly);

  ctx.restore();
}

// Helper: Mathematical Heart Path
function traceHeartPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  const points = 80;
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * 2 * Math.PI;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    // Standard parametric heart formula
    const x = cx + scale * (16 * Math.pow(sinT, 3)) / 16;
    const y =
      cy -
      scale *
        (13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) /
        16;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
}

// Fine Hexagonal Tulle Lace Ground
function drawTulleHexMesh(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = 'rgba(215, 196, 178, 0.42)';
  ctx.lineWidth = 0.75;

  const hexR = 5.5;
  const hDist = hexR * Math.sqrt(3);
  const vDist = hexR * 1.5;

  for (let r = y; r < y + h; r += vDist) {
    const isOdd = Math.floor((r - y) / vDist) % 2 === 1;
    const xOffset = isOdd ? hDist / 2 : 0;
    for (let c = x + xOffset; c < x + w; c += hDist) {
      ctx.beginPath();
      for (let a = 0; a < 6; a++) {
        const angle = (Math.PI / 3) * a + Math.PI / 6;
        const px = c + hexR * Math.cos(angle);
        const py = r + hexR * Math.sin(angle);
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
  ctx.restore();
}

// Perimeter Scallops with Picots & Thread Radials (Viền hoa ren móc thủ công)
function drawLacePerimeterScallops(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  const numScallops = 34;
  const scale = 142;

  ctx.save();

  for (let i = 0; i < numScallops; i++) {
    const t = (i / numScallops) * 2 * Math.PI;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    const x = cx + scale * (16 * Math.pow(sinT, 3)) / 16;
    const y =
      cy -
      scale *
        (13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) /
        16;

    // Normal direction tangent
    const dt = 0.04;
    const dx =
      scale * (16 * Math.pow(Math.sin(t + dt), 3) - 16 * Math.pow(Math.sin(t - dt), 3)) /
      32;
    const dy =
      -scale *
      (13 * (Math.cos(t + dt) - Math.cos(t - dt)) -
        5 * (Math.cos(2 * (t + dt)) - Math.cos(2 * (t - dt)))) /
      32;
    const angle = Math.atan2(dy, dx);
    const normalAngle = angle + Math.PI / 2;

    const scallopRadius = 11.5;
    const scx = x + Math.cos(normalAngle) * 5;
    const scy = y + Math.sin(normalAngle) * 5;

    // 1. Scallop Fan Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(50, 30, 20, 0.14)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 3;

    // 2. Scallop Fan Body (Woven Cotton)
    ctx.beginPath();
    ctx.arc(scx, scy, scallopRadius, normalAngle - Math.PI * 0.55, normalAngle + Math.PI * 0.55);
    ctx.closePath();

    const scallopGrad = ctx.createRadialGradient(
      scx + lx * 4,
      scy + ly * 4,
      2,
      scx,
      scy,
      scallopRadius
    );
    scallopGrad.addColorStop(0, '#FFFFFF');
    scallopGrad.addColorStop(0.65, '#FAF6EF');
    scallopGrad.addColorStop(1, '#E6D7C5');
    ctx.fillStyle = scallopGrad;
    ctx.fill();
    ctx.restore();

    // 3. Embroidered Picots (Các hạt/chấm ren đan móc viền ngoài cánh sò)
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#D9C8B6';
    ctx.lineWidth = 0.8;
    for (let p = -2; p <= 2; p++) {
      const pAngle = normalAngle + (p * Math.PI) / 6.5;
      const px = scx + (scallopRadius + 2.8) * Math.cos(pAngle);
      const py = scy + (scallopRadius + 2.8) * Math.sin(pAngle);

      ctx.beginPath();
      ctx.arc(px, py, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();

    // 4. Openwork eyelet center in each scallop
    ctx.save();
    const eyeletX = scx + Math.cos(normalAngle) * 2;
    const eyeletY = scy + Math.sin(normalAngle) * 2;
    ctx.beginPath();
    ctx.arc(eyeletX, eyeletY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#E8DACB';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

// Raised Corded Heart Border (Gân viền ren dày đan nổi khối)
function drawRaisedCordedHeartBorder(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Shadow under the thick corded contour
  ctx.shadowColor = 'rgba(55, 35, 20, 0.22)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 1.5;
  ctx.shadowOffsetY = 3.5;

  ctx.beginPath();
  traceHeartPath(ctx, cx, cy, 137);
  ctx.lineWidth = 6.5;
  ctx.strokeStyle = '#EFE4D6';
  ctx.stroke();
  ctx.restore();

  // Specular relief highlight on the corded yarn
  ctx.save();
  ctx.beginPath();
  traceHeartPath(ctx, cx, cy, 137);
  ctx.lineWidth = 4;
  const cordGrad = ctx.createLinearGradient(cx - 100, cy - 100, cx + 100, cy + 100);
  cordGrad.addColorStop(0, '#FFFFFF');
  cordGrad.addColorStop(0.3, '#FAF7F1');
  cordGrad.addColorStop(0.7, '#E9DAC8');
  cordGrad.addColorStop(1, '#D8C6B1');
  ctx.strokeStyle = cordGrad;
  ctx.stroke();

  // Thread twist dashed highlights (Mô phỏng sợi chỉ se đan chéo)
  ctx.setLineDash([3, 3]);
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();
  ctx.restore();
}

// Inner Guipure Embroidery Circles & Ribs
function drawInnerGuipureEmbroidery(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Secondary inner heart border
  ctx.beginPath();
  traceHeartPath(ctx, cx, cy, 108);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#EFE5D8';
  ctx.stroke();

  ctx.setLineDash([2.5, 3]);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#FFFFFF';
  ctx.stroke();

  // Radiating spokes connecting outer cord to inner heart
  ctx.setLineDash([]);
  const spokes = 28;
  for (let s = 0; s < spokes; s++) {
    const t = (s / spokes) * 2 * Math.PI;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    const x1 = cx + 108 * (16 * Math.pow(sinT, 3)) / 16;
    const y1 =
      cy -
      108 *
        (13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) /
        16;

    const x2 = cx + 135 * (16 * Math.pow(sinT, 3)) / 16;
    const y2 =
      cy -
      135 *
        (13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) /
        16;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(235, 222, 208, 0.7)';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Eyelet bead on middle of spoke
    ctx.beginPath();
    ctx.arc((x1 + x2) / 2, (y1 + y2) / 2, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }

  ctx.restore();
}

// Center Floral Motif (Họa tiết hoa ren thêu tay trung tâm nổi 3D)
function drawCenterFloralLaceMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Center Flower Petals (Hoa 6 cánh thêu chỉ satin trắng nổi)
  const petals = 6;
  const petalR = 26;

  ctx.shadowColor = 'rgba(60, 40, 25, 0.16)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;

  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-14, 18, -10, 36, 0, 42);
    ctx.bezierCurveTo(10, 36, 14, 18, 0, 0);
    ctx.closePath();

    const petalGrad = ctx.createLinearGradient(-10, 0, 10, 42);
    petalGrad.addColorStop(0, '#FAF7F2');
    petalGrad.addColorStop(0.5, '#FFFFFF');
    petalGrad.addColorStop(1, '#EFE4D4');
    ctx.fillStyle = petalGrad;
    ctx.fill();

    // Thread stitch lines along petal center (Gân chỉ hoa thêu)
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(0, 36);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.restore();
  }

  // Flower Pistil Core (Nhụy hoa ngọc trai/sợi chỉ cuộn kiểu Pháp)
  ctx.beginPath();
  ctx.arc(cx, cy, 9, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(cx + lx * 3, cy + ly * 3, 1, cx, cy, 9);
  coreGrad.addColorStop(0, '#FFFFFF');
  coreGrad.addColorStop(0.6, '#F8F2E8');
  coreGrad.addColorStop(1, '#D8C6B1');
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.strokeStyle = '#C9B59F';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // French knots surrounding center core (Các nút thắt tròn viền nhụy hoa)
  for (let k = 0; k < 8; k++) {
    const kAngle = (k / 8) * Math.PI * 2;
    const kx = cx + 14 * Math.cos(kAngle);
    const ky = cy + 14 * Math.sin(kAngle);
    ctx.beginPath();
    ctx.arc(kx, ky, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#D5C4B0';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  ctx.restore();
}

// =============================================================================
// 3. REALISTIC IVORY SILK SATIN BOW ON TOP OF THE HEART
// =============================================================================
function drawRealisticSatinBowOnTop(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // --- A. RIBBON TAILS CASCADING DOWN OVER THE HEART (Đuôi ruy băng lụa rủ) ---
  drawSatinTails(ctx, cx, cy, lx, ly);

  // --- B. VOLUPTUOUS SATIN BOW LOOPS (Hai cánh nơ lụa satin căng phồng) ---
  drawSatinLoops(ctx, cx, cy, lx, ly);

  // --- C. CENTER TIED SATIN KNOT (Nút thắt nơ lụa trung tâm có nếp nhăn thực) ---
  drawSatinKnot(ctx, cx, cy, lx, ly);

  ctx.restore();
}

// Satin Ribbon Tails
function drawSatinTails(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // Contact shadow from tails onto the lace heart surface underneath
  ctx.shadowColor = 'rgba(40, 22, 14, 0.28)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 8;

  // --- LEFT TAIL ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy + 12);
  ctx.bezierCurveTo(cx - 36, cy + 50, cx - 64, cy + 95, cx - 58, cy + 148); // Left edge
  ctx.lineTo(cx - 32, cy + 138); // Swallowtail / diagonal cut
  ctx.bezierCurveTo(cx - 38, cy + 90, cx - 18, cy + 55, cx - 4, cy + 16); // Right edge
  ctx.closePath();

  const leftTailGrad = ctx.createLinearGradient(cx - 15, cy + 10, cx - 50, cy + 145);
  leftTailGrad.addColorStop(0, '#EDE2D3');
  leftTailGrad.addColorStop(0.25, '#FFFFFF'); // Silky highlight
  leftTailGrad.addColorStop(0.65, '#F7F1E7');
  leftTailGrad.addColorStop(1, '#D8C7B3');
  ctx.fillStyle = leftTailGrad;
  ctx.fill();

  // Satin woven edge highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // --- RIGHT TAIL ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cx + 14, cy + 12);
  ctx.bezierCurveTo(cx + 36, cy + 50, cx + 64, cy + 95, cx + 58, cy + 148); // Right edge
  ctx.lineTo(cx + 32, cy + 138); // Swallowtail / diagonal cut
  ctx.bezierCurveTo(cx + 38, cy + 90, cx + 18, cy + 55, cx + 4, cy + 16); // Left edge
  ctx.closePath();

  const rightTailGrad = ctx.createLinearGradient(cx + 15, cy + 10, cx + 50, cy + 145);
  rightTailGrad.addColorStop(0, '#EDE2D3');
  rightTailGrad.addColorStop(0.25, '#FFFFFF'); // Silky highlight
  rightTailGrad.addColorStop(0.65, '#F7F1E7');
  rightTailGrad.addColorStop(1, '#D8C7B3');
  ctx.fillStyle = rightTailGrad;
  ctx.fill();

  // Satin woven edge highlight
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

// Voluptuous 3D Satin Bow Loops (Cánh nơ lụa uốn lượn có chiều sâu thật)
function drawSatinLoops(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();

  // --- LEFT SATIN LOOP ---
  ctx.save();
  ctx.shadowColor = 'rgba(35, 18, 10, 0.35)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = -6;
  ctx.shadowOffsetY = 12;

  ctx.beginPath();
  ctx.moveTo(cx - 12, cy + 6);
  ctx.bezierCurveTo(cx - 45, cy + 42, cx - 110, cy + 32, cx - 116, cy - 2);
  ctx.bezierCurveTo(cx - 120, cy - 42, cx - 70, cy - 46, cx - 12, cy - 14);
  ctx.closePath();

  const leftLoopGrad = ctx.createRadialGradient(
    cx - 65 + lx * 28,
    cy - 12 + ly * 28,
    10,
    cx - 55,
    cy - 5,
    80
  );
  leftLoopGrad.addColorStop(0, '#FFFFFF'); // Apex light reflection
  leftLoopGrad.addColorStop(0.3, '#FAF7F1');
  leftLoopGrad.addColorStop(0.68, '#E4D5C2');
  leftLoopGrad.addColorStop(0.95, '#BDAB97');
  leftLoopGrad.addColorStop(1, '#8C7764'); // Deep fold ambient occlusion
  ctx.fillStyle = leftLoopGrad;
  ctx.fill();

  // Inner cavity (Hốc sâu bên trong cánh nơ)
  ctx.beginPath();
  ctx.moveTo(cx - 38, cy - 2);
  ctx.bezierCurveTo(cx - 65, cy + 15, cx - 102, cy + 8, cx - 102, cy - 6);
  ctx.bezierCurveTo(cx - 102, cy - 24, cx - 68, cy - 24, cx - 38, cy - 8);
  ctx.closePath();
  const leftCavityGrad = ctx.createRadialGradient(cx - 80, cy - 6, 2, cx - 80, cy - 6, 30);
  leftCavityGrad.addColorStop(0, '#4A3728');
  leftCavityGrad.addColorStop(0.7, '#755F4B');
  leftCavityGrad.addColorStop(1, '#A89480');
  ctx.fillStyle = leftCavityGrad;
  ctx.fill();

  // Silky Anisotropic Sheen Stroke
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 28, cy - 20);
  ctx.bezierCurveTo(cx - 65, cy - 38, cx - 105, cy - 28, cx - 110, cy - 4);
  ctx.stroke();
  ctx.restore();

  ctx.restore();

  // --- RIGHT SATIN LOOP ---
  ctx.save();
  ctx.shadowColor = 'rgba(35, 18, 10, 0.35)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 12;

  ctx.beginPath();
  ctx.moveTo(cx + 12, cy + 6);
  ctx.bezierCurveTo(cx + 45, cy + 42, cx + 110, cy + 32, cx + 116, cy - 2);
  ctx.bezierCurveTo(cx + 120, cy - 42, cx + 70, cy - 46, cx + 12, cy - 14);
  ctx.closePath();

  const rightLoopGrad = ctx.createRadialGradient(
    cx + 65 + lx * 28,
    cy - 12 + ly * 28,
    10,
    cx + 55,
    cy - 5,
    80
  );
  rightLoopGrad.addColorStop(0, '#FFFFFF'); // Apex light reflection
  rightLoopGrad.addColorStop(0.3, '#FAF7F1');
  rightLoopGrad.addColorStop(0.68, '#E4D5C2');
  rightLoopGrad.addColorStop(0.95, '#BDAB97');
  rightLoopGrad.addColorStop(1, '#8C7764');
  ctx.fillStyle = rightLoopGrad;
  ctx.fill();

  // Inner cavity (Hốc sâu bên trong cánh nơ phải)
  ctx.beginPath();
  ctx.moveTo(cx + 38, cy - 2);
  ctx.bezierCurveTo(cx + 65, cy + 15, cx + 102, cy + 8, cx + 102, cy - 6);
  ctx.bezierCurveTo(cx + 102, cy - 24, cx + 70, cy - 24, cx + 38, cy - 8);
  ctx.closePath();
  const rightCavityGrad = ctx.createRadialGradient(cx + 80, cy - 6, 2, cx + 80, cy - 6, 30);
  rightCavityGrad.addColorStop(0, '#4A3728');
  rightCavityGrad.addColorStop(0.7, '#755F4B');
  rightCavityGrad.addColorStop(1, '#A89480');
  ctx.fillStyle = rightCavityGrad;
  ctx.fill();

  // Silky Anisotropic Sheen Stroke
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + 28, cy - 20);
  ctx.bezierCurveTo(cx + 65, cy - 38, cx + 105, cy - 28, cx + 110, cy - 4);
  ctx.stroke();
  ctx.restore();

  ctx.restore();

  ctx.restore();
}

// Center Tied Satin Knot with Tension Puckers
function drawSatinKnot(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  lx: number,
  ly: number
) {
  ctx.save();
  ctx.shadowColor = 'rgba(30, 15, 10, 0.4)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;

  // Knot rounded cushion
  const kw = 28;
  const kh = 24;
  ctx.beginPath();
  ctx.ellipse(cx, cy, kw / 2, kh / 2, 0, 0, Math.PI * 2);

  const knotGrad = ctx.createRadialGradient(cx + lx * 8, cy + ly * 8, 3, cx, cy, kw / 2);
  knotGrad.addColorStop(0, '#FFFFFF');
  knotGrad.addColorStop(0.35, '#FAF6F0');
  knotGrad.addColorStop(0.75, '#DACBB9');
  knotGrad.addColorStop(1, '#9C8572');
  ctx.fillStyle = knotGrad;
  ctx.fill();

  // Vertical tension creases on knot (Nếp gấp sợi lụa bị thắt chặt)
  ctx.save();
  ctx.strokeStyle = '#6E5848';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy - 9);
  ctx.lineTo(cx - 4, cy + 9);
  ctx.moveTo(cx + 4, cy - 9);
  ctx.lineTo(cx + 5, cy + 9);
  ctx.stroke();

  // Central highlight luster
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 7);
  ctx.lineTo(cx, cy + 7);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}
