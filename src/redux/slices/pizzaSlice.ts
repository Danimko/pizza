import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaModel } from "./cartSlice";
import { fetchPizzas } from "../store/Pizza`s/action";
import { transformPizzaItem } from "../store/Pizza`s/transform";

export interface FetchModel {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

export interface PizzaState {
  items: PizzaModel[];
  pizzaItem: PizzaModel | null;
  status: string;
}

const initialState: PizzaState = {
  items: [],
  pizzaItem: null,
  status: "",
};

export const { actions, reducer } = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    fillPizzaItem: {
      reducer: (
        state: PizzaState,
        action: PayloadAction<PizzaModel | null>
      ) => {
        state.pizzaItem = action.payload;
      },
      prepare: (pizzaItem: PizzaModel | null) => {
        return {
          payload: transformPizzaItem(pizzaItem),
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state: PizzaState) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state: PizzaState, action: PayloadAction<any>) => {
          state.items = action.payload;
          state.status = "success";
        }
      )
      .addCase(fetchPizzas.rejected, (state: PizzaState) => {
        state.status = "error";
        state.items = [];
      });
  },
});
export const { setItems } = actions;

export default reducer;
