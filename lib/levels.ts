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
    par: 1,
    allowedKeys: ['cross'],
    description: 'Click the center',
    board: createBoard(`
      UUUUUU
      UULUUU
      ULLLUU
      UULUUU
      UUUUUU
      UUUUUU
    `)
  },
  {
    id: '2',
    name: 'Two Crosses',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['cross'],
    description: 'Find the two spots',
    board: createBoard(`
      UULUUU
      ULLLUU
      UULUUU
      UUULUU
      UULLLU
      UUULUU
    `)
  },
  {
    id: '3',
    name: 'Line Basics',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['line'],
    description: 'Master the Line Key',
    board: createBoard(`
      LLLLLU
      LUUUUL
      LUUUUL
      LUUUUL
      LUUUUL
      ULLLLL
    `)
  },
  {
    id: '4',
    name: 'Four Corners',
    width: 6,
    height: 6,
    par: 4,
    allowedKeys: ['cross'],
    description: 'Click each corner',
    board: createBoard(`
      LLUULL
      LUUUUL
      UUUUUU
      UUUUUU
      LUUUUL
      LLUULL
    `)
  },
  {
    id: '5',
    name: 'Wave Intro',
    width: 6,
    height: 6,
    par: 1,
    allowedKeys: ['wave'],
    description: 'Feel the ripple',
    board: createBoard(`
      UULUUU
      ULLLUU
      LLLLLU
      ULLLUU
      UULUUU
      UUUUUU
    `)
  },
  {
    id: '6',
    name: 'Mix It Up',
    width: 6,
    height: 6,
    par: 3,
    allowedKeys: ['cross', 'line'],
    description: 'Use both keys',
    board: createBoard(`
      LLLLLU
      LULUUL
      LLLLUL
      LULUUL
      LUUUUL
      ULLLLL
    `)
  },
  {
    id: '7',
    name: 'Wave Pattern',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['wave'],
    description: 'Overlapping waves',
    board: createBoard(`
      LLLUUU
      LLLLUU
      LLLULU
      ULULLL
      UULLLL
      UUULLL
    `)
  },
  {
    id: '8',
    name: 'The Jam',
    width: 6,
    height: 6,
    par: 1,
    allowedKeys: ['wave'],
    description: 'Waves unlock jams',
    board: createBoard(`
      UULUUU
      ULLLLU
      LLJJLL
      ULLLLU
      UULUUU
      UUUUUU
    `)
  },
  {
    id: '9',
    name: 'Complex Mix',
    width: 6,
    height: 6,
    par: 4,
    allowedKeys: ['cross', 'line'],
    description: 'Strategic thinking',
    board: createBoard(`
      LLLLLU
      LULUUL
      LLLUUL
      LUULLL
      LUULUL
      ULLLLL
    `)
  },
  {
    id: '10',
    name: 'Jam Complex',
    width: 6,
    height: 6,
    par: 2,
    allowedKeys: ['wave', 'cross'],
    description: 'Waves clear jams',
    board: createBoard(`
      UJJJUU
      JJJJJU
      JJJJJJ
      JJJJJJ
      JJJJJU
      UJJJUU
    `)
  },
  {
    id: '11',
    name: 'All Keys',
    width: 6,
    height: 6,
    par: 3,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'Use everything',
    board: createBoard(`
      LLLUUU
      LULLUU
      ULLLLU
      LLLLLU
      LULLUU
      LLLUUU
    `)
  },
  {
    id: '12',
    name: 'Pattern Master',
    width: 6,
    height: 6,
    par: 6,
    allowedKeys: ['cross', 'line'],
    description: 'Complex pattern',
    board: createBoard(`
      LULUUL
      LLUULL
      ULLLLU
      ULLLLU
      LLUULL
      LUULUL
    `)
  },
  {
    id: '13',
    name: 'Jam Master',
    width: 6,
    height: 6,
    par: 3,
    allowedKeys: ['wave', 'cross'],
    description: 'Strategic jamming',
    board: createBoard(`
      UJJJUU
      JJUJJU
      JULLUJ
      JULLUJ
      JJUJJU
      UJJJUU
    `)
  },
  {
    id: '14',
    name: 'Advanced Mix',
    width: 6,
    height: 6,
    par: 5,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'Think carefully',
    board: createBoard(`
      LLUULL
      LULUUL
      ULLLLU
      ULLLLU
      LULUUL
      LLUULL
    `)
  },
  {
    id: '15',
    name: 'Master Challenge',
    width: 6,
    height: 6,
    par: 7,
    allowedKeys: ['line', 'cross', 'wave'],
    description: 'The ultimate test',
    board: createBoard(`
      LJLLJL
      JLLLLJ
      LLULLL
      LLULLL
      JLLLLJ
      LJLLJL
    `)
  }
];
