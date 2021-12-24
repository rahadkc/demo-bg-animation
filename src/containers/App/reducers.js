import {
  GET_COMMUNITY_DATA,
  GET_PRIVACY_CMS_DATA,
  GET_RESOURCE_CMS_DATA,
  GET_TERMS_CMS_DATA,
  GET_UPCOMING_FEATURE_CMS_DATA,
  GET_INSURANCE_CMS_DATA,
  GET_HOW_IT_WORKS_CMS_DATA,
  GET_INSURANCE_DETAILS,
} from "./constants";

const init = {
  community_data: {},
  resource_cms: {},
  upcoming: {},
  privacy: {},
  terms: {},
  howitworks: {},
  single_insurance: {}
};

const cmsReducers = (state = init, action) => {
  switch (action.type) {
    case GET_COMMUNITY_DATA: {
      return {
        ...state,
        community_data: action.payload.data,
      };
    }

    case GET_RESOURCE_CMS_DATA: {
      return {
        ...state,
        resource_cms: action.payload.data,
      };
    }

    case GET_UPCOMING_FEATURE_CMS_DATA: {
      return {
        ...state,
        upcoming: action.payload.data,
      };
    }

    case GET_TERMS_CMS_DATA: {
      return {
        ...state,
        terms: action.payload.data,
      };
    }

    case GET_PRIVACY_CMS_DATA: {
      return {
        ...state,
        privacy: action.payload.data,
      };
    }
    case GET_INSURANCE_CMS_DATA: {
      return {
        ...state,
        insurance: action.payload.data,
      };
    }
    case GET_HOW_IT_WORKS_CMS_DATA: {
      return {
        ...state,
        howitworks: action.payload.data,
      };
    }
    case GET_INSURANCE_DETAILS: {
      return {
        ...state,
        single_insurance: action.payload.data,
      };
    }

    default:
      return state;
  }
};
export default cmsReducers;
