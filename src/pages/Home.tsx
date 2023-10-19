import qs from "qs";
import { Categories } from "../components/Categories";
import { Sort, sortList } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/skeleton";
import { PizzaBlock } from "../components/PizzaBlock";
import { useEffect, useRef } from "react";
import { Pagination } from "../components/Pagination";
import { useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  SortModel,
} from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/store/Pizza`s/action";
import { selectFilter, selectPizzaData } from "../redux/store/selectors";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, currentPage, sort, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangePage = (number: number) => dispatch(setCurrentPage(number));

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    dispatch(fetchPizzas({ order, sortBy, category, search, currentPage }));
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
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzaItems = items.map((pizza) => <PizzaBlock {...pizza} />);

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
      {status === "error" ? (
        <div className={"content__error-info"}>
          <h2>Произошла ошибка😕</h2>
          <p>К сожалению, не удалось получить питсы :(</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzaItems}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
