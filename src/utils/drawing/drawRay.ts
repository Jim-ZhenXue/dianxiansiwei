import { Point } from '../../types';
import { CANVAS, RAY_STYLE } from '../../constants';

export function drawRay(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  ctx.save();
  
  // Set ray style
  ctx.strokeStyle = RAY_STYLE.COLOR;
  ctx.lineWidth = RAY_STYLE.WIDTH;
  ctx.setLineDash(RAY_STYLE.DASH);
  
  // Calculate angle and extend to canvas boundary
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  
  // Calculate the point where the ray intersects the canvas boundary
  const maxLength = Math.max(CANVAS.WIDTH, CANVAS.HEIGHT) * 2;
  const extendedEnd = {
    x: start.x + Math.cos(angle) * maxLength,
    y: start.y + Math.sin(angle) * maxLength
  };
  
  // Draw the ray
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(extendedEnd.x, extendedEnd.y);
  ctx.stroke();
  
  ctx.restore();
}