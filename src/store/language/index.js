import StoreModule from "../module";

// Добавил класс для переключения языка
class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: "ru",
    };
  }

  setLanguage(language) {
    this.setState({
      ...this.getState(),
      currentLanguage: language,
    });
  }
}

export default Language;
