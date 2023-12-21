import simplifyErrors from "../../utils/simplify-errors";

export default {
  /**
   * Авторизация
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  signIn: (data, onSuccess) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: "/api/v1/users/sign",
          method: "POST",
          body: JSON.stringify(data),
        });

        if (!res.data.error) {
          dispatch({
            type: "session/sign-in-success",
            payload: {
              token: res.data.result.token,
              user: res.data.result.user,
            },
          });

          // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
          window.localStorage.setItem("token", res.data.result.token);

          // Устанавливаем токен в АПИ
          services.api.setHeader(
            services.config.store.modules.session.tokenHeader,
            res.data.result.token
          );

          if (onSuccess) onSuccess();
        } else {
          dispatch({
            type: "session/sign-in-error",
            payload: {
              errors: simplifyErrors(res.data.error.data.issues),
            },
          });
        }
      } catch (e) {
        //Ошибка авторизации
        console.error(e);
      }
    };
  },

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  signOut: () => {
    return async (dispatch, getState, services) => {
      try {
        await services.api.request({
          url: "/api/v1/users/sign",
          method: "DELETE",
        });

        // Удаляем токен
        window.localStorage.removeItem("token");
        // Удаляем заголовок
        services.api.setHeader(
          services.config.store.modules.session.tokenHeader,
          null
        ); // !!!
      } catch (e) {
        //Ошибка авторизации
        console.error(e);
      }
      dispatch({ type: "session/sign-out-success" });
    };
  },

  /**
   * По токену восстановление сессии
   * @return {Promise<void>}
   */

  remind: () => {
    const token = localStorage.getItem("token");
    return async (dispatch, getState, services) => {
      if (token) {
        // Устанавливаем токен в АПИ

        services.api.setHeader(
          services.config.store.modules.session.tokenHeader,
          token
        );
        // Проверяем токен выбором своего профиля
        const res = await services.api.request({
          url: "/api/v1/users/self",
        });

        if (res.data.error) {
          // Удаляем плохой токен
          window.localStorage.removeItem("token");
          services.api.setHeader(
            services.config.store.modules.session.tokenHeader,
            null
          );
          dispatch({ type: "session/remind-error" });
        } else {
          dispatch({
            type: "session/remind-success",
            payload: { token: token, user: res.data.result },
          });
        }
      } else {
        // Если токена не было, то сбрасываем ожидание (так как по умолчанию true)
        dispatch({ type: "session/remind-error" });
      }
    };
  },

  /**
   * Сброс ошибок авторизации
   */

  resetErrors: () => {
    return { type: "session/reset-errors" };
  },
};
