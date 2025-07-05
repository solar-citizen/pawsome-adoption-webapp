export type TrainingLevel = 'basic' | 'intermediate' | 'advanced';
export type EnergyLevel = 'low' | 'moderate' | 'high' | 'very_high';

export interface IDogDetails {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_house_trained: boolean;
  training_level: TrainingLevel | null;
  good_with_children: boolean;
  good_with_other_dogs: boolean;
  good_with_cats: boolean;
  energy_level: EnergyLevel | null;
  exercise_needs_minutes: number | null;
  created_at: Date;
  updated_at: Date;
}
