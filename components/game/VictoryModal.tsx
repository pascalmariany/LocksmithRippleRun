'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, Trophy, ArrowRight, Upload, Check } from 'lucide-react';
import { submitScore, validateNickname, calculateScore } from '@/lib/leaderboard';

interface VictoryModalProps {
  open: boolean;
  levelId: string;
  stars: number;
  moves: number;
  par: number;
  timeSeconds: number;
  onNext: () => void;
  onReplay: () => void;
  isLastLevel?: boolean;
}

export function VictoryModal({
  open,
  levelId,
  stars,
  moves,
  par,
  timeSeconds,
  onNext,
  onReplay,
  isLastLevel = false
}: VictoryModalProps) {
  const [nickname, setNickname] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const score = calculateScore(stars, moves, timeSeconds);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setError('');
      const savedNickname = localStorage.getItem('locksmith-nickname');
      if (savedNickname) {
        setNickname(savedNickname);
      }
    }
  }, [open]);

  const handleSubmitScore = async () => {
    setError('');

    const validation = validateNickname(nickname);
    if (!validation.valid) {
      setError(validation.error || 'Invalid nickname');
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitScore(nickname, levelId, moves, timeSeconds, stars);

      if (result.success) {
        setSubmitted(true);
        localStorage.setItem('locksmith-nickname', nickname);
      } else {
        setError(result.error || 'Failed to submit score');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md animate-in zoom-in-95 fade-in duration-300">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top-2 duration-500">
            <Trophy className="w-8 h-8 text-yellow-500 animate-in zoom-in duration-500 delay-100" />
            {isLastLevel ? 'Master Key Unlocked!' : 'Level Complete!'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          <div className="flex gap-2">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-12 h-12 transition-all ${
                  star <= stars
                    ? 'fill-yellow-500 text-yellow-500 animate-in zoom-in duration-300'
                    : 'text-gray-400'
                }`}
                style={{ animationDelay: `${star * 100}ms` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full text-center animate-in fade-in duration-500 delay-300">
            <div className="p-4 bg-secondary rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-3xl font-bold">{moves}</div>
              <div className="text-sm text-muted-foreground">Moves</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-3xl font-bold text-yellow-500">{par}</div>
              <div className="text-sm text-muted-foreground">Par</div>
            </div>
            <div className="col-span-2 p-4 bg-secondary rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-3xl font-bold">{timeSeconds}s</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="w-full p-4 bg-blue-950/50 border border-blue-800 rounded-lg animate-in fade-in zoom-in-95 duration-500 delay-400 transition-all hover:scale-105 hover:shadow-blue-500/30 hover:shadow-lg">
            <div className="text-center text-sm text-slate-300 mb-1">Your Score</div>
            <div className="text-center text-3xl font-bold text-blue-400">
              {score.toLocaleString()}
            </div>
          </div>

          {stars === 3 && (
            <div className="text-center text-green-500 font-semibold animate-in fade-in">
              Perfect! Under par!
            </div>
          )}

          {!submitted ? (
            <div className="w-full space-y-3 animate-in fade-in duration-500 delay-500">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">
                  Submit to Leaderboard
                </label>
                <Input
                  type="text"
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={20}
                  disabled={submitting}
                  className="transition-all duration-200 focus:scale-105"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !submitting) {
                      handleSubmitScore();
                    }
                  }}
                />
                {error && (
                  <p className="text-sm text-red-400 animate-in slide-in-from-top-2 duration-300">{error}</p>
                )}
              </div>
              <Button
                onClick={handleSubmitScore}
                disabled={submitting || !nickname.trim()}
                className="w-full gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                variant="secondary"
              >
                <Upload className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Score'}
              </Button>
            </div>
          ) : (
            <div className="w-full p-4 bg-green-950/50 border border-green-800 rounded-lg animate-in zoom-in-95 fade-in duration-500">
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Check className="w-5 h-5 animate-in zoom-in duration-300" />
                <span className="font-semibold">Score submitted!</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 animate-in fade-in duration-500 delay-600">
          <Button onClick={onReplay} variant="outline" className="flex-1 transition-all duration-200 hover:scale-105">
            Replay
          </Button>
          {!isLastLevel && (
            <Button onClick={onNext} className="flex-1 gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Next Level
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          {isLastLevel && (
            <Button onClick={onNext} className="flex-1 gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Level Select
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}