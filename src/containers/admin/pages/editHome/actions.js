import superagent from "superagent";
import Cookies from "universal-cookie";
import {
  IS_LOADING,
  THROW_ERROR,
  THROW_SUCCESS,
} from "../../../../store/constants";
import { base_url } from "../../../../utils/constants";
import { getRequest } from "../../../../utils/request";
import { GET_HOME_PAGE_DATA } from "../../../home/constants";

const cookie = new Cookies();

export const addGeneralHomeDataAction = (data, editView) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/homepage-cms-one`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`home-cms`, null, dispatch, GET_HOME_PAGE_DATA);
          editView(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const addHeroHomeDataAction = (data, editView) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .post(`${base_url}admin/homepage-cms-hero`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`home-cms`, null, dispatch, GET_HOME_PAGE_DATA);
          editView(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
export const addWhatHomeDataAction = (data, editView) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/homepage-cms-two`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`home-cms`, null, dispatch, GET_HOME_PAGE_DATA);
          editView(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const addHomeThreeDataAction = (data) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/homepage-cms-three`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`home-cms`, null, dispatch, GET_HOME_PAGE_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const uploadFileAction = (data, fieldValue, name) => (dispatch) => {
  const form_data = new FormData();
  form_data.append("file", data.file);
  return superagent
    .post(`${base_url}upload-cdn`)
    .send(form_data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          fieldValue(name, res.body.data);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
