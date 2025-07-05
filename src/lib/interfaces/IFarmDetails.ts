export interface IFarmAnimalDetails {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_fence_trained: boolean;
  primary_purpose: string | null;
  requires_special_housing: boolean;
  housing_requirements: string | null;
  good_with_herd: boolean;
  needs_companion: boolean;
  special_care_needs: string | null;
  pasture_size_needed: string | null;
  created_at: Date;
  updated_at: Date;
}
