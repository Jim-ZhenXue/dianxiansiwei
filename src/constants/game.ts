export const GAME = {
  TARGET_HIT_DISTANCE: 20,
  POINT_SCORE: 100,
  BOUNDARY_PADDING: 80, // Minimum distance from canvas edges
  GRID_LINE_PADDING: 40 // Minimum distance from grid lines
} as const;

export const GRID = {
  COLS: 3,
  ROWS: 3,
  LINE_COLOR: 'rgba(0, 0, 0, 0.1)',
  LINE_WIDTH: 1
} as const;