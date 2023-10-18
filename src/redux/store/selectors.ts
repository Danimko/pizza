import { RootState } from "./index";

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const selectPizzaData = (state: RootState) => state.pizza;
export const selectFilter = (state: RootState) => state.filter;
