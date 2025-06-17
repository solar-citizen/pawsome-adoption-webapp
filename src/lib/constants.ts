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
};

export const SearchParams = {
  herobanner: {
    pagination: {
      limit: 'limit',
      page: 'page',
    },
    fullTextSearch: 'full_text_search',
  },
};
