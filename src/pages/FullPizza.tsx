import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchPizzaById } from "../redux/store/Pizza`s/action";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";

export const FullPizza = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const pizzaItem = useSelector((state: RootState) => state.pizza.pizzaItem);

  useEffect(() => {
    dispatch(fetchPizzaById(Number(id)));
  }, []);
  return pizzaItem ? (
    <div className={"container"}>
      <img src={pizzaItem.imageUrl} alt="" />
      <h2>{pizzaItem.title}</h2>
      <h4>{pizzaItem.price}₽</h4>
    </div>
  ) : (
    <div>Питса не найдена :(</div>
  );
};
