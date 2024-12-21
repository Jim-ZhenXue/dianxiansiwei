import React from 'react';
import { Instructions } from './Instructions';
import { GameControls } from './GameControls';
import { GameCanvas } from './Canvas/GameCanvas';
import { useGameState } from '../hooks/useGameState';

export function Game() {
  const { gameState, handleCanvasClick, handleRayRotation, switchMode, toggleGrid } = useGameState();

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          <span className="title-gradient">点</span>
          <span>与</span>
          <span className="title-gradient">线</span>
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        {/* Left Panel - Controls and Instructions */}
        <div className="md:w-1/4 space-y-4">
          <GameControls 
            currentMode={gameState.mode}
            onModeChange={switchMode}
            score={gameState.score}
            level={gameState.level}
            showGrid={gameState.showGrid}
            onToggleGrid={toggleGrid}
          />
          <Instructions mode={gameState.mode} />
        </div>

        {/* Right Panel - Canvas */}
        <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-lg p-4">
          <GameCanvas 
            gameState={gameState}
            onCanvasClick={handleCanvasClick}
          />
        </div>
      </main>
    </div>
  );
}
