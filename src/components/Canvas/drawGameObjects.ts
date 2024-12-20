import { GameState } from '../../types';
import { drawLine, drawArrow } from '../../utils/drawing';

export function drawGameObjects(ctx: CanvasRenderingContext2D, gameState: GameState) {
  if (gameState.points.length < 2) return;

  const start = gameState.points[gameState.points.length - 2];
  const end = gameState.points[gameState.points.length - 1];

  if (gameState.mode === 'LINE') {
    drawLine(ctx, start, end);
  } else if (gameState.mode === 'DIRECTION') {
    drawArrow(ctx, start, end);
  }
}