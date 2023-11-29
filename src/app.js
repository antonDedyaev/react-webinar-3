import React, { useCallback, useState } from "react";
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Button from "./components/button";
import Controls from "./components/controls";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  // Для управления состоянием модального окна
  const [isActive, setIsActive] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onAddToCart: useCallback(
      (code) => {
        store.addToCart(code);
      },
      [store]
    ),
    onDeleteFromCart: useCallback(
      (code) => {
        store.deleteFromCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls cart={cart} isControllable>
        <Button handleClick={() => setIsActive(true)}>Перейти</Button>
      </Controls>
      <List
        list={list}
        actionTitle="Добавить"
        clickHandler={callbacks.onAddToCart}
      />
      <Modal isActive={isActive}>
        <Cart
          cart={cart}
          onDeleteFromCart={callbacks.onDeleteFromCart}
          setIsActive={setIsActive}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
