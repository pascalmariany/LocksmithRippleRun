'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle, X } from 'lucide-react';

export function HowToPlay() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="text-base h-12 gap-2 border-slate-600 hover:bg-green-600 hover:border-green-500 hover:text-white hover:scale-105 transition-all duration-200"
        >
          <HelpCircle className="w-4 h-4" />
          How To Play
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🔓</span>
            How To Play
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Master the art of locksmithing with strategic key placement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-slate-200">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              🎯 Objective
            </h3>
            <p className="text-sm leading-relaxed">
              Unlock all cells on the board using the available keys. Each key creates a unique ripple effect that changes cell states. Complete levels under par to earn 3 stars!
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              🔑 Key Types
            </h3>
            <div className="space-y-3 bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">━</span>
                <div>
                  <p className="font-semibold text-white">Line Key</p>
                  <p className="text-sm text-slate-300">Affects cells in a straight line (horizontal or vertical) from the placement point</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">✚</span>
                <div>
                  <p className="font-semibold text-white">Cross Key</p>
                  <p className="text-sm text-slate-300">Affects cells in a cross pattern (all four directions) from the placement point</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">◉</span>
                <div>
                  <p className="font-semibold text-white">Wave Key</p>
                  <p className="text-sm text-slate-300">Creates a wave effect that radiates outward in expanding circles</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              🎮 How to Play
            </h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li className="leading-relaxed">
                <strong className="text-white">Select a Key:</strong> Click on one of the available key types in the key bar
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Place the Key:</strong> Click on any cell on the board to activate that key's effect
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Watch the Ripple:</strong> See how the key affects surrounding cells
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Plan Strategically:</strong> Use your limited keys wisely to unlock all cells
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Win:</strong> Unlock all cells to complete the level
              </li>
            </ol>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              🔐 Cell States
            </h3>
            <div className="grid grid-cols-1 gap-2 bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <div className="text-sm">
                  <span className="font-semibold text-white">Locked:</span> <span className="text-slate-300">Needs to be unlocked</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🔓</span>
                <div className="text-sm">
                  <span className="font-semibold text-white">Unlocked:</span> <span className="text-slate-300">Successfully opened - your goal!</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div className="text-sm">
                  <span className="font-semibold text-white">Jammed:</span> <span className="text-slate-300">Overlocked and needs fixing</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              ⭐ Scoring System
            </h3>
            <div className="space-y-2 text-sm">
              <p className="leading-relaxed">
                Each level has a <strong className="text-white">par score</strong> - the ideal number of moves to complete it:
              </p>
              <ul className="space-y-1 list-disc list-inside ml-2">
                <li><strong className="text-yellow-400">3 Stars:</strong> Complete at or under par</li>
                <li><strong className="text-yellow-400">2 Stars:</strong> Complete within 2 moves over par</li>
                <li><strong className="text-yellow-400">1 Star:</strong> Complete the level (any number of moves)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
              💡 Tips & Tricks
            </h3>
            <ul className="space-y-2 text-sm list-disc list-inside">
              <li className="leading-relaxed">
                <strong className="text-white">Plan ahead:</strong> Study the board before making your first move
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Use Undo:</strong> Press the undo button to try different strategies
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Reset freely:</strong> Don't be afraid to start over and try a new approach
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Watch patterns:</strong> Each key type has predictable effects - learn them!
              </li>
              <li className="leading-relaxed">
                <strong className="text-white">Avoid jamming:</strong> Be careful not to overlock cells - it wastes moves
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-center text-slate-200">
              <strong className="text-white">Ready to start?</strong> Begin with Level 1 to learn the basics, or jump to any unlocked level!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
