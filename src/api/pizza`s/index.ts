import { PizzaModel } from "../../redux/slices/cartSlice";
import axios from "axios";
import { FetchModel } from "../../redux/slices/pizzaSlice";

export const fetchAllPizza = async (params: any): Promise<any> => {
  const { data } = await axios.get<FetchModel>(
    `https://651b3616194f77f2a5ae5679.mockapi.io/pizzas?page=${params.currentPage}&limit=4&${params.category}&sortBy=${params.sortBy}&order=${params.order}${params.search}`
  );
  return data;
};

export const fetchPizzaItem = async (id: number): Promise<any> => {
  const { data } = await axios.get(
    `https://651b3616194f77f2a5ae5679.mockapi.io/pizzas/${id}`
  );
  return data;
};
