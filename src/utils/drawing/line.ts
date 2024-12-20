import { Point } from '../../types';
import { LINE_STYLE } from '../../constants';

export function drawLine(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  ctx.save();
  
  ctx.strokeStyle = LINE_STYLE.COLOR;
  ctx.lineWidth = LINE_STYLE.WIDTH;
  
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.closePath();
  
  ctx.restore();
}