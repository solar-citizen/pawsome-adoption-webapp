export const staticTxt = {
  siteTitle: 'Pawsome Adoption',
  ellipsis: '...',
  baseURL: import.meta.env.VITE_API_BASE_URL,
};

export const routes = {
  home: { path: 'home', label: 'Home' },
  adoptions: { path: 'adoptions', label: 'Adoptions' },
  about: { path: 'about', label: 'About' },
  contact: { path: 'contact', label: 'Contact' },
};

export const SearchParams = {
  pagination: {
    heroBanner: {
      limit: 'limit',
      page: 'page',
    },
  },
  search: {
    fullTextSearch: 'fullTextSearch',
  },
};
