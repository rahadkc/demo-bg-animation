import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
import { getRequest } from "../../utils/request";
import {
  GET_ACCOUNT_DATA,
  PAYMENT_HISTORY,
  GET_PAYMENT_TYPE_DETAILS,
  GET_HOW_IT_WORKS_CMS_DATA,
} from "./constants";

const cookie = new Cookies();

export const getAccountInformation = (data) => (dispatch) => {
  getRequest("user", data, dispatch, GET_ACCOUNT_DATA);
};

export const uploadProfilePictureAction = (data) => (dispatch) => {
  let formImage = new FormData();
  formImage.append("photo", data);

  return superagent
    .post(`${base_url}profile-picture`)
    .send(formImage)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("user", data, dispatch, GET_ACCOUNT_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const updateAccountInfoAction =
  (data, setAccountModal) => (dispatch) => {
    return superagent
      .post(`${base_url}account-information`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest("user", data, dispatch, GET_ACCOUNT_DATA);
            setAccountModal(false);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };

export const updateProfileInfoAction =
  (data, setAccountModal) => (dispatch) => {
    return superagent
      .post(`${base_url}my-profile`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest("user", data, dispatch, GET_ACCOUNT_DATA);
            setAccountModal(false);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };

export const getPaymentHistory = (pagination) => (dispatch) => {
  getRequest(`transactions${pagination}`, null, dispatch, PAYMENT_HISTORY);
};

export const getCustomerPaymentMethod = (data) => (dispatch) => {
  getRequest("customer/get-card", data, dispatch, GET_PAYMENT_TYPE_DETAILS);
};

export const updatePaymentMethod = (data, setAccountModal) => (dispatch) => {
  return superagent
    .post(`${base_url}customer/update-card`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            "customer/get-card",
            null,
            dispatch,
            GET_PAYMENT_TYPE_DETAILS
          );
          setAccountModal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const updatePassword = (data, setAccountModal) => (dispatch) => {
  return superagent
    .post(`${base_url}update-password`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (res.body.errors && Object.keys(res.body.errors).length === 0) {
            setAccountModal(false);
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getHowItWorksDetails = (data) => (dispatch) => {
  getRequest("howitworks-cms", data, dispatch, GET_HOW_IT_WORKS_CMS_DATA);
};

export const updateSubscriptionAutoRenewal = (data) => (dispatch) => {
  return superagent
    .post(`${base_url}subscription`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("user", data, dispatch, GET_ACCOUNT_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
