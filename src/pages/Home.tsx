import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    sortProperty: "rating",
    name: "популярности",
  });

  useEffect(() => {
    setIsLoaded(false);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    fetch(
      `https://651b3616194f77f2a5ae5679.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setPizzas(arr);
        setIsLoaded(true);
      });
    window.scroll(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const items = pizzas.map((pizza) => (
    <PizzaBlock key={pizza?.id} {...pizza} />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(id: number) => setCategoryId(id)}
        />
        <Sort onClickSort={(i) => setSortType(i)} sortType={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{!isLoaded ? skeletons : items}</div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};