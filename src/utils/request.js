import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../store/constants";
import { base_url } from "./constants";

const cookie = new Cookies();

export function postRequest(
  url,
  data,
  dispatch,
  type = null,
  cookie_option = null,
  history = null,
  slug = null,
  actions = null
) {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}${url}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (cookie_option === "save") {
            let token = "Bearer " + res.body.data.access_token;
            let user_info = res.body.data.user_data;
            cookie.set("user_token", token, { path: "/" });
            cookie.set("user_info", user_info);
          } else if (cookie_option === "delete") {
            cookie.remove("user_token");
          }
          if (history) {
            history.push(slug);
          }
          if (actions) {
            actions.resetForm({});
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
        if (type != null) {
          dispatch({ type: type, payload: res.body.data });
        }
        dispatch({ type: IS_LOADING, payload: false });

        if (res.body.reload) {
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
}

export function getRequest(
  url,
  data,
  dispatch,
  type = null,
  cookie_option = null
) {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .get(`${base_url}${url}`)
    .query(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (type !== null) {
          dispatch({ type: type, payload: res.body });
        }
        dispatch({ type: IS_LOADING, payload: false });
        if (cookie_option === "save") {
          let token = res.body.data.access_token;
          cookie.set("user_token", token);
        }
        if (res.body.reload) {
          window.location.reload();
        }
      } else {
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
}

export function getDetailsRequest(url, slug, dispatch, type = null) {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .get(`${base_url}${url}/${slug}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (type !== null) {
          dispatch({ type: type, payload: res.body });
        }
        dispatch({ type: IS_LOADING, payload: false });
      } else {
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
}
