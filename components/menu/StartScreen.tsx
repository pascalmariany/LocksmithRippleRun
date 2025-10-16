'use client';

import { Button } from '@/components/ui/button';
import { Play, Grid3x3, Trophy } from 'lucide-react';

interface StartScreenProps {
  onPlay: () => void;
  onLevelSelect: () => void;
  onLeaderboard: () => void;
}

export function StartScreen({ onPlay, onLevelSelect, onLeaderboard }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-6xl animate-in zoom-in duration-500 delay-150">🔓</span>
          </div>
          <h1 className="text-6xl font-bold text-white tracking-tight animate-in slide-in-from-bottom-2 duration-500 delay-200">
            Locksmith
          </h1>
          <p className="text-xl text-amber-500 font-semibold animate-in fade-in duration-500 delay-300">
            Ripple Run
          </p>
          <p className="text-slate-400 text-lg max-w-md mx-auto animate-in fade-in duration-500 delay-400">
            Use keys to unlock all cells. Each key creates a ripple effect that changes the board.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-sm mx-auto animate-in fade-in duration-500 delay-500">
          <Button
            onClick={onPlay}
            size="lg"
            className="text-lg h-14 gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
          >
            <Play className="w-5 h-5" />
            Start Playing
          </Button>

          <Button
            onClick={onLevelSelect}
            size="lg"
            variant="outline"
            className="text-lg h-14 gap-3 border-slate-600 hover:bg-slate-800 hover:scale-105 transition-all duration-200 hover:border-slate-500"
          >
            <Grid3x3 className="w-5 h-5" />
            Level Select
          </Button>

          <Button
            onClick={onLeaderboard}
            size="lg"
            variant="outline"
            className="text-lg h-14 gap-3 border-slate-600 hover:bg-slate-800 hover:scale-105 transition-all duration-200 hover:border-slate-500"
          >
            <Trophy className="w-5 h-5" />
            Leaderboard
          </Button>
        </div>

        <div className="pt-8 space-y-4 animate-in fade-in duration-500 delay-700">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-2xl">━</span>
              <span>Line Key</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-2xl">✚</span>
              <span>Cross Key</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-2xl">◉</span>
              <span>Wave Key</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-xl">🔒</span>
              <span>Locked</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-xl">🔓</span>
              <span>Unlocked</span>
            </div>
            <div className="flex items-center gap-2 hover:text-slate-300 transition-colors duration-200">
              <span className="text-xl">⚠️</span>
              <span>Jammed</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 pt-4">
          Made for Game Jam 2025 • Theme: Unlocked
        </div>

        <div className="pt-8 border-t border-slate-700/50 mt-8 animate-in fade-in duration-500 delay-1000">
          <a
            href="https://www.pascalmariany.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 hover:scale-105 transition-all duration-300 group"
          >
            <img
              src="/1751397607898.jpeg"
              alt="Pascal Mariany"
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-600 group-hover:border-slate-400 transition-colors duration-300"
            />
            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              Created by <span className="text-slate-300 font-semibold group-hover:text-white">Pascal Mariany</span>
            </div>
            <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
              www.pascalmariany.eu
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}