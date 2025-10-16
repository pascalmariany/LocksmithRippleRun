import { supabase } from './supabase';

export interface LeaderboardEntry {
  id: string;
  nickname: string;
  level_id: string;
  moves: number;
  time_seconds: number;
  stars: number;
  score: number;
  created_at: string;
}

export function calculateScore(stars: number, moves: number, timeSeconds: number): number {
  return (stars * 10000) - (moves * 10) - timeSeconds;
}

export async function submitScore(
  nickname: string,
  levelId: string,
  moves: number,
  timeSeconds: number,
  stars: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const score = calculateScore(stars, moves, timeSeconds);

    const { error } = await supabase
      .from('leaderboard_entries')
      .insert({
        nickname: nickname.trim(),
        level_id: levelId,
        moves,
        time_seconds: timeSeconds,
        stars,
        score
      });

    if (error) {
      console.error('Error submitting score:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, error: 'Failed to submit score' };
  }
}

export async function getLeaderboard(
  levelId: string,
  limit = 10
): Promise<LeaderboardEntry[]> {
  try {
    const { data, error } = await supabase
      .from('leaderboard_entries')
      .select('*')
      .eq('level_id', levelId)
      .order('score', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

export async function getGlobalLeaderboard(limit = 100): Promise<{
  nickname: string;
  total_score: number;
  levels_completed: number;
  total_stars: number;
}[]> {
  try {
    const { data, error } = await supabase.rpc('get_global_leaderboard', {
      entry_limit: limit
    });

    if (error) {
      console.error('Error fetching global leaderboard:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error:', err);
    return [];
  }
}

export function validateNickname(nickname: string): { valid: boolean; error?: string } {
  const trimmed = nickname.trim();

  if (trimmed.length < 3) {
    return { valid: false, error: 'Nickname must be at least 3 characters' };
  }

  if (trimmed.length > 20) {
    return { valid: false, error: 'Nickname must be 20 characters or less' };
  }

  if (!/^[a-zA-Z0-9 _-]+$/.test(trimmed)) {
    return { valid: false, error: 'Only letters, numbers, spaces, dashes, and underscores allowed' };
  }

  return { valid: true };
}