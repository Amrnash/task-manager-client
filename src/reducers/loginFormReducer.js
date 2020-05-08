const loginFormReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_CHANGE":
      return { ...state, email: action.payload };
    case "PASSWORD_CHANGE":
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

export default loginFormReducer;
