const tasksReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASKS":
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case "COMPLETE_TASK":
      return { ...state, tasks: action.payload };
    case "DELETE_TASK":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
export default tasksReducer;
