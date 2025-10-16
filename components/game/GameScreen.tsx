'use client';

import { useState, useEffect, useCallback } from 'react';
import { Board } from './Board';
import { KeyBar } from './KeyBar';
import { HUD } from './HUD';
import { VictoryModal } from './VictoryModal';
import { Particles } from './Particles';
import {
  Level,
  KeyId,
  GameState,
  initGameState,
  makeMove,
  undoMove,
  resetGame,
  isSolved,
  calculateStars
} from '@/lib/game-engine';
import {
  playCellClick,
  playKeySelect,
  playUnlock,
  playVictory,
  playUndo,
  playReset,
  startBackgroundMusic,
  initAudio
} from '@/lib/audio';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface GameScreenProps {
  level: Level;
  onBack: () => void;
  onNextLevel: () => void;
  onReplay: () => void;
  isLastLevel?: boolean;
}

export function GameScreen({ level, onBack, onNextLevel, onReplay, isLastLevel }: GameScreenProps) {
  const [gameState, setGameState] = useState<GameState>(() => initGameState(level));
  const [selectedKey, setSelectedKey] = useState<KeyId | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [showVictory, setShowVictory] = useState(false);
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [particlePos, setParticlePos] = useState({ x: 0, y: 0 });

  const currentStars = calculateStars(gameState.moves, level.par);

  useEffect(() => {
    initAudio();
    startBackgroundMusic();
    setGameState(initGameState(level));
    setSelectedKey(null);
    setSelectedCell(null);
    setShowVictory(false);
  }, [level]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!selectedKey) {
      setSelectedCell({ row, col });
      if (level.allowedKeys.length > 0) {
        setSelectedKey(level.allowedKeys[0]);
      }
      return;
    }

    playCellClick();
    setSelectedCell({ row, col });

    const newState = makeMove(gameState, selectedKey, row, col);
    setGameState(newState);

    const cellKey = `${row}-${col}`;
    setAnimatingCells(new Set([cellKey]));
    setTimeout(() => setAnimatingCells(new Set()), 300);

    setParticlePos({ x: col * 68 + 30, y: row * 68 + 30 });
    setParticleTrigger(prev => prev + 1);

    if (isSolved(newState.board)) {
      setTimeout(() => {
        playVictory();
        setShowVictory(true);
      }, 500);
    } else {
      playUnlock();
    }
  }, [selectedKey, gameState, level]);

  const handleUndo = useCallback(() => {
    playUndo();
    setGameState(undoMove(gameState));
  }, [gameState]);

  const handleReset = useCallback(() => {
    playReset();
    setGameState(resetGame(level));
    setSelectedCell(null);
  }, [level]);

  const handleKeySelect = useCallback((key: KeyId) => {
    playKeySelect();
    setSelectedKey(key);
  }, []);

  const handleVictoryNext = useCallback(() => {
    setShowVictory(false);
    onNextLevel();
  }, [onNextLevel]);

  const handleVictoryReplay = useCallback(() => {
    setShowVictory(false);
    onReplay();
  }, [onReplay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showVictory) return;

      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        handleUndo();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key >= '1' && e.key <= '3') {
        const index = parseInt(e.key) - 1;
        if (index < level.allowedKeys.length) {
          setSelectedKey(level.allowedKeys[index]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVictory, handleUndo, handleReset, level.allowedKeys]);

  const timeSeconds = Math.floor((Date.now() - gameState.startTime) / 1000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between animate-in fade-in duration-300 delay-100">
          <Button onClick={onBack} variant="outline" size="icon" className="hover:scale-110 transition-transform duration-200">
            <Home className="w-4 h-4" />
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">{level.name}</h1>
            {level.description && (
              <p className="text-sm text-slate-400">{level.description}</p>
            )}
          </div>
          <div className="w-10" />
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 space-y-4 transition-all duration-300 hover:bg-slate-800/60 animate-in fade-in duration-300 delay-200">
          <HUD
            moves={gameState.moves}
            par={level.par}
            stars={currentStars}
            canUndo={gameState.history.length > 0}
            onUndo={handleUndo}
            onReset={handleReset}
          />
        </div>

        <div className="relative flex justify-center bg-slate-800/50 backdrop-blur rounded-lg p-6 transition-all duration-300 hover:bg-slate-800/60 animate-in fade-in zoom-in-95 duration-300 delay-300">
          <Board
            board={gameState.board}
            selectedCell={selectedCell}
            onCellClick={handleCellClick}
            animatingCells={animatingCells}
          />
          <Particles
            trigger={particleTrigger}
            x={particlePos.x}
            y={particlePos.y}
            color="#10b981"
          />
        </div>

        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 transition-all duration-300 hover:bg-slate-800/60 animate-in fade-in duration-300 delay-400">
          <KeyBar
            allowedKeys={level.allowedKeys}
            selectedKey={selectedKey}
            onKeySelect={handleKeySelect}
          />
        </div>

        <div className="text-center text-xs text-slate-500 space-y-1 animate-in fade-in duration-300 delay-500">
          <p>Click a cell to place selected key • Keys: 1-3 • Undo: U • Reset: R</p>
        </div>
      </div>

      <VictoryModal
        open={showVictory}
        levelId={level.id}
        stars={currentStars}
        moves={gameState.moves}
        par={level.par}
        timeSeconds={timeSeconds}
        onNext={handleVictoryNext}
        onReplay={handleVictoryReplay}
        isLastLevel={isLastLevel}
      />
    </div>
  );
}