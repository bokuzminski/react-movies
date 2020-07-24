const Reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'FINISHED_FETCHING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default Reducer;
