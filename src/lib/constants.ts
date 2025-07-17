export const baseURL = import.meta.env.VITE_API_BASE_URL;

export const staticTxt = {
  siteTitle: 'Pawsome Adoption',
  ellipsis: '...',
};

export const routes = {
  home: { path: 'home', label: 'Home' },
  adoptions: { path: 'adoptions', label: 'Adoptions' },
  about: { path: 'about', label: 'About' },
  contact: { path: 'contact', label: 'Contact' },

  dynamic: {
    petDetails: { route: 'pets/:lk_pet_code' },
  },
};

// toDo: rename, because it confuses
export const SearchParams = {
  herobanner: {
    pagination: {
      limit: 'limit',
      page: 'page',
    },
    fullTextSearch: 'full_text_search',
    representation: {
      detailed: 'detailed',
    },
  },
};

export const unionValues = {
  SPECIES: ['cat', 'dog', 'horse', 'farm-animal', 'other'] as const,
  TRAINING_LEVELS: ['basic', 'intermediate', 'advanced'] as const,
  ENERGY_LEVELS: ['low', 'moderate', 'high', 'very_high'] as const,
};
