import { getRequest } from "../../../utils/request";
import { GET_FAQS } from "./constants";

export const getFAQS = (data) => (dispatch) => {
  getRequest(`insurance-faq`, data, dispatch, GET_FAQS);
};
