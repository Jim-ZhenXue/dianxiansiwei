import { GameState } from '../../types';
import { drawPoint, drawLine, drawArrow, drawInfiniteLine, drawRay } from '../../utils/drawing';
import { drawTargetPoint } from './TargetPoint';
import { drawSpatialMarkers } from './SpatialMarkers';
import { drawGrid } from './Grid';

export function drawGameElements(ctx: CanvasRenderingContext2D, gameState: GameState) {
  // Clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw grid lines only if showGrid is true
  if (gameState.showGrid) {
    drawGrid(ctx);
  }

  // Draw target point and spatial markers (if in POINT mode)
  if (gameState.mode === 'POINT' && gameState.targetPoint) {
    drawTargetPoint({ ctx, point: gameState.targetPoint });
    drawSpatialMarkers({ ctx, point: gameState.targetPoint });
  }

  // Draw user-placed points
  gameState.points.forEach((point, index) => {
    drawPoint(ctx, point.x, point.y);
  });

  // Draw lines or arrows based on mode and points
  if (gameState.points.length >= 2) {
    // Draw all lines by iterating through pairs of points
    for (let i = 0; i < gameState.points.length - 1; i += 2) {
      const start = gameState.points[i];
      const end = gameState.points[i + 1];

      switch (gameState.mode) {
        case 'LINE':
          drawLine(ctx, start, end);
          break;
        case 'RAY':
          drawRay(ctx, start, end);
          break;
        case 'DIRECTION':
          drawInfiniteLine(ctx, start, end);
          break;
      }
    }
  }
}