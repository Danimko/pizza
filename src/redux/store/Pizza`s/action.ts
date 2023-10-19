import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { actions, FetchModel } from "../../slices/pizzaSlice";
import { fetchPizzaItem } from "../../../api/pizza`s";

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

export const fetchPizzaById = createAsyncThunk(
  "pizza/fetchPizzaById",
  async (id: number, thunkApi) => {
    try {
      const pizza = await fetchPizzaItem(id);
      thunkApi.dispatch(actions.fillPizzaItem(pizza));
      return pizza;
    } catch (error) {
      alert(error);
    }
  }
);
