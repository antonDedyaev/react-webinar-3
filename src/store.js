import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину по коду
   */
  addToCart(code) {
    const alreadyAddedItem = this.state.cart.find(
      (cartItem) => cartItem.code === code
    );
    if (!alreadyAddedItem) {
      // Если товара нет в корзине, добавляем его с количеством 1
      this.setState({
        ...this.state,
        cart: [
          ...this.state.cart,
          { ...this.state.list.find((item) => item.code === code), amount: 1 },
        ],
      });
    } else {
      // Если товар уже есть в корзине, увеличиваем его количество
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => {
          if (item.code === alreadyAddedItem.code) {
            item.amount++;
          }
          return item;
        }),
      });
    }
  }

  /**
   * Удаление из корзины по коду
   * @param code
   */
  deleteFromCart(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      cart: this.state.cart.filter((item) => item.code !== code),
    });
  }
}

export default Store;
