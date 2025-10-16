'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Trophy, Star, Timer, Target } from 'lucide-react';
import { getLeaderboard, getGlobalLeaderboard, LeaderboardEntry } from '@/lib/leaderboard';
import { LEVELS } from '@/lib/levels';

interface LeaderboardProps {
  onBack: () => void;
}

type ViewMode = 'global' | string;

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('global');
  const [levelEntries, setLevelEntries] = useState<LeaderboardEntry[]>([]);
  const [globalEntries, setGlobalEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [viewMode]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      if (viewMode === 'global') {
        const data = await getGlobalLeaderboard(50);
        setGlobalEntries(data);
      } else {
        const data = await getLeaderboard(viewMode, 50);
        setLevelEntries(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLevelName = (levelId: string) => {
    return LEVELS.find(l => l.id === levelId)?.name || levelId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">
        <div className="flex items-center justify-between">
          <Button onClick={onBack} variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Leaderboard
          </h1>
          <div className="w-10" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setViewMode('global')}
            variant={viewMode === 'global' ? 'default' : 'outline'}
            size="sm"
          >
            Global
          </Button>
          {LEVELS.map(level => (
            <Button
              key={level.id}
              onClick={() => setViewMode(level.id)}
              variant={viewMode === level.id ? 'default' : 'outline'}
              size="sm"
            >
              {level.name}
            </Button>
          ))}
        </div>

        <Card className="bg-slate-800/50 backdrop-blur border-slate-700 p-6 max-h-[600px] overflow-y-auto">
          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading...</div>
          ) : viewMode === 'global' ? (
            <div className="space-y-2">
              {globalEntries.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  No scores yet. Be the first!
                </div>
              ) : (
                globalEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold w-8 ${
                          index === 0
                            ? 'text-yellow-500'
                            : index === 1
                            ? 'text-gray-400'
                            : index === 2
                            ? 'text-amber-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{entry.nickname}</div>
                        <div className="text-sm text-slate-400">
                          {entry.levels_completed} levels • {entry.total_stars} stars
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-400">
                      {entry.total_score.toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {levelEntries.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  No scores yet. Be the first!
                </div>
              ) : (
                levelEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold w-8 ${
                          index === 0
                            ? 'text-yellow-500'
                            : index === 1
                            ? 'text-gray-400'
                            : index === 2
                            ? 'text-amber-700'
                            : 'text-slate-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white">{entry.nickname}</div>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            {entry.moves} moves
                          </span>
                          <span className="flex items-center gap-1">
                            <Timer className="w-3 h-3" />
                            {formatTime(entry.time_seconds)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            {entry.stars}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-400">
                      {entry.score.toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Card>

        <div className="text-center text-sm text-slate-500">
          Score = (Stars × 10,000) - (Moves × 10) - Time in seconds
        </div>
      </div>
    </div>
  );
}