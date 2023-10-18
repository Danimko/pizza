import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PizzaModel {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types?: any;
  sizes?: any;
  category?: number;
  rating?: number;
  count: number;
}

export interface CartState {
  totalPrice: number;
  items: PizzaModel[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<PizzaModel>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action: PayloadAction<PizzaModel>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
