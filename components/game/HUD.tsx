'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Undo, Star, Volume2, VolumeX } from 'lucide-react';
import { toggleMute, getMuted } from '@/lib/audio';

interface HUDProps {
  moves: number;
  par: number;
  stars: number;
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
}

export function HUD({ moves, par, stars, canUndo, onUndo, onReset }: HUDProps) {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(getMuted());
  }, []);

  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">{moves}</div>
          <div className="text-sm text-muted-foreground">Moves</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-yellow-500">{par}</div>
          <div className="text-sm text-muted-foreground">Par</div>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 ${
                star <= stars ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleToggleMute}
          variant="outline"
          size="icon"
          title={isMuted ? "Unmute (M)" : "Mute (M)"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          variant="outline"
          size="icon"
          title="Undo (U)"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          size="icon"
          title="Reset (R)"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}