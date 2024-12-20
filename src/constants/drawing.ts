// Point visualization
export const POINT_RADIUS = {
  POINT: 5,
  LINE: 1.25,
  RAY: 1.25,
  DIRECTION: 1.25
} as const;

// Line visualization
export const LINE_STYLE = {
  COLOR: '#000000',
  WIDTH: 1
} as const;

// Ray visualization
export const RAY_STYLE = {
  COLOR: '#000000',
  WIDTH: 1,
  DASH: [5, 5] // Creates a dashed line effect
} as const;

// Arrow visualization
export const ARROW = {
  HEAD_LENGTH: 15,
  HEAD_ANGLE: Math.PI / 6,
  WIDTH: 1.5
} as const;