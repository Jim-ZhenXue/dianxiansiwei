import { Point } from '../../types';
import { calculateDistance } from './calculateDistance';
import { GAME } from '../../constants';

export function isPointInRange(point: Point, target: Point): boolean {
  return calculateDistance(point, target) < GAME.TARGET_HIT_DISTANCE;
}