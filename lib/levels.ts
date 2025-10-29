import { Level, Board, CellState } from './game-engine';

function createBoard(pattern: string): Board {
  return pattern
    .trim()
    .split('\n')
    .map(row =>
      row.trim().split('').map(char => {
        switch (char) {
          case 'L': return 'locked' as CellState;
          case 'U': return 'unlocked' as CellState;
          case 'J': return 'jammed' as CellState;
          case 'R': return 'rotating' as CellState;
          default: return 'locked' as CellState;
        }
      })
    );
}

export const LEVELS: Level[] = [
  {
    id: '1',
    name: 'First Steps',
    width: 6,
    height: 6,
    par: 3,
    allowedKeys: ['cross'],
    description: 'Learn the Cross Key - Click each lock!',
    board: createBoard(`
      UUUUUU
      UULUUU
      UUUUUU
      UUUULU
      UUUUUU
      LUUUUU
    `)
  },
  {
    id: '2',
    name: 'The Line',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['line'],
    description: 'Master the Line Key',
    board: createBoard(`
      LLLLLL
      UUUUUU
      UUUUUU
      UUUUUU
      UUUUUU
      LLLLLL
    `)
  },
  {
    id: '3',
    name: 'Corner Pocket',
    width: 6,
    height: 6,
    par: 4,
    allowedKeys: ['cross', 'line'],
    description: 'Combine your skills',
    board: createBoard(`
      LLLUUU
      LLLUUU
      LLLUUU
      UUULLL
      UUULLL
      UUULLL
    `)
  },
  {
    id: '4',
    name: 'Checkerboard',
    width: 6,
    height: 6,
    par: 6,
    allowedKeys: ['cross'],
    description: 'Pattern recognition',
    board: createBoard(`
      LULULU
      ULULUL
      LULULU
      ULULUL
      LULULU
      ULULUL
    `)
  },
  {
    id: '5',
    name: 'Wave Intro',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['wave'],
    description: 'Feel the ripple',
    board: createBoard(`
      UUUUUU
      UUUUUU
      UULLUU
      UULLUU
      UUUUUU
      UUUUUU
    `)
  },
  {
    id: '6',
    name: 'Diamond',
    width: 6,
    height: 6,
    par: 5,
    allowedKeys: ['cross', 'wave'],
    description: 'Shine bright',
    board: createBoard(`
      UULLUU
      ULLLLLU
      LLLLLL
      LLLLLL
      ULLLLLU
      UULLUU
    `)
  },
  {
    id: '7',
    name: 'Stripes',
    width: 6,
    height: 6,
    par: 3,
    allowedKeys: ['line', 'wave'],
    description: 'Vertical challenge',
    board: createBoard(`
      LULULUL
      LULULUL
      LULULUL
      LULULUL
      LULULUL
      LULULUL
    `)
  },
  {
    id: '8',
    name: 'The Jam',
    width: 6,
    height: 6,
    par: 4,
    allowedKeys: ['cross', 'wave'],
    description: 'Jammed locks need waves',
    board: createBoard(`
      UUUUUU
      UUJJUU
      UUJJUU
      UUJJUU
      UUJJUU
      UUUUUU
    `)
  },
  {
    id: '9',
    name: 'Border Control',
    width: 6,
    height: 6,
    par: 6,
    allowedKeys: ['line', 'cross'],
    description: 'Edge thinking',
    board: createBoard(`
      LLLLLL
      LUUUUL
      LUUUUL
      LUUUUL
      LUUUUL
      LLLLLL
    `)
  },
  {
    id: '10',
    name: 'X Marks',
    width: 6,
    height: 6,
    par: 7,
    allowedKeys: ['cross', 'wave'],
    description: 'Cross patterns',
    board: createBoard(`
      LUUUUL
      ULLLLLU
      ULULLLU
      ULULLLU
      ULLLLLU
      LUUUUL
    `)
  },
  {
    id: '11',
    name: 'Spiral',
    width: 6,
    height: 6,
    par: 8,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'All keys unlocked',
    board: createBoard(`
      LLLLLL
      UUUUUL
      ULLLUUL
      ULLUUL
      ULUUUL
      ULLLLLL
    `)
  },
  {
    id: '12',
    name: 'Mixed Jam',
    width: 6,
    height: 6,
    par: 6,
    allowedKeys: ['cross', 'wave'],
    description: 'Strategic jamming',
    board: createBoard(`
      LJUUUL
      JUUUUJ
      UUUUUU
      UUUUUU
      JUUUUJ
      LJUUUL
    `)
  },
  {
    id: '13',
    name: 'The Grid',
    width: 6,
    height: 6,
    par: 9,
    allowedKeys: ['line', 'cross'],
    description: 'Line mastery',
    board: createBoard(`
      LULULUL
      ULULULU
      LULULUL
      ULULULU
      LULULUL
      ULULULU
    `)
  },
  {
    id: '14',
    name: 'Fortress',
    width: 6,
    height: 6,
    par: 10,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'Heavy defenses',
    board: createBoard(`
      LLLLLL
      LJJJJL
      LJLLJL
      LJLLJL
      LJJJJL
      LLLLLL
    `)
  },
  {
    id: '15',
    name: 'Master Key',
    width: 6,
    height: 6,
    par: 12,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'The final test',
    board: createBoard(`
      LJLLJL
      JLLJLJ
      LJJJJL
      LJJJJL
      JLLJLJ
      LJLLJL
    `)
  }
];