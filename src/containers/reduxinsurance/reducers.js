import { ALL_INSURANCE, SINGLE_INSURANCE } from "./constants";

const init = {
  allinsurance: {},
  insurance: {}
};

const insuranceReducer = (state = init, action) => {
  switch (action.type) {
    case ALL_INSURANCE: {
      return {
        ...state,
        allinsurance: action.payload.data,
      };
    }

    case SINGLE_INSURANCE: {
      return {
        ...state,
        insurance: action.payload.data,
      };
    }

    default:
      return state;
  }
};
export default insuranceReducer;
