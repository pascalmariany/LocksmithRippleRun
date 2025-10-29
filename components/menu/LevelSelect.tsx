'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Lock } from 'lucide-react';
import { Level } from '@/lib/game-engine';

interface LevelSelectProps {
  levels: Level[];
  highestUnlocked: number;
  levelStars: Record<string, number>;
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

export function LevelSelect({
  levels,
  highestUnlocked,
  levelStars,
  onSelectLevel,
  onBack
}: LevelSelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-white">Level Select</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {levels.map((level, index) => {
            const levelNum = index + 1;
            const isUnlocked = levelNum <= highestUnlocked;
            const stars = levelStars[level.id] || 0;

            return (
              <button
                key={level.id}
                onClick={() => isUnlocked && onSelectLevel(level)}
                disabled={!isUnlocked}
                className={`
                  relative p-6 rounded-lg transition-all duration-200
                  ${isUnlocked
                    ? 'bg-slate-800/60 hover:bg-slate-700/70 cursor-pointer border-2 border-slate-600 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20'
                    : 'bg-slate-900/50 cursor-not-allowed border-2 border-slate-800 opacity-40'
                  }
                `}
              >
                <div className="space-y-2">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {levelNum}
                    </div>
                    {!isUnlocked && (
                      <Lock className="w-4 h-4 mx-auto mt-1 text-slate-600" />
                    )}
                  </div>

                  {isUnlocked && (
                    <>
                      <div className="text-xs text-slate-300 text-center truncate font-medium">
                        {level.name}
                      </div>

                      <div className="flex justify-center gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= stars
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="text-xs text-slate-400 text-center font-medium">
                        Par: {level.par}
                      </div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-800/60 backdrop-blur rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between text-sm text-slate-300 font-medium">
            <div>
              Levels Unlocked: <span className="text-white font-bold">{highestUnlocked}</span> / {levels.length}
            </div>
            <div>
              Total Stars: <span className="text-yellow-400 font-bold">{Object.values(levelStars).reduce((a, b) => a + b, 0)}</span> / {levels.length * 3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}