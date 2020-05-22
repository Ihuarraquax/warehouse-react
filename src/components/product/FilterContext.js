import React from 'react'

export const FilterContext = React.createContext({
  categories: [],
  priceMin: 0,
  priceMax: null,
  update: (categories, priceMin, priceMax) => { }
});
