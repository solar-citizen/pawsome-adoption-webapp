export interface IPet {
  id: number
  lk_pet_code: string
  name: string
  breed: string
  specie: string
  is_available: boolean
  is_house_trained: boolean
  health?: string
  created_at: Date
  updated_at: Date
}

export interface IPetMeta {
  currentPage: number
  lastPage: number
  perPage: number
  petsFrom: number
  petsTo: number
  petsTotal: number
}

export interface IPetResponse {
  data: IPet[]
  meta: IPetMeta
}
