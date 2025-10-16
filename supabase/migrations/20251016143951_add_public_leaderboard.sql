/*
  # Public Leaderboard System

  1. New Tables
    - `leaderboard_entries`
      - `id` (uuid, primary key)
      - `nickname` (text, 3-20 characters)
      - `level_id` (text, which level was completed)
      - `moves` (integer, number of moves taken)
      - `time_seconds` (integer, time taken)
      - `stars` (integer, 1-3 stars)
      - `score` (integer, calculated score for ranking)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `leaderboard_entries` table
    - Allow anyone to read leaderboard entries (public)
    - Allow anyone to insert their own scores (public)
    - No updates or deletes allowed (prevent cheating)
    - Add nickname validation (3-20 chars, alphanumeric + spaces/dashes)
    - Add score calculation logic

  3. Indexes
    - Index on level_id and score for fast leaderboard queries
    - Index on created_at for recent entries

  4. Notes
    - Scores are calculated as: (stars * 10000) - (moves * 10) - time_seconds
    - Higher score is better
    - No authentication required (anonymous leaderboard)
    - Nickname profanity filtering can be added later
*/

CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL,
  level_id text NOT NULL,
  moves integer NOT NULL CHECK (moves > 0),
  time_seconds integer NOT NULL CHECK (time_seconds > 0),
  stars integer NOT NULL CHECK (stars >= 1 AND stars <= 3),
  score integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT nickname_length CHECK (char_length(nickname) >= 3 AND char_length(nickname) <= 20),
  CONSTRAINT nickname_format CHECK (nickname ~ '^[a-zA-Z0-9 _-]+$')
);

ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON leaderboard_entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON leaderboard_entries
  FOR INSERT
  TO public
  WITH CHECK (
    char_length(nickname) >= 3 
    AND char_length(nickname) <= 20 
    AND nickname ~ '^[a-zA-Z0-9 _-]+$'
    AND moves > 0 
    AND time_seconds > 0 
    AND stars >= 1 
    AND stars <= 3
  );

CREATE INDEX IF NOT EXISTS idx_leaderboard_level_score 
  ON leaderboard_entries(level_id, score DESC);

CREATE INDEX IF NOT EXISTS idx_leaderboard_created 
  ON leaderboard_entries(created_at DESC);

CREATE OR REPLACE FUNCTION calculate_score(p_stars integer, p_moves integer, p_time_seconds integer)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN (p_stars * 10000) - (p_moves * 10) - p_time_seconds;
END;
$$;