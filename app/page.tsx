'use client';

import { useState, useEffect } from 'react';
import { StartScreen } from '@/components/menu/StartScreen';
import { LevelSelect } from '@/components/menu/LevelSelect';
import { Leaderboard } from '@/components/menu/Leaderboard';
import { GameScreen } from '@/components/game/GameScreen';
import { LEVELS } from '@/lib/levels';
import { Level } from '@/lib/game-engine';

type Screen = 'start' | 'levelSelect' | 'leaderboard' | 'game';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentLevel, setCurrentLevel] = useState<Level>(LEVELS[0]);
  const [highestUnlocked, setHighestUnlocked] = useState(1);
  const [levelStars, setLevelStars] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('locksmith-progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHighestUnlocked(data.highestUnlocked || 1);
        setLevelStars(data.levelStars || {});
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  const saveProgress = (unlocked: number, stars: Record<string, number>) => {
    localStorage.setItem('locksmith-progress', JSON.stringify({
      highestUnlocked: unlocked,
      levelStars: stars
    }));
  };

  const handlePlay = () => {
    const lastPlayedIndex = Math.min(highestUnlocked - 1, LEVELS.length - 1);
    setCurrentLevel(LEVELS[lastPlayedIndex]);
    setScreen('game');
  };

  const handleLevelSelect = () => {
    setScreen('levelSelect');
  };

  const handleLeaderboard = () => {
    setScreen('leaderboard');
  };

  const handleSelectLevel = (level: Level) => {
    setCurrentLevel(level);
    setScreen('game');
  };

  const handleBackToMenu = () => {
    setScreen('start');
  };

  const handleNextLevel = () => {
    const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.id);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= highestUnlocked && nextIndex < LEVELS.length) {
      const newUnlocked = nextIndex + 1;
      setHighestUnlocked(newUnlocked);
      saveProgress(newUnlocked, levelStars);
    }

    if (nextIndex < LEVELS.length) {
      setCurrentLevel(LEVELS[nextIndex]);
    } else {
      setScreen('levelSelect');
    }
  };

  const handleReplay = () => {
    const index = LEVELS.findIndex(l => l.id === currentLevel.id);
    setCurrentLevel(LEVELS[index]);
  };

  const updateLevelStars = (levelId: string, stars: number) => {
    const newStars = { ...levelStars };
    if (!newStars[levelId] || stars > newStars[levelId]) {
      newStars[levelId] = stars;
      setLevelStars(newStars);
      saveProgress(highestUnlocked, newStars);
    }
  };

  return (
    <>
      {screen === 'start' && (
        <StartScreen
          onPlay={handlePlay}
          onLevelSelect={handleLevelSelect}
          onLeaderboard={handleLeaderboard}
        />
      )}

      {screen === 'levelSelect' && (
        <LevelSelect
          levels={LEVELS}
          highestUnlocked={highestUnlocked}
          levelStars={levelStars}
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToMenu}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          onBack={handleBackToMenu}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          level={currentLevel}
          onBack={handleBackToMenu}
          onNextLevel={handleNextLevel}
          onReplay={handleReplay}
          isLastLevel={currentLevel.id === LEVELS[LEVELS.length - 1].id}
        />
      )}
    </>
  );
}
