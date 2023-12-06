import { memo, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import ItemDetail from "../../components/item-detail";
import loadArticle from "../services";
import Spinner from "../../components/spinner";

function ArticlePage() {
  const { articleId } = useParams();
  //Локальный стейт для спиннера
  const [isLoading, setIsLoading] = useState(true);
  const store = useStore();
  // Создаем локальный стейт для страницы с детальной информацией о товаре
  const [articleInfo, setArticleInfo] = useState({
    _id: "",
    title: {},
    description: {},
    price: 0,
    edition: 0,
    category: {},
    madeIn: {},
  });

  // Закрываем модалку при переходе на страницу с описанием товара
  useEffect(() => {
    callbacks.closeModalBasket();
  }, []);

  useEffect(() => {
    try {
      // Делаем запрос на получение данных о конкретном товаре (только нужные поля)
      const getArticleDetails = async () => {
        const data = await loadArticle(articleId);
        // Устанавливаем полученные данные в локальный стейт
        setArticleInfo(data);
      };
      getArticleDetails();
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.currentLanguage,
  }));

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
    // Закрытие модалки корзины
    closeModalBasket: useCallback(
      () => store.actions.modals.close("basket"),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head
        title={
          select.language === "ru" ? articleInfo.title.ru : articleInfo.title.en
        }
      />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <ItemDetail
        article={articleInfo}
        onAdd={callbacks.addToBasket}
        language={select.language}
      />
      {isLoading && <Spinner />}
    </PageLayout>
  );
}

export default memo(ArticlePage);
