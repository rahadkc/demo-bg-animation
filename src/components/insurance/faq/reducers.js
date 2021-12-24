import { GET_FAQS } from "./constants";

const init = {
  faqs: {},
};

const faqReducer = (state = init, action) => {
  switch (action.type) {
    case GET_FAQS: {
      return {
        ...state,
        faqs: action.payload.data,
      };
    }
    default:
      return state;
  }
};
export default faqReducer;
