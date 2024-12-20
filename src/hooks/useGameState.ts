import { useState, useCallback, useEffect } from 'react';
import { GameState, GameMode, Point } from '../types';
import { generateRandomPoint } from '../utils/pointGeneration';
import { isPointInRange } from '../utils/geometry';
import { CANVAS, GAME } from '../constants';

export function useGameState() {
  const [state, setState] = useState<GameState>({
    mode: 'POINT',
    points: [],
    score: 0,
    level: 1,
    targetPoint: generateRandomPoint(),
    angle: 0
  });

  // Ensure target point exists in POINT mode
  useEffect(() => {
    if (state.mode === 'POINT' && !state.targetPoint) {
      setState(prev => ({
        ...prev,
        targetPoint: generateRandomPoint()
      }));
    }
  }, [state.mode, state.targetPoint]);

  // Handle ray rotation
  const handleRayRotation = useCallback((angle: number) => {
    setState(prev => ({
      ...prev,
      angle
    }));
  }, []);

  const handleCanvasClick = useCallback((newPoint: Point) => {
    setState(prev => {
      if (prev.mode === 'POINT' && prev.targetPoint) {
        if (isPointInRange(newPoint, prev.targetPoint)) {
          // Hit the target - update score and generate new target
          return {
            ...prev,
            score: prev.score + GAME.POINT_SCORE,
            level: prev.level + 1,
            points: [],
            targetPoint: generateRandomPoint()
          };
        }
        // Missed the target - just add the point
        return {
          ...prev,
          points: [...prev.points, newPoint]
        };
      }
      
      // LINE mode - store two points to create a line
      if (prev.mode === 'LINE') {
        // If we have no points yet, this is the first point
        if (prev.points.length === 0) {
          return {
            ...prev,
            points: [newPoint]
          };
        }
        // If we already have one point, this is the second point
        if (prev.points.length === 1) {
          return {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
        // If we already have two points, start over with the new point
        return {
          ...prev,
          points: [newPoint]
        };
      }

      // RAY mode - store two points (start point and direction point)
      if (prev.mode === 'RAY') {
        // If we have no points yet, this is the start point
        if (prev.points.length === 0) {
          return {
            ...prev,
            points: [newPoint]
          };
        }
        // If we already have the start point, this is the direction point
        if (prev.points.length === 1) {
          return {
            ...prev,
            points: [...prev.points, newPoint]
          };
        }
        // If we already have two points, start over with the new point
        return {
          ...prev,
          points: [newPoint]
        };
      }

      // DIRECTION mode - add point
      return {
        ...prev,
        points: [...prev.points, newPoint]
      };
    });
  }, []);

  const switchMode = useCallback((mode: GameMode) => {
    setState(prev => ({
      ...prev,
      mode,
      points: [],
      angle: mode === 'RAY' ? 0 : undefined,
      targetPoint: mode === 'POINT' 
        ? generateRandomPoint()
        : null
    }));
  }, []);

  return {
    gameState: state,
    handleCanvasClick,
    handleRayRotation,
    switchMode,
  };
}