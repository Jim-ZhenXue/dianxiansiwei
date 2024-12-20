import { GameState } from '../../types';
import { drawPoint, drawLine, drawArrow, drawInfiniteLine } from '../../utils/drawing';
import { drawTargetPoint } from './TargetPoint';
import { drawSpatialMarkers } from './SpatialMarkers';
import { drawGrid } from './Grid';

export function drawGameElements(ctx: CanvasRenderingContext2D, gameState: GameState) {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw grid lines for visual reference
  drawGrid(ctx);

  // Draw target point and spatial markers (if in POINT mode)
  if (gameState.mode === 'POINT' && gameState.targetPoint) {
    drawTargetPoint({ ctx, point: gameState.targetPoint });
    drawSpatialMarkers({ ctx, point: gameState.targetPoint });
  }

  // Draw user-placed points
  gameState.points.forEach(point => {
    drawPoint(ctx, point.x, point.y, gameState.mode);
  });

  // Draw lines or arrows based on mode and points
  if (gameState.points.length >= 2) {
    const start = gameState.points[gameState.points.length - 2];
    const end = gameState.points[gameState.points.length - 1];

    switch (gameState.mode) {
      case 'LINE':
        // Draw line between the last two points
        drawLine(ctx, start, end);
        break;
      case 'DIRECTION':
        drawArrow(ctx, start, end);
        break;
      case 'RAY':
        // Draw infinite line starting from start point in the direction of end point
        drawInfiniteLine(ctx, start, end);
        break;
    }
  }
}