export interface IHorseDetails {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_saddle_trained: boolean;
  is_ground_trained: boolean;
  riding_level: string | null;
  height_hands: number | null;
  weight_lbs: number | null;
  discipline: string | null;
  temperament: string | null;
  suitable_for_beginners: boolean;
  created_at: Date;
  updated_at: Date;
}
