export type CellState = 'locked' | 'unlocked' | 'jammed' | 'rotating';
export type KeyId = 'line' | 'cross' | 'wave';
export type Board = CellState[][];

export interface Level {
  id: string;
  name: string;
  width: number;
  height: number;
  board: Board;
  allowedKeys: KeyId[];
  par: number;
  description?: string;
}

export interface GameState {
  board: Board;
  moves: number;
  startTime: number;
  history: Board[];
}

export interface KeyType {
  id: KeyId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const KEY_TYPES: Record<KeyId, KeyType> = {
  line: {
    id: 'line',
    name: 'Line Key',
    description: 'Toggles entire row or column',
    icon: '━',
    color: '#3b82f6'
  },
  cross: {
    id: 'cross',
    name: 'Cross Key',
    description: 'Toggles plus pattern',
    icon: '✚',
    color: '#8b5cf6'
  },
  wave: {
    id: 'wave',
    name: 'Wave Key',
    description: 'Ripple effect in circle',
    icon: '◉',
    color: '#ec4899'
  }
};

export function createEmptyBoard(width: number, height: number): Board {
  return Array(height).fill(null).map(() =>
    Array(width).fill('locked' as CellState)
  );
}

export function cloneBoard(board: Board): Board {
  return board.map(row => [...row]);
}

export function toggleCell(state: CellState): CellState {
  switch (state) {
    case 'locked':
      return 'unlocked';
    case 'unlocked':
      return 'locked';
    case 'jammed':
      return 'jammed';
    case 'rotating':
      return 'locked';
    default:
      return state;
  }
}

export function applyLineKey(board: Board, row: number, col: number): Board {
  const newBoard = cloneBoard(board);
  const height = board.length;
  const width = board[0].length;

  for (let r = 0; r < height; r++) {
    newBoard[r][col] = toggleCell(newBoard[r][col]);
  }

  for (let c = 0; c < width; c++) {
    if (c !== col) {
      newBoard[row][c] = toggleCell(newBoard[row][c]);
    }
  }

  return newBoard;
}

export function applyCrossKey(board: Board, row: number, col: number): Board {
  const newBoard = cloneBoard(board);
  const height = board.length;
  const width = board[0].length;

  newBoard[row][col] = toggleCell(newBoard[row][col]);

  if (row > 0) newBoard[row - 1][col] = toggleCell(newBoard[row - 1][col]);
  if (row < height - 1) newBoard[row + 1][col] = toggleCell(newBoard[row + 1][col]);
  if (col > 0) newBoard[row][col - 1] = toggleCell(newBoard[row][col - 1]);
  if (col < width - 1) newBoard[row][col + 1] = toggleCell(newBoard[row][col + 1]);

  return newBoard;
}

export function applyWaveKey(board: Board, row: number, col: number): Board {
  const newBoard = cloneBoard(board);
  const height = board.length;
  const width = board[0].length;
  const radius = 2;

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      const dist = Math.abs(r - row) + Math.abs(c - col);
      if (dist <= radius) {
        if (newBoard[r][c] === 'jammed') {
          newBoard[r][c] = 'unlocked';
        } else {
          newBoard[r][c] = toggleCell(newBoard[r][c]);
        }
      }
    }
  }

  return newBoard;
}

export function applyKey(board: Board, keyId: KeyId, row: number, col: number): Board {
  switch (keyId) {
    case 'line':
      return applyLineKey(board, row, col);
    case 'cross':
      return applyCrossKey(board, row, col);
    case 'wave':
      return applyWaveKey(board, row, col);
    default:
      return board;
  }
}

export function isSolved(board: Board): boolean {
  return board.every(row =>
    row.every(cell => cell === 'unlocked')
  );
}

export function calculateStars(moves: number, par: number): number {
  if (moves <= par) return 3;
  if (moves <= par + 2) return 2;
  return 1;
}

export function initGameState(level: Level): GameState {
  return {
    board: cloneBoard(level.board),
    moves: 0,
    startTime: Date.now(),
    history: []
  };
}

export function makeMove(state: GameState, keyId: KeyId, row: number, col: number): GameState {
  const newBoard = applyKey(state.board, keyId, row, col);
  return {
    ...state,
    board: newBoard,
    moves: state.moves + 1,
    history: [...state.history, state.board]
  };
}

export function undoMove(state: GameState): GameState {
  if (state.history.length === 0) return state;

  const newHistory = [...state.history];
  const previousBoard = newHistory.pop()!;

  return {
    ...state,
    board: previousBoard,
    moves: Math.max(0, state.moves - 1),
    history: newHistory
  };
}

export function resetGame(level: Level): GameState {
  return initGameState(level);
}

export function getAffectedCells(keyId: KeyId, row: number, col: number, board: Board): Set<string> {
  const affected = new Set<string>();
  const height = board.length;
  const width = board[0].length;

  switch (keyId) {
    case 'cross':
      affected.add(`${row}-${col}`);
      if (row > 0) affected.add(`${row - 1}-${col}`);
      if (row < height - 1) affected.add(`${row + 1}-${col}`);
      if (col > 0) affected.add(`${row}-${col - 1}`);
      if (col < width - 1) affected.add(`${row}-${col + 1}`);
      break;
    case 'line':
      for (let r = 0; r < height; r++) {
        affected.add(`${r}-${col}`);
      }
      for (let c = 0; c < width; c++) {
        affected.add(`${row}-${c}`);
      }
      break;
    case 'wave':
      const radius = 2;
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          const dist = Math.abs(r - row) + Math.abs(c - col);
          if (dist <= radius) {
            affected.add(`${r}-${c}`);
          }
        }
      }
      break;
  }

  return affected;
}