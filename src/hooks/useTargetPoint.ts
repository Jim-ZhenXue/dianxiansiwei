import { useState, useCallback } from 'react';
import { Point, GameMode } from '../types';
import { generateRandomPoint } from '../utils/pointGeneration';
import { isPointInRange } from '../utils/geometry';

export function useTargetPoint() {
  const [targetPoint, setTargetPoint] = useState<Point | null>(() => 
    generateRandomPoint()
  );

  const checkTargetHit = useCallback((point: Point): boolean => {
    if (!targetPoint) return false;
    return isPointInRange(point, targetPoint);
  }, [targetPoint]);

  const generateNewTarget = useCallback(() => {
    const newTarget = generateRandomPoint();
    setTargetPoint(newTarget);
  }, []);

  const updateTargetPoint = useCallback((mode: GameMode) => {
    if (mode === 'POINT') {
      generateNewTarget();
    } else {
      setTargetPoint(null);
    }
  }, [generateNewTarget]);

  return {
    targetPoint,
    checkTargetHit,
    updateTargetPoint,
    generateNewTarget
  };
}