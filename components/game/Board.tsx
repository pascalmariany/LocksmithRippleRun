'use client';

import { useEffect, useRef } from 'react';
import { Board as BoardType, CellState } from '@/lib/game-engine';

interface BoardProps {
  board: BoardType;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  animatingCells?: Set<string>;
}

const CELL_SIZE = 60;
const CELL_GAP = 8;
const CELL_RADIUS = 8;

const COLORS = {
  locked: '#ef4444',
  unlocked: '#10b981',
  jammed: '#f59e0b',
  rotating: '#8b5cf6',
  background: '#1e293b',
  grid: '#334155',
  selected: '#60a5fa',
  hover: '#475569'
};

export function Board({ board, selectedCell, onCellClick, animatingCells = new Set() }: BoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverCell = useRef<{ row: number; col: number } | null>(null);

  const height = board.length;
  const width = board[0]?.length || 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const totalWidth = width * CELL_SIZE + (width - 1) * CELL_GAP;
    const totalHeight = height * CELL_SIZE + (height - 1) * CELL_GAP;

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const x = col * (CELL_SIZE + CELL_GAP);
        const y = row * (CELL_SIZE + CELL_GAP);
        const state = board[row][col];
        const cellKey = `${row}-${col}`;

        const isSelected = selectedCell?.row === row && selectedCell?.col === col;
        const isHovered = hoverCell.current?.row === row && hoverCell.current?.col === col;
        const isAnimating = animatingCells.has(cellKey);

        ctx.beginPath();
        ctx.roundRect(x, y, CELL_SIZE, CELL_SIZE, CELL_RADIUS);

        if (isSelected) {
          ctx.fillStyle = COLORS.selected;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (isHovered && !isAnimating) {
          ctx.fillStyle = COLORS.hover;
          ctx.fill();
          ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = COLORS[state];
          ctx.fill();
        }

        if (isAnimating) {
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowColor = COLORS[state];
          ctx.shadowBlur = 12;
        }

        ctx.shadowBlur = 0;

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const icon = getStateIcon(state);
        ctx.fillText(icon, x + CELL_SIZE / 2, y + CELL_SIZE / 2);
      }
    }
  }, [board, selectedCell, width, height, animatingCells]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));

    if (row >= 0 && row < height && col >= 0 && col < width) {
      const cellX = col * (CELL_SIZE + CELL_GAP);
      const cellY = row * (CELL_SIZE + CELL_GAP);

      if (x >= cellX && x <= cellX + CELL_SIZE && y >= cellY && y <= cellY + CELL_SIZE) {
        onCellClick(row, col);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / (CELL_SIZE + CELL_GAP));
    const row = Math.floor(y / (CELL_SIZE + CELL_GAP));

    if (row >= 0 && row < height && col >= 0 && col < width) {
      const cellX = col * (CELL_SIZE + CELL_GAP);
      const cellY = row * (CELL_SIZE + CELL_GAP);

      if (x >= cellX && x <= cellX + CELL_SIZE && y >= cellY && y <= cellY + CELL_SIZE) {
        if (hoverCell.current?.row !== row || hoverCell.current?.col !== col) {
          hoverCell.current = { row, col };
          canvasRef.current?.dispatchEvent(new Event('render'));
        }
      } else {
        hoverCell.current = null;
      }
    } else {
      hoverCell.current = null;
    }
  };

  const handleMouseLeave = () => {
    hoverCell.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer transition-transform duration-150 hover:scale-[1.02]"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}

function getStateIcon(state: CellState): string {
  switch (state) {
    case 'locked':
      return '🔒';
    case 'unlocked':
      return '🔓';
    case 'jammed':
      return '⚠️';
    case 'rotating':
      return '🔄';
    default:
      return '?';
  }
}