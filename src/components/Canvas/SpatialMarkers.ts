import { Point } from '../../types';
import { CANVAS } from '../../constants';

interface DrawSpatialMarkersOptions {
  ctx: CanvasRenderingContext2D;
  point: Point;
}

export function drawSpatialMarkers({ ctx, point }: DrawSpatialMarkersOptions) {
  ctx.save();
  
  // Style for markers
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  
  // Calculate positions relative to canvas boundaries
  const leftEdge = point.x < CANVAS.WIDTH / 3;
  const rightEdge = point.x > (CANVAS.WIDTH * 2) / 3;
  const topEdge = point.y < CANVAS.HEIGHT / 3;
  const bottomEdge = point.y > (CANVAS.HEIGHT * 2) / 3;
  
  // Draw position markers with arrows
  const offset = 40;
  
  // Horizontal position
  if (leftEdge) {
    ctx.fillText('← 左', point.x - offset, point.y);
  } else if (rightEdge) {
    ctx.fillText('右 →', point.x + offset, point.y);
  }
  
  // Vertical position
  if (topEdge) {
    ctx.fillText('↑ 上', point.x, point.y - offset);
  } else if (bottomEdge) {
    ctx.fillText('下 ↓', point.x, point.y + offset);
  }
  
  // Draw center marker if point is in the middle area
  if (!leftEdge && !rightEdge && !topEdge && !bottomEdge) {
    ctx.fillText('中', point.x, point.y - offset);
  }
  
  ctx.restore();
}