'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Grid3x3, Trophy, Music, VolumeX } from 'lucide-react';
import { HowToPlay } from './HowToPlay';
import { startBackgroundMusic, stopBackgroundMusic, isMusicActive } from '@/lib/audio';

interface StartScreenProps {
  onPlay: () => void;
  onLevelSelect: () => void;
  onLeaderboard: () => void;
}

export function StartScreen({ onPlay, onLevelSelect, onLeaderboard }: StartScreenProps) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    setIsMusicPlaying(isMusicActive());
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
      setIsMusicPlaying(false);
    } else {
      startBackgroundMusic();
      setIsMusicPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <Button
        onClick={toggleMusic}
        size="icon"
        variant="outline"
        className="absolute top-4 right-4 z-20 border-slate-600 hover:bg-slate-700 hover:border-slate-500 transition-all duration-200"
        title={isMusicPlaying ? 'Stop Music' : 'Play Music'}
      >
        {isMusicPlaying ? <Music className="w-4 h-4 text-green-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
      </Button>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-2xl w-full space-y-4 text-center relative z-10">
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl animate-in zoom-in duration-500 delay-150">🔓</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight animate-in slide-in-from-bottom-2 duration-500 delay-200">
            Locksmith
          </h1>
          <p className="text-lg text-amber-400 font-semibold animate-in fade-in duration-500 delay-300">
            Ripple Run
          </p>
          <p className="text-slate-300 text-base max-w-md mx-auto animate-in fade-in duration-500 delay-400 leading-relaxed">
            Use keys to unlock all cells. Each key creates a ripple effect that changes the board.
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-sm mx-auto animate-in fade-in duration-500 delay-500">
          <Button
            onClick={onPlay}
            size="lg"
            className="text-base h-12 gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-green-600 hover:to-green-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/50"
          >
            <Play className="w-4 h-4" />
            Start Playing
          </Button>

          <Button
            onClick={onLevelSelect}
            size="lg"
            variant="outline"
            className="text-base h-12 gap-2 border-slate-600 hover:bg-green-600 hover:border-green-500 hover:text-white hover:scale-105 transition-all duration-200"
          >
            <Grid3x3 className="w-4 h-4" />
            Level Select
          </Button>

          <Button
            onClick={onLeaderboard}
            size="lg"
            variant="outline"
            className="text-base h-12 gap-2 border-slate-600 hover:bg-green-600 hover:border-green-500 hover:text-white hover:scale-105 transition-all duration-200"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </Button>

          <HowToPlay />
        </div>

        <div className="pt-4 space-y-3 animate-in fade-in duration-500 delay-700">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-2xl">━</span>
              <span>Line Key</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-2xl">✚</span>
              <span>Cross Key</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-2xl">◉</span>
              <span>Wave Key</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-xl">🔒</span>
              <span>Locked</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-xl">🔓</span>
              <span>Unlocked</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-200 transition-colors duration-200">
              <span className="text-xl">⚠️</span>
              <span>Jammed</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 pt-2 font-medium">
          Made for Game Jam 2025 • Theme: Unlocked
        </div>

        <div className="pt-4 border-t border-slate-700/50 mt-4 animate-in fade-in duration-500 delay-1000">
          <a
            href="https://www.pascalmariany.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 group"
          >
            <img
              src="/1751397607898.jpeg"
              alt="Pascal Mariany"
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-slate-400 transition-colors duration-300"
            />
            <div className="text-xs text-slate-300 group-hover:text-slate-200 transition-colors duration-300 font-medium">
              Created by <span className="text-slate-200 font-semibold group-hover:text-white">Pascal Mariany</span>
            </div>
            <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              www.pascalmariany.eu
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}