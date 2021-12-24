import {
  GET_ALL_RESOURCE_DATA,
  GET_FEATURED_RESOURCE_DATA,
  GET_PUBLIC_CATEGORY,
  GET_RESOURCE_DETAILS_DATA,
  PAYMENT_HISTORY,
} from "./constants";

const init = {
  resources_details: {},
  resources_list: {},
  featured_resources: [],
  public_cat: [],
  payment_history: []
};

const resourceReducers = (state = init, action) => {
  switch (action.type) {
    case GET_RESOURCE_DETAILS_DATA: {
      return {
        ...state,
        resources_details: action.payload.data,
      };
    }
    case GET_ALL_RESOURCE_DATA: {
      return {
        ...state,
        resources_list: action.payload.data,
      };
    }
    case GET_FEATURED_RESOURCE_DATA: {
      return {
        ...state,
        featured_resources: action.payload.data,
      };
    }
    case GET_PUBLIC_CATEGORY: {
      return {
        ...state,
        public_cat: action.payload.data,
      };
    }
    case PAYMENT_HISTORY: {
      return {
        ...state,
        paymenthistory: action.payload.data,
      };
    }
    default:
      return state;
  }
};
export default resourceReducers;
