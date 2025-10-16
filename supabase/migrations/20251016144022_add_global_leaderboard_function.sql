/*
  # Global Leaderboard Aggregation Function

  1. Purpose
    - Aggregate player scores across all levels
    - Calculate total score, levels completed, and total stars
    - Return top players globally

  2. Function
    - `get_global_leaderboard(entry_limit integer)`
    - Returns aggregated player statistics
    - Ordered by total score (descending)

  3. Security
    - Function is SECURITY DEFINER but safe (read-only)
    - No user input directly in queries
    - Parameterized limit
*/

CREATE OR REPLACE FUNCTION get_global_leaderboard(entry_limit integer DEFAULT 100)
RETURNS TABLE (
  nickname text,
  total_score bigint,
  levels_completed bigint,
  total_stars bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    nickname,
    SUM(score) as total_score,
    COUNT(DISTINCT level_id) as levels_completed,
    SUM(stars) as total_stars
  FROM leaderboard_entries
  GROUP BY nickname
  ORDER BY total_score DESC
  LIMIT entry_limit;
$$;