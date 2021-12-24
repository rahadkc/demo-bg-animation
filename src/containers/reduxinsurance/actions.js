import { getRequest } from "../../utils/request";
import { ALL_INSURANCE, SINGLE_INSURANCE } from "./constants";

export const AllInsurances = (data) => (dispatch) => {
  dispatch({
    type: SINGLE_INSURANCE,
    payload: {
      data: {},
    },
  });
  getRequest("insurances", data, dispatch, ALL_INSURANCE);
};

export const getSingleInsurance = (id, data) => (dispatch) => {
  getRequest(`insurance/${id}`, data, dispatch, SINGLE_INSURANCE);
};
