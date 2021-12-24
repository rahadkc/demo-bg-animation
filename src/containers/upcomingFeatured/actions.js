import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
import { getRequest } from "../../utils/request";
import { GET_PUBLIC_FEATURE_DATA } from "./constants";
const cookie = new Cookies();

export const requestFeatureAction = (data, actions, setFiles) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  let formImage = new FormData();
  formImage.append("idea", data.idea);
  formImage.append("title", data.title);
  formImage.append("description", data.description);
  for (let i = 0; i < data.image.length; i++) {
    formImage.append(`image[]`, data.image[i], data.image[i].name);
  }

  return superagent
    .post(`${base_url}useful-feature`)
    .send(formImage)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))

    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          setFiles([]);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
        dispatch({ type: IS_LOADING, payload: false });
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getPublicFeatureListAction = (data) => (dispatch) => {
  getRequest("upcoming-feature", data, dispatch, GET_PUBLIC_FEATURE_DATA);
};

export const addVoteAction = (data) => (dispatch) => {
  return superagent
    .post(`${base_url}give-vote`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            "upcoming-feature",
            null,
            dispatch,
            GET_PUBLIC_FEATURE_DATA
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
          getRequest(
            "upcoming-feature",
            null,
            dispatch,
            GET_PUBLIC_FEATURE_DATA
          );
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
