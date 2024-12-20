import { Point, GameMode } from '../../types';
import { POINT_RADIUS } from '../../constants';

export function drawPoint(
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  mode: GameMode = 'POINT'
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, POINT_RADIUS[mode], 0, Math.PI * 2);
  
  if (mode === 'POINT') {
    // Solid point for POINT mode
    ctx.fillStyle = '#000';
    ctx.fill();
  } else {
    // Hollow point for LINE and DIRECTION modes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  ctx.closePath();
  ctx.restore();
}