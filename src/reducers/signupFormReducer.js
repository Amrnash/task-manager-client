const signupFormReducer = (state, action) => {
  switch (action.type) {
    case "NAME_CHANGE":
      return { ...state, name: action.payload };
    case "EMAIL_CHANGE":
      return { ...state, email: action.payload };
    case "PASSWORD_CHANGE":
      return { ...state, password: action.payload };
    case "ERROR":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
export default signupFormReducer;
