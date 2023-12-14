import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
      error: null,
    };
  }

  /**
   * Авторизация
   * @param credentials {Object}
   * @return {Promise<void>}
   */
  async login(credentials) {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
      error: null,
    });

    try {
      const response = await fetch(
        "/api/v1/users/sign?fields=_id,profile(name)",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      const json = await response.json();
      // Если возникла ошибка, выбрасываем исключение
      if (json.error) throw json.error;

      // Пользователь успешно авторизовался
      const { token, user } = json.result;
      // Сохраняем имя текущего пользователя и его токен
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: user.id, username: user.profile.name, token })
      );
      this.setState(
        {
          data: {
            ...this.getState().data,
            username: user.profile.name,
          },
          waiting: false,
          error: null,
        },
        "Профиль загружен"
      );
    } catch (e) {
      // Сохраняем ошибку в стейт
      this.setState({
        waiting: false,
        error: e.message,
      });
    }
  }

  /**
   * Получение профиля
   * @return {Promise<void>}
   */

  async loadProfile() {
    this.setState({
      data: {},
      waiting: true,
      error: null,
    });

    const savedToken = localStorage.getItem("currentUser");
    const validToken = savedToken && JSON.parse(savedToken).token;

    try {
      const response = await fetch(
        "/api/v1/users/self?fields=_id,profile(name,phone),email",
        {
          method: "GET",
          headers: {
            "X-Token": validToken,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      // Если возникла ошибка, выбрасываем исключение
      if (json.error) throw json.error;

      // Данные профиля подгрузились
      const { email, profile } = json.result;

      this.setState(
        {
          ...this.getState(),
          data: {
            username: profile.name,
            phone: profile.phone,
            email,
          },
          waiting: false,
        },
        "Профиль загружен"
      );
    } catch (e) {
      console.log("error");
      // Сохраняем ошибку в стейт
      this.setState({
        data: {},
        waiting: false,
        error: e.message,
      });
    }
  }

  /**
   * Сброс авторизации
   * @return {Promise<void>}
   */

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });

    const savedToken = localStorage.getItem("currentUser");
    const validToken = savedToken && JSON.parse(savedToken).token;

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": validToken,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      // Если возникла ошибка, выбрасываем исключение
      if (json.error) throw json.error;
      // Успешный сброс авторизации
      this.setState(
        {
          data: {},
          waiting: false,
          error: null,
          isAuthenticated: false,
        },
        "Профиль удален"
      );
      // Удаляем данные из хранилища
      localStorage.removeItem("currentUser");
    } catch (e) {
      console.log("error");
      // Сохраняем ошибку в стейт
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e.message,
      });
    }
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null,
    });
  }
}

export default UserState;
