import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaModel } from "./cartSlice";
import axios from "axios";

export interface FetchModel {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: FetchModel) => {
    const { currentPage, category, sortBy, order, search } = params;
    const { data } = await axios.get<FetchModel>(
      `https://651b3616194f77f2a5ae5679.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

export interface PizzaState {
  items: PizzaModel[];
  status: string;
}

const initialState: PizzaState = {
  items: [],
  status: "",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
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
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
