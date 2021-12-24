import { GET_ACCOUNT_DATA, GET_HOW_IT_WORKS_CMS_DATA, GET_PAYMENT_TYPE_DETAILS, PAYMENT_HISTORY } from "./constants";

const init = {
  user_info: {},
  paymenthistory: {},
  customer_payment_method: {},
};

const accountReducers = (state = init, action) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA: {
      return {
        ...state,
        user_info: action.payload.data,
      };
    }
    case PAYMENT_HISTORY: {
      return {
        ...state,
        paymenthistory: action.payload.data,
      };
    }
    case GET_PAYMENT_TYPE_DETAILS: {
      return {
        ...state,
        customer_payment_method: action.payload.data,
      };
    }
    case GET_HOW_IT_WORKS_CMS_DATA: {
      return {
        ...state,
        howitworks_cms: action.payload.data,
      };
    }

    default:
      return state;
  }
};
export default accountReducers;
