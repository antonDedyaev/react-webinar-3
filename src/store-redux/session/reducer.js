// Начальное состояние
export const initialState = {
  user: {},
  token: null,
  errors: null,
  waiting: true,
  exists: false,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "session/sign-in-success":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        exists: true,
        waiting: false,
      };

    case "session/sign-in-error":
      return {
        ...state,
        errors: action.payload.errors,
        waiting: false,
      };

    case "session/sign-out-success":
      return {
        ...initialState,
        waiting: false,
      };

    case "session/remind-success":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        exists: true,
        waiting: false,
      };

    case "session/remind-error":
      return {
        ...state,
        exists: false,
        waiting: false,
      };

    case "session/reset-errors":
      return { ...state, errors: null };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
