/*
  # Locksmith: Ripple Run - Game Database Schema

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `created_at` (timestamptz)
    - `level_scores`
      - `id` (uuid, primary key)
      - `player_id` (uuid, references players)
      - `level_id` (text)
      - `moves` (integer)
      - `time_seconds` (integer)
      - `stars` (integer, 1-3)
      - `completed_at` (timestamptz)
    - `player_progress`
      - `player_id` (uuid, primary key)
      - `highest_level_unlocked` (integer)
      - `total_stars` (integer)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Players can read/write their own data
    - Anonymous play supported with local storage fallback
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS level_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  level_id text NOT NULL,
  moves integer NOT NULL,
  time_seconds integer NOT NULL,
  stars integer NOT NULL CHECK (stars >= 1 AND stars <= 3),
  completed_at timestamptz DEFAULT now(),
  UNIQUE(player_id, level_id)
);

CREATE TABLE IF NOT EXISTS player_progress (
  player_id uuid PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  highest_level_unlocked integer DEFAULT 1,
  total_stars integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players can read own data"
  ON players FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Players can insert own data"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Players can read own scores"
  ON level_scores FOR SELECT
  TO authenticated
  USING (player_id = auth.uid());

CREATE POLICY "Players can insert own scores"
  ON level_scores FOR INSERT
  TO authenticated
  WITH CHECK (player_id = auth.uid());

CREATE POLICY "Players can update own scores"
  ON level_scores FOR UPDATE
  TO authenticated
  USING (player_id = auth.uid())
  WITH CHECK (player_id = auth.uid());

CREATE POLICY "Players can read own progress"
  ON player_progress FOR SELECT
  TO authenticated
  USING (player_id = auth.uid());

CREATE POLICY "Players can insert own progress"
  ON player_progress FOR INSERT
  TO authenticated
  WITH CHECK (player_id = auth.uid());

CREATE POLICY "Players can update own progress"
  ON player_progress FOR UPDATE
  TO authenticated
  USING (player_id = auth.uid())
  WITH CHECK (player_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_level_scores_player ON level_scores(player_id);
CREATE INDEX IF NOT EXISTS idx_level_scores_level ON level_scores(level_id);