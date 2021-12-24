import { getRequest } from "../../utils/request";
import {
  GET_COMMUNITY_DATA,
  GET_PRIVACY_CMS_DATA,
  GET_RESOURCE_CMS_DATA,
  GET_TERMS_CMS_DATA,
  GET_UPCOMING_FEATURE_CMS_DATA,
  GET_INSURANCE_CMS_DATA,
  GET_HOW_IT_WORKS_CMS_DATA,
} from "./constants";

export const getCommunityDetailsAction = (data) => (dispatch) => {
  getRequest(`community`, data, dispatch, GET_COMMUNITY_DATA);
};

export const getResourceDetailsAction = (data) => (dispatch) => {
  getRequest(`resource-cms`, data, dispatch, GET_RESOURCE_CMS_DATA);
};

export const getUpcomingDetailsAction = (data) => (dispatch) => {
  getRequest(
    `upcoming-feature-cms`,
    data,
    dispatch,
    GET_UPCOMING_FEATURE_CMS_DATA
  );
};

export const getTermsDetailsAction = (data) => (dispatch) => {
  getRequest(`terms-cms`, data, dispatch, GET_TERMS_CMS_DATA);
};

export const getPrivacyDetailsAction = (data) => (dispatch) => {
  getRequest(`privacy-cms`, data, dispatch, GET_PRIVACY_CMS_DATA);
};

export const getInsuranceDetailsAction = (data) => (dispatch) => {
  getRequest(`insurance-cms`, data, dispatch, GET_INSURANCE_CMS_DATA);
};

export const getHowItWorksCMSDetails = (data) => (dispatch) => {
  getRequest(`howitworks-cms`, data, dispatch, GET_HOW_IT_WORKS_CMS_DATA);
};