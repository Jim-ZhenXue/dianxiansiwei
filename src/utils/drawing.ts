import { Point } from '../types';

export function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

export function drawLine(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.closePath();
}

export function drawArrow(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  const headLength = 15;
  const angle = Math.atan2(end.y - start.y, end.x - start.x);

  // Draw the line
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // Draw the arrow head
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle - Math.PI / 6),
    end.y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(
    end.x - headLength * Math.cos(angle + Math.PI / 6),
    end.y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}

// Draw an infinite line given two points
export function drawInfiniteLine(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  const canvas = ctx.canvas;
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Handle special cases where line is perfectly vertical or horizontal
  if (dx === 0 && dy === 0) {
    // Points are the same, just draw a point
    drawPoint(ctx, start.x, start.y);
    return;
  }

  let t1: number, t2: number;

  if (dx === 0) {
    // Vertical line
    t1 = -start.y / canvas.height;
    t2 = canvas.height / canvas.height;
  } else if (dy === 0) {
    // Horizontal line
    t1 = -start.x / canvas.width;
    t2 = canvas.width / canvas.width;
  } else if (Math.abs(dx) > Math.abs(dy)) {
    // Line is more horizontal
    t1 = -start.x / dx;  // Left edge
    t2 = (canvas.width - start.x) / dx;  // Right edge
  } else {
    // Line is more vertical
    t1 = -start.y / dy;  // Top edge
    t2 = (canvas.height - start.y) / dy;  // Bottom edge
  }

  const extendedStart = {
    x: start.x + t1 * dx,
    y: start.y + t1 * dy
  };

  const extendedEnd = {
    x: start.x + t2 * dx,
    y: start.y + t2 * dy
  };

  // Draw the extended line
  ctx.beginPath();
  ctx.moveTo(extendedStart.x, extendedStart.y);
  ctx.lineTo(extendedEnd.x, extendedEnd.y);
  ctx.stroke();
  ctx.closePath();
}

export function drawRay(ctx: CanvasRenderingContext2D, start: Point, end: Point) {
  const canvas = ctx.canvas;
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // If start and end points are the same, just draw a point
  if (dx === 0 && dy === 0) {
    drawPoint(ctx, start.x, start.y);
    return;
  }

  // Calculate the angle of the ray
  const angle = Math.atan2(dy, dx);

  // Calculate the maximum distance needed to reach canvas edge
  const maxDistance = Math.sqrt(
    Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)
  );

  // Calculate the end point that extends beyond canvas bounds
  const extendedEnd = {
    x: start.x + Math.cos(angle) * maxDistance,
    y: start.y + Math.sin(angle) * maxDistance
  };

  // Draw the ray
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(extendedEnd.x, extendedEnd.y);
  ctx.stroke();
  ctx.closePath();
}