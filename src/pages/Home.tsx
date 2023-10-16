import qs from "qs";
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { useContext, useEffect, useRef, useState } from "react";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  SortModel,
} from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const sortType = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const onChangePage = (number: number) => dispatch(setCurrentPage(number));

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const fetchPizzas = () => {
    setIsLoaded(false);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    axios
      .get(
        `https://651b3616194f77f2a5ae5679.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj: SortModel) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
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
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{!isLoaded ? skeletons : items}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
