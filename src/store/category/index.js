import StoreModule from "../module";

class Category extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  /**
   * Загрузка категорий
   */
  async getCategories() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(
        "/api/v1/categories?fields=_id,title,parent(_id)&limit=*"
      );
      const json = await response.json();

      // Приводим список в упоряждоченный вид
      const normalizeList = (list, parentId = null, prefix = "") => {
        const orderedList = [];

        list.forEach((item) => {
          if (
            (item.parent && item.parent._id === parentId) ||
            (item.parent === null && parentId === null)
          ) {
            orderedList.push({
              value: item._id,
              title: `${prefix}${item.title}`,
            });
            orderedList.push(...normalizeList(list, item._id, `${prefix}-`));
          }
        });
        return orderedList;
      };

      const categoryList = normalizeList(json.result.items);

      // Устанавливаем состояние
      this.setState(
        {
          ...this.getState(),
          list: [
            {
              value: "",
              title: "Все",
            },
            ...categoryList,
          ],
          waiting: false,
        },
        "Загружен список фильтров"
      );
    } catch (e) {
      console.log(e.message);
    }
    console.log(this.getState());
  }
}

export default Category;
