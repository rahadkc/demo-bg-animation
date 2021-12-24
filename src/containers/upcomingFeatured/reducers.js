import { GET_PUBLIC_FEATURE_DATA } from "./constants";

const init = {
  feature_list: {},
};

const featureReducers = (state = init, action) => {
  switch (action.type) {
    case GET_PUBLIC_FEATURE_DATA: {
      return {
        ...state,
        feature_list: action.payload.data,
      };
    }
    default:
      return state;
  }
};
export default featureReducers;
