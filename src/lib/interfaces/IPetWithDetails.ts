import type { EnergyLevel, TrainingLevel } from './IDogDetails';
import type { IPet, IPetMeta } from './IPet';

export type IPetWithDetails = IPet & {
  // Cat Details
  cat_is_litter_trained: boolean | null;
  cat_is_indoor_only: boolean | null;
  cat_is_declawed: boolean | null;
  cat_personality_type: string | null;
  cat_good_with_children: boolean | null;
  cat_good_with_other_cats: boolean | null;
  cat_good_with_dogs: boolean | null;
  cat_needs_special_diet: boolean | null;

  // Dog Details
  dog_is_house_trained: boolean | null;
  dog_training_level: TrainingLevel | null;
  dog_good_with_children: boolean | null;
  dog_good_with_other_dogs: boolean | null;
  dog_good_with_cats: boolean | null;
  dog_energy_level: EnergyLevel | null;
  dog_exercise_needs: number | null;

  // Horse Details
  horse_is_saddle_trained: boolean | null;
  horse_is_ground_trained: boolean | null;
  horse_riding_level: string | null;
  horse_height_hands: number | null;
  horse_weight_lbs: number | null;
  horse_discipline: string | null;
  horse_temperament: string | null;
  horse_suitable_for_beginners: boolean | null;

  // Farm Animal Details
  farm_is_fence_trained: boolean | null;
  farm_primary_purpose: string | null;
  farm_requires_special_housing: boolean | null;
  farm_housing_requirements: string | null;
  farm_good_with_herd: boolean | null;
  farm_needs_companion: boolean | null;
  farm_special_care_needs: string | null;
  farm_pasture_size_needed: number | null;
};

export type IPetWithDetailsResponse = {
  data: IPetWithDetails[];
  meta: IPetMeta;
};
