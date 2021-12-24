import superagent from "superagent";
import Cookies from "universal-cookie";
import {
  IS_LOADING,
  THROW_ERROR,
  THROW_SUCCESS,
} from "../../../../store/constants";
import { base_url } from "../../../../utils/constants";
import { getRequest } from "../../../../utils/request";
import {
  GET_INSURANCE_CMS_DATA,
  GET_INSURANCE_DETAILS,
} from "../../../App/constants";

const cookie = new Cookies();

export const getInsuranceDetails = (slug, data) => (dispatch) => {
  getRequest(`admin/insurance/${slug}`, data, dispatch, GET_INSURANCE_DETAILS);
};

export const addInsuranceCMSDataAction =
  (data, editView, slug) => (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });

    return superagent
      .post(`${base_url}admin/insurance/${slug}`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest(
              `admin/insurance`,
              null,
              dispatch,
              GET_INSURANCE_CMS_DATA
            );
            editView(false);
          } else {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };

export const editInsuranceTiers = (data, editView, slug) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .post(`${base_url}admin/insurance/${slug}/plan`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `admin/insurance/${slug}`,
            null,
            dispatch,
            GET_INSURANCE_DETAILS
          );

          editView(false);
        } else {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const deleteInsuranceTiers = (editView, tierId, slug) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .delete(`${base_url}admin/insurance/tier/${tierId}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        // if (res.body.status) {
        dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        getRequest(
          `admin/insurance/${slug}`,
          null,
          dispatch,
          GET_INSURANCE_DETAILS
        );
        editView(false);
        // } else {
        //   dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        // }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
