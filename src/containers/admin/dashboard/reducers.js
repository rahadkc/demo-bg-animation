import {
  GET_ALL_BLACKLIST_DATA,
  GET_ALL_IP_LIST,
  GET_ALL_PAGES_DATA,
  GET_ALL_USERS_LIST,
  GET_CATEGORY_LIST_DATA,
  GET_FEATURE_DETAILS_DATA,
  GET_FEATURE_LIST_DATA,
  GET_RESOURCE_LIST_DATA,
  GET_USER_DETAILS,
  GET_SUBSCRIPTIONS_BY_ID,
  GET_ALL_PLANS_BY_ID,
  GET_ALL_INSURANCES,
  GET_INSURANCE_BY_ID,
  GET_SUBSCRIPTION_DETAILS,
  GET_PALN_DETAILS,
  GET_FAQS,
  GET_FAQ_DETAILS,
  GET_INSURANCE_CMS_DATA,
} from "./constants";

const init = {
  user_list: {},
  user_details: {},
  blacklist: {},
  ip_list: [],
  resources_list: {},
  categories: {},
  pages: {},
  insurances: {},
  subscriptions: {},
  plans: {},
  insurance_details: {},
  subscription_details: {},
  plan_details: {},
  faqs: {},
  faq_details: {},
  insurance_cms: {},
};

const adminReducers = (state = init, action) => {
  switch (action.type) {
    case GET_ALL_USERS_LIST: {
      return {
        ...state,
        user_list: action.payload.data,
      };
    }
    case GET_USER_DETAILS: {
      return {
        ...state,
        user_details: action.payload.data,
      };
    }
    case GET_ALL_BLACKLIST_DATA: {
      return {
        ...state,
        blacklist: action.payload.data,
      };
    }
    case GET_ALL_IP_LIST: {
      return {
        ...state,
        ip_list: action.payload.data,
      };
    }
    case GET_RESOURCE_LIST_DATA: {
      return {
        ...state,
        resources_list: action.payload.data,
      };
    }
    case GET_CATEGORY_LIST_DATA: {
      return {
        ...state,
        categories: action.payload.data,
      };
    }
    case GET_FEATURE_LIST_DATA: {
      return {
        ...state,
        feature: action.payload.data,
      };
    }
    case GET_FEATURE_DETAILS_DATA: {
      return {
        ...state,
        feature_details: action.payload.data,
      };
    }
    case GET_ALL_PAGES_DATA: {
      return {
        ...state,
        pages: action.payload.data,
      };
    }
    case GET_ALL_INSURANCES: {
      return {
        ...state,
        insurances: action.payload.data,
      };
    }
    case GET_SUBSCRIPTIONS_BY_ID: {
      return {
        ...state,
        subscriptions: action.payload.data,
      };
    }
    case GET_ALL_PLANS_BY_ID: {
      return {
        ...state,
        plans: action.payload.data,
      };
    }
    case GET_INSURANCE_BY_ID: {
      return {
        ...state,
        insurance_details: action.payload.data,
      };
    }
    case GET_SUBSCRIPTION_DETAILS: {
      return {
        ...state,
        subscription_details: action.payload.data,
      };
    }
    case GET_PALN_DETAILS: {
      return {
        ...state,
        plan_details: action.payload.data,
      };
    }
    case GET_FAQS: {
      return {
        ...state,
        faqs: action.payload.data,
      };
    }
    case GET_FAQ_DETAILS: {
      return {
        ...state,
        faq_details: action.payload.data,
      };
    }
    case GET_INSURANCE_CMS_DATA: {
      return {
        ...state,
        insurance_cms: action.payload.data,
      };
    }
    default:
      return state;
  }
};
export default adminReducers;
