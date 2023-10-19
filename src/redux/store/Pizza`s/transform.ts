import { PizzaModel } from "../../slices/cartSlice";

export const transformPizzas = (pizzas: PizzaModel[]): PizzaModel[] => {
  if (!Array.isArray(pizzas)) {
    return [];
  }
  return pizzas.map((item) => {
    return {
      key: item.id,
      ...item,
    };
  });
};

export const transformPizzaItem = (pizzaItem: any): any => {
  if (!pizzaItem) return null;
  return {
    key: pizzaItem.id,
    ...pizzaItem,
  };
};
