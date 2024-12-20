import { CANVAS, GRID } from '../../constants';

export function drawGrid(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = GRID.LINE_COLOR;
  ctx.lineWidth = GRID.LINE_WIDTH;

  // Draw vertical lines
  for (let x = 0; x <= CANVAS.WIDTH; x += CANVAS.WIDTH / GRID.COLS) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, CANVAS.HEIGHT);
    ctx.stroke();
  }

  // Draw horizontal lines
  for (let y = 0; y <= CANVAS.HEIGHT; y += CANVAS.HEIGHT / GRID.ROWS) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(CANVAS.WIDTH, y);
    ctx.stroke();
  }

  ctx.restore();
}