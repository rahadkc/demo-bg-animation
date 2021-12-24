import { GET_HOME_PAGE_DATA } from "./constants";

const init = {
  home_data: {},
};

const homeReducers = (state = init, action) => {
  switch (action.type) {
    case GET_HOME_PAGE_DATA: {
      return {
        ...state,
        home_data: action.payload.data,
      };
    }

    default:
      return state;
  }
};
export default homeReducers;
