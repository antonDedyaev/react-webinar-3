import StoreModule from "../module";

/**
 * Информация о профилях
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      currentProfile: {}, // профиль пользователя
      waiting: false, // признак ожидания загрузки
      error: null,
    };
  }

  /**
   * Получение профиля
   * @return {Promise<void>}
   */

  async loadProfile() {
    this.setState({
      ...this.getState(),
      currentProfile: {}, // профиль пользователя
      waiting: true,
      error: null,
    });

    try {
      const response = await fetch(
        "/api/v1/users/self?fields=_id,profile(name,phone),email",
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

      // Данные профиля подгрузились
      const { email, profile } = json.result;

      this.setState(
        {
          ...this.getState(),
          currentProfile: {
            username: profile.name,
            phone: profile.phone,
            email,
          },
          waiting: false,
        },
        "Профиль загружен"
      );
    } catch (error) {
      console.log(error);
      // Сохраняем ошибку в стейт
      this.setState({
        currentProfile: {},
        waiting: false,
        error,
      });
    }
  }
}

export default ProfileState;
