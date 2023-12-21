export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: {
            comments: res.data.result.items,
            count: res.data.result.count,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  submitComment: (text, id, author, type) => {
    const token = localStorage.getItem("token");

    return async (dispatch, getState, services) => {
      services.api.setHeader(
        services.config.store.modules.session.tokenHeader,
        token
      );
      //   }
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?lang=ru&fields=*`,
          method: "POST",
          body: JSON.stringify({
            text,
            parent: {
              _id: id,
              _type: type,
            },
          }),
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/submit-success",
          payload: {
            comment: {
              ...res.data.result,
              author: {
                profile: { name: author, _id: res.data.result.author._id },
              },
            },
          },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "comments/submit-error" });
      }
    };
  },
};
