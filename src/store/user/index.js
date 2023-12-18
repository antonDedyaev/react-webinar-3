import StoreModule from "../module";

/**
 * Информация о пользователе
 */
class UserState extends StoreModule {
  initState() {
    return {
      currentUser: {},
      waiting: false, // признак ожидания загрузки
      isAuth: false, // признак авторизации
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
      currentUser: {},
      waiting: true,
      isAuth: false,
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
      // Если возникла ошибка, выбрасываем исключение с текстом ошибки
      if (json.error) throw json.error.data.issues[0].message;

      // Пользователь успешно авторизовался
      const { token, user } = json.result;
      // Сохраняем токен
      localStorage.setItem("token", JSON.stringify(token));

      this.setState(
        {
          currentUser: {
            username: user.profile.name,
          },
          waiting: false,
          isAuth: true,
          error: null,
        },
        "Профиль загружен"
      );
    } catch (error) {
      // Сохраняем ошибку в стейт
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
        error,
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

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": JSON.parse(localStorage.getItem("token")),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      // Если возникла ошибка, выбрасываем исключение
      if (json.error) throw json.error.data.issues[0].message;
      // Успешный сброс авторизации
      this.setState(
        {
          currentUser: {},
          waiting: false,
          isAuth: false,
          error: null,
        },
        "Профиль удален"
      );
      // Удаляем данные из хранилища
      localStorage.removeItem("token");
    } catch (error) {
      // Сохраняем ошибку в стейт
      this.setState({
        ...this.getState(),
        waiting: false,
        error,
      });
    }
  }

  async validateSession() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: null,
    });

    try {
      // Если токен есть и он валиден, то должны вернуться данные
      const response = await fetch(
        "/api/v1/users/self?fields=_id,profile(name)",
        {
          method: "GET",
          headers: {
            "X-Token": JSON.parse(localStorage.getItem("token")),
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      // Если возникла ошибка, выбрасываем исключение
      if (json.error) throw json.error.data.issues[0].message;

      this.setState({
        currentUser: {
          username: json.result.profile.name,
        },
        waiting: false,
        isAuth: true,
        error: null,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error,
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
