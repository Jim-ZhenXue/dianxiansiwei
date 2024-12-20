import { Point } from '../../types';
import { ARROW, CANVAS } from '../../constants';
import { calculateFlashOpacity } from '../animation';

function constrainPoint(point: Point): Point {
  return {
    x: Math.max(ARROW.HEAD_LENGTH, Math.min(CANVAS.WIDTH - ARROW.HEAD_LENGTH, point.x)),
    y: Math.max(ARROW.HEAD_LENGTH, Math.min(CANVAS.HEIGHT - ARROW.HEAD_LENGTH, point.y))
  };
}

export function drawArrow(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  ctx.save();
  
  // Enable anti-aliasing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Calculate flash opacity
  const opacity = calculateFlashOpacity();
  
  // Use whole pixel values to prevent sub-pixel rendering
  const constrainedStart = constrainPoint({
    x: Math.round(start.x),
    y: Math.round(start.y)
  });
  const constrainedEnd = constrainPoint({
    x: Math.round(end.x),
    y: Math.round(end.y)
  });

  // Set line styles with opacity
  ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
  ctx.lineWidth = ARROW.WIDTH;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Draw the main line
  ctx.beginPath();
  ctx.moveTo(constrainedStart.x, constrainedStart.y);
  ctx.lineTo(constrainedEnd.x, constrainedEnd.y);
  ctx.stroke();

  // Calculate arrow head angle
  const angle = Math.atan2(
    constrainedEnd.y - constrainedStart.y,
    constrainedEnd.x - constrainedStart.x
  );

  // Draw arrow head in a single path
  ctx.beginPath();
  ctx.moveTo(constrainedEnd.x, constrainedEnd.y);
  ctx.lineTo(
    constrainedEnd.x - ARROW.HEAD_LENGTH * Math.cos(angle - ARROW.HEAD_ANGLE),
    constrainedEnd.y - ARROW.HEAD_LENGTH * Math.sin(angle - ARROW.HEAD_ANGLE)
  );
  ctx.moveTo(constrainedEnd.x, constrainedEnd.y);
  ctx.lineTo(
    constrainedEnd.x - ARROW.HEAD_LENGTH * Math.cos(angle + ARROW.HEAD_ANGLE),
    constrainedEnd.y - ARROW.HEAD_LENGTH * Math.sin(angle + ARROW.HEAD_ANGLE)
  );
  ctx.stroke();
  
  ctx.restore();
}