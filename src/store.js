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
	 * Добавление новой записи
	 */

	// Передаем в метод начальное значение в качестве точки начала отсчета уникального кода
	// если значение не передано, начинаем с 1

	addItem(initialCode = 1) {
		//добавляем в стейт еще одно поле - счетчик для установки уникального кода
		this.state.codeCounter = this.state.codeCounter ?? initialCode;
		this.setState({
			...this.state,
			list: [...this.state.list, { code: this.state.codeCounter, title: "Новая запись", selectionCount: 0 }],
		});
		this.state.codeCounter++;
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter((item) => item.code !== code),
		});
	}

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map((item) => {
				// Инициализация счетчика выделений - начинаем с 0, если выделений не было
				item.selectionCount = item.selectionCount ?? 0;
				if (item.code === code) {
					item.selected = !item.selected;
					// Подсчет кол-ва выделений записи
					item.selectionCount = item.selected ? item.selectionCount + 1 : item.selectionCount;
				} else {
					// Отмена выделения остальных записей при выделении одной
					item.selected = false;
				}
				return item;
			}),
		});
	}
}

export default Store;
