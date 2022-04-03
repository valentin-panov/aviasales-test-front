import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InFilter, InFilters, InSort } from '../interfaces/Interfaces'

const initialState: InFilters = {
  filter: {
    s0: false,
    s1: false,
    s2: false,
    s3: false
  },
  sort: 'price',
  limit: 5
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    resetFilters: () => initialState,
    setFiltersFilter: (state, action: PayloadAction<InFilter>) => ({
      ...state,
      filter: action.payload
    }),
    setFiltersSort: (state, action: PayloadAction<InSort>) => ({
      ...state,
      sort: action.payload
    })
  }
})

export const { resetFilters, setFiltersFilter, setFiltersSort } =
  filtersSlice.actions

export const filters = filtersSlice.reducer
