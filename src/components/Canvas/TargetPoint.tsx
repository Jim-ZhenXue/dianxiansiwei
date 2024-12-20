import React from 'react';
import { Point } from '../../types';
import { POINT_RADIUS } from '../../constants';

interface TargetPointProps {
  ctx: CanvasRenderingContext2D;
  point: Point;
}

export function drawTargetPoint({ ctx, point }: TargetPointProps) {
  const originalStyle = ctx.strokeStyle;
  const originalFillStyle = ctx.fillStyle;
  
  // Outer red circle
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.arc(point.x, point.y, POINT_RADIUS * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Inner red dot
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(point.x, point.y, POINT_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  
  // Restore original styles
  ctx.strokeStyle = originalStyle;
  ctx.fillStyle = originalFillStyle;
}