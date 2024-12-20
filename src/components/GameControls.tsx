import React from 'react';
import { GameMode } from '../types';

interface GameControlsProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  score: number;
  level: number;
}

export function GameControls({ currentMode, onModeChange, score, level }: GameControlsProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      {/* Mode Selection */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">模式选择</h2>
        <div className="flex flex-col gap-2">
          {[
            { mode: 'POINT' as GameMode, label: '点' },
            { mode: 'LINE' as GameMode, label: '线段' },
            { mode: 'DIRECTION' as GameMode, label: '直线' },
            { mode: 'RAY' as GameMode, label: '射线' },
          ].map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                currentMode === mode
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">游戏状态</h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-100 p-3 rounded-md">
            <div className="text-sm text-green-800">分数</div>
            <div className="text-xl font-bold text-green-900">{score}</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded-md">
            <div className="text-sm text-yellow-800">等级</div>
            <div className="text-xl font-bold text-yellow-900">{level}</div>
          </div>
        </div>
      </div>
    </div>
  );
}