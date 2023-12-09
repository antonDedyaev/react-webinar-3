import { memo, useCallback, useEffect, useState } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import * as locales from "../locales/exports";
import { getLocale } from "../../utils";
import MainMenu from "../../components/main-menu";

function Main() {
  //Локальный стейт для спиннера
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    perPageLimit: state.catalog.perPageLimit,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage,
  }));

  // Выбираем нужную страницу из локали на выбранном языке
  const { page } = getLocale(select.language, locales);

  useEffect(() => {
    try {
      store.actions.catalog.load();
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [select.currentPage, select.language]); // Рендерим каждый раз, когда меняется текущая страница и язык

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    setPage: useCallback(
      (page) => store.actions.catalog.setCurrentPage(page),
      [store]
    ),
    switchLanguage: useCallback(
      (language) => store.actions.language.setLanguage(language),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            language={select.language}
          />
        );
      },
      [callbacks.addToBasket, select.language]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={page.shop}
        language={select.language}
        switchLanguage={callbacks.switchLanguage}
      />
      <MainMenu language={select.language} setCurrentPage={callbacks.setPage} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        totalItems={select.totalItems}
        itemsPerPage={select.perPageLimit}
        currentPage={select.currentPage}
        setCurrentPage={callbacks.setPage}
      />
      {isLoading && <Spinner />};
    </PageLayout>
  );
}

export default memo(Main);
