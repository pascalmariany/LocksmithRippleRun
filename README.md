# 🔓 Locksmith: Ripple Run

A puzzle game where you use keys to unlock cells. Each key creates a ripple effect that changes the board state. Complete levels by unlocking all cells with strategic key placement!

Created for Game Jam 2025 - Theme: Unlocked

## 🎮 Game Features

- **Strategic Puzzle Gameplay**: Use different key types (Line, Cross, Wave) to unlock cells
- **50 Unique Levels**: Progressive difficulty with par scores and star ratings
- **Global Leaderboard**: Compete with players worldwide
- **Star Rating System**: Earn up to 3 stars per level based on performance
- **Undo & Reset**: Practice and perfect your solutions
- **Sound Effects**: Immersive audio feedback (can be muted)
- **Responsive Design**: Play on desktop or mobile

## 🎯 How to Play

1. **Select a Key**: Choose from Line (━), Cross (✚), or Wave (◉) keys
2. **Place the Key**: Click on a cell to activate the key's ripple effect
3. **Unlock All Cells**: Use strategy to unlock every cell on the board
4. **Avoid Jamming**: Be careful not to jam cells by overlocking them
5. **Beat Par**: Complete levels under par moves to earn 3 stars

### Cell States
- 🔒 **Locked**: Needs to be unlocked
- 🔓 **Unlocked**: Successfully opened
- ⚠️ **Jammed**: Overlocked and needs fixing

## 🚀 Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Language**: TypeScript
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

Before installing, make sure you have:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** ([Download](https://git-scm.com/))
- **Supabase Account** (free tier available at [supabase.com](https://supabase.com))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/locksmith-ripple-run.git
cd locksmith-ripple-run
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization and set project details:
   - **Name**: locksmith-game (or your preferred name)
   - **Database Password**: Save this securely
   - **Region**: Choose closest to your users
4. Wait for the project to be provisioned (1-2 minutes)

#### Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under Project API)
   - **anon public** key (under Project API keys)

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
touch .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Set Up Database Tables

The project includes migration files in `supabase/migrations/`. Apply them to your Supabase database:

#### Option A: Using Supabase SQL Editor (Recommended for beginners)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of each migration file in order:
   - `20251016141128_create_locksmith_game_tables.sql`
   - `20251016143951_add_public_leaderboard.sql`
   - `20251016144022_add_global_leaderboard_function.sql`
5. Click **Run** for each migration

#### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 6. Verify Database Setup

Check that these tables were created:

1. Go to **Table Editor** in Supabase dashboard
2. Verify these tables exist:
   - `leaderboard`
   - `player_progress`

### 7. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the game!

## 📦 Build for Production

### Build the Application

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

### Type Checking

```bash
npm run typecheck
# or
yarn typecheck
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Choose your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out` or `.next`
6. Add environment variables in site settings
7. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## 🎯 Game Configuration

### Adding New Levels

Edit `lib/levels.ts` to add or modify levels:

```typescript
export const LEVELS: Level[] = [
  {
    id: 'level_1',
    name: 'First Steps',
    description: 'Learn the basics',
    size: 3,
    initialState: [
      ['locked', 'locked', 'locked'],
      ['locked', 'locked', 'locked'],
      ['locked', 'locked', 'locked']
    ],
    allowedKeys: ['line', 'cross'],
    par: 3
  },
  // Add more levels...
];
```

### Customizing Game Logic

- **Game Engine**: `lib/game-engine.ts`
- **Audio**: `lib/audio.ts`
- **Leaderboard**: `lib/leaderboard.ts`

## 📁 Project Structure

```
locksmith-ripple-run/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/              # React components
│   ├── game/               # Game-specific components
│   │   ├── Board.tsx       # Game board
│   │   ├── GameScreen.tsx  # Main game screen
│   │   ├── HUD.tsx         # Heads-up display
│   │   ├── KeyBar.tsx      # Key selection bar
│   │   ├── Particles.tsx   # Visual effects
│   │   └── VictoryModal.tsx # Win screen
│   ├── menu/               # Menu screens
│   │   ├── Leaderboard.tsx # Leaderboard view
│   │   ├── LevelSelect.tsx # Level selection
│   │   └── StartScreen.tsx # Main menu
│   └── ui/                 # UI components (shadcn)
├── lib/                     # Core logic
│   ├── audio.ts            # Sound effects
│   ├── game-engine.ts      # Game mechanics
│   ├── leaderboard.ts      # Score management
│   ├── levels.ts           # Level definitions
│   ├── supabase.ts         # Database client
│   └── utils.ts            # Utilities
├── supabase/               # Database
│   └── migrations/         # SQL migrations
├── public/                 # Static assets
├── .env.local             # Environment variables (create this)
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── tailwind.config.ts     # Tailwind configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Troubleshooting

### Common Issues

**Issue: "Cannot connect to Supabase"**
- Verify your `.env.local` file exists and has correct values
- Check that environment variables start with `NEXT_PUBLIC_`
- Restart the dev server after changing `.env.local`

**Issue: "Database tables not found"**
- Make sure you ran all migration files in order
- Check the Supabase Table Editor to verify tables exist
- Review the SQL Editor history for any errors

**Issue: "Build fails"**
- Run `npm run typecheck` to identify TypeScript errors
- Ensure all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next` then rebuild

**Issue: "Leaderboard not working"**
- Verify Row Level Security (RLS) policies are enabled
- Check browser console for API errors
- Test database connection in Supabase dashboard

### Getting Help

- Check the [Issues](https://github.com/yourusername/locksmith-ripple-run/issues) page
- Review [Next.js Documentation](https://nextjs.org/docs)
- Visit [Supabase Documentation](https://supabase.com/docs)

## 🎨 Customization

### Colors & Theming

Edit `app/globals.css` to change color schemes:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* Customize more colors... */
}
```

### Sounds

Replace audio files or modify audio logic in `lib/audio.ts`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Pascal Mariany**
- Website: [www.pascalmariany.eu](https://www.pascalmariany.eu)
- Game Jam: 2025

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

## 🎮 Play Online

[Live Demo](https://your-deployment-url.vercel.app)

---

**Enjoy the game! 🔓**

If you find this project useful, please consider giving it a ⭐ on GitHub!
