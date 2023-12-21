// Начальное состояние
export const initialState = {
  comments: [],
  count: 0,
  waiting: false,
  errors: null, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, comments: [], count: 0, waiting: true };

    case "comments/load-success":
      console.log("successful load", action.payload);
      return {
        ...state,
        comments: action.payload.comments,
        count: action.payload.count,
        waiting: false,
      };

    case "comments/load-error":
      return { ...state, comments: [], waiting: false };

    case "comments/submit-success":
      console.log("successful submit", action.payload);
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
        waiting: false,
      };

    case "comments/submit-error":
      return { ...state, waiting: false };

    case "comments/reply-success":
      console.log("successful reply", action.payload);
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
        waiting: false,
      };

    case "comments/reply-error":
      return { ...state, waiting: false };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
