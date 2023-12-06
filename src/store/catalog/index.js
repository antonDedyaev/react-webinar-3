import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      perPageLimit: 10,
      totalItems: 0,
    };
  }

  async load() {
    const { perPageLimit, currentPage } = this.getState();
    // Расчет пропускаемых товаров для правильной пагинации
    const skippedItems = (currentPage - 1) * perPageLimit;

    // Загрузка списка товаров с нужными полями и пагинацией
    const response = await fetch(
      `/api/v1/articles?lang=all&limit=${perPageLimit}&skip=${skippedItems}&fields=items(_id, title, price),count`
    );
    const json = await response.json();
    console.log(json);
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItems: json.result.count,
      },
      "Загружены товары из АПИ"
    );
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default Catalog;
