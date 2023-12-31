import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SortModel {
  sortProperty: string;
  name: string;
}

export interface CategoryState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortModel;
}

const initialState: CategoryState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    sortProperty: "rating",
    name: "популярности",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortModel>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<any>) {
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.categoryId = action.payload.categoryId;
    },
  },
});
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
