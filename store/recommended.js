const GET_RECOMMENDED = "GET_RECOMMENDED";
const STORE_RECOMMENDED = "STORE_RECOMMENDED";

const getRecommended = () => {
  return {
    type: GET_RECOMMENDED,
  };
};

const storeRecommended = Recommended => {
  return {
    type: STORE_RECOMMENDED,
    payload: Recommended,
  };
};

export const getRecommendedThunk = () => dispatch => {
  dispatch(getRecommended());
};

export const storeRecommendedThunk = recommended => dispatch => {
  dispatch(storeRecommended(recommended));
};

export default recommendedReducer = (state = {
  categories: [],
  currentRecommended: ''
}, action) => {
  switch (action.type) {
    case GET_RECOMMENDED:
      return state;
    case STORE_RECOMMENDED:
      const temp = state.categories
      temp.push(action.payload)
      let sortedFreq = ''
      if (temp.length > 0) {
        freq = temp.reduce((acc, val) => {
          if (acc[val]) {
            acc[val] += 1
          } else {
            acc[val] = 1
          }
          return acc
        }, {})
        sortedFreq = Object.entries(freq).sort((a, b) => b[1] - a[1])
      }

      return {
        categories: temp,
        currentRecommended: sortedFreq[0][0]
      };
    default:
      return state;
  }
};
