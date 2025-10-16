import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface PlayerScore {
  level_id: string;
  moves: number;
  time_seconds: number;
  stars: number;
}

export interface PlayerProgress {
  highest_level_unlocked: number;
  total_stars: number;
}

export async function saveScore(playerId: string, score: PlayerScore) {
  const { error } = await supabase
    .from('level_scores')
    .upsert({
      player_id: playerId,
      ...score,
      completed_at: new Date().toISOString()
    });

  if (error) console.error('Error saving score:', error);
}

export async function getPlayerScores(playerId: string) {
  const { data, error } = await supabase
    .from('level_scores')
    .select('*')
    .eq('player_id', playerId);

  if (error) {
    console.error('Error fetching scores:', error);
    return [];
  }

  return data || [];
}

export async function updateProgress(playerId: string, progress: PlayerProgress) {
  const { error } = await supabase
    .from('player_progress')
    .upsert({
      player_id: playerId,
      ...progress,
      updated_at: new Date().toISOString()
    });

  if (error) console.error('Error updating progress:', error);
}

export async function getProgress(playerId: string) {
  const { data, error } = await supabase
    .from('player_progress')
    .select('*')
    .eq('player_id', playerId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching progress:', error);
    return null;
  }

  return data;
}