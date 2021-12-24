import { getRequest } from "../../utils/request";
import {
  GET_ALL_RESOURCE_DATA,
  GET_FEATURED_RESOURCE_DATA,
  GET_PUBLIC_CATEGORY,
  GET_RESOURCE_DETAILS_DATA,
} from "./constants";

export const getResourceDetailsAction = (id, data) => (dispatch) => {
  getRequest(`resource/${id}`, data, dispatch, GET_RESOURCE_DETAILS_DATA);
};

export const getPublicResourceData = (data) => (dispatch) => {
  dispatch({
    type: GET_RESOURCE_DETAILS_DATA,
    payload: {
      data: {},
    },
  });

  getRequest(`resource`, data, dispatch, GET_ALL_RESOURCE_DATA);
};

export const getFeaturedResourceData = (data) => (dispatch) => {
  getRequest(`feature-resource`, data, dispatch, GET_FEATURED_RESOURCE_DATA);
};

export const getCategoryData = (data) => (dispatch) => {
  getRequest(`category`, data, dispatch, GET_PUBLIC_CATEGORY);
};
