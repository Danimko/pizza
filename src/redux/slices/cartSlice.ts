import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PizzaModel {
  title: string;
  price: string | number;
  imageUrl?: string;
  types?: any;
  sizes?: any;
  category?: number;
  rating?: number;
}

export interface CategoryState {
  totalPrice: number;
  items: PizzaModel[];
}

const initialState: CategoryState = {
  totalPrice: 0,
  items: [],
};

export const filterSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct(state, action: PayloadAction<PizzaModel>) {
      state.items.push(action.payload);
    },
  },
});
export const { addProduct } = filterSlice.actions;

export default filterSlice.reducer;
