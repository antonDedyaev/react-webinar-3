class i18nService {
  /**
   * @param services {Services} Менеджер сервисов
   * @param config {Object}
   */
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.language = config.lang;
    this.listeners = [];

    this.translate = this.translate.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.getLocale = this.getLocale.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.notifyListeners = this.notifyListeners.bind(this);
  }

  setLocale(lang) {
    this.language = lang;
    this.services.api.setHeader("X-lang", lang);
    for (const listener of this.listeners) {
      listener(this.language);
    }
  }

  getLocale() {
    return this.language;
  }

  translate(lang = this.language, text, plural) {
    let result =
      this.config.translations[lang] && text in this.config.translations[lang]
        ? this.config.translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  notifyListeners() {
    for (const listener of this.listeners) listener(this.language);
  }
}

export default i18nService;
