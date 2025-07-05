export interface IPet {
  id: number;
  lk_pet_code: string;
  name: string;
  breed: string;
  specie: string;
  sex_txt: string;
  is_available: boolean;
  is_sterilized_flg: boolean;
  health: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPetMeta {
  currentPage: number;
  lastPage: number;
  perPage: number;
  from: number;
  to: number;
  total: number;
}

export interface IPetResponse {
  data: IPet[];
  meta: IPetMeta;
}
