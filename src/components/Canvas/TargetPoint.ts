import { Point } from '../../types';
import { TARGET_POINT } from '../../constants';

interface DrawTargetPointOptions {
  ctx: CanvasRenderingContext2D;
  point: Point;
}

function drawGlow(ctx: CanvasRenderingContext2D, point: Point) {
  const time = Date.now() / 1000;
  const scale = 1 + TARGET_POINT.PULSE_SCALE * Math.sin(time * TARGET_POINT.PULSE_SPEED);
  
  // Create gradient for glow effect
  const gradient = ctx.createRadialGradient(
    point.x, point.y, 0,
    point.x, point.y, TARGET_POINT.GLOW_RADIUS * scale
  );
  
  gradient.addColorStop(0, TARGET_POINT.COLOR.GLOW);
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(point.x, point.y, TARGET_POINT.GLOW_RADIUS * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawTarget(ctx: CanvasRenderingContext2D, point: Point) {
  // Draw outer circle
  ctx.beginPath();
  ctx.fillStyle = TARGET_POINT.COLOR.SECONDARY;
  ctx.strokeStyle = TARGET_POINT.COLOR.PRIMARY;
  ctx.lineWidth = 2;
  ctx.arc(point.x, point.y, TARGET_POINT.OUTER_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Draw inner circle
  ctx.beginPath();
  ctx.fillStyle = TARGET_POINT.COLOR.PRIMARY;
  ctx.arc(point.x, point.y, TARGET_POINT.INNER_RADIUS, 0, Math.PI * 2);
  ctx.fill();
}

export function drawTargetPoint({ ctx, point }: DrawTargetPointOptions) {
  if (!point || !isFinite(point.x) || !isFinite(point.y)) return;
  
  ctx.save();
  drawGlow(ctx, point);
  drawTarget(ctx, point);
  ctx.restore();
}