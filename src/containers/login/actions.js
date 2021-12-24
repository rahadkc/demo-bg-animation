import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
const cookie = new Cookies();

export const loginAction = (data, actions, history, modal) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .post(`${base_url}login`)
    .send(data)
    .set("accept", "application/json")
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
          const token = "Bearer " + res.body.token;
          cookie.set("user_token", token, {
            path: "/",
            expires: new Date(Date.now() + (3600 * 1000 * 24)),
          });
          cookie.set("user_info", res.body.user_info, {
            path: "/",
            expires: new Date(Date.now() + (3600 * 1000 * 24)),
          });
          history.push("/my-account");

          if (modal) {
            modal(false);
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

export const loginModalAction =
  (data, actions, history, modal) => (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });

    return superagent
      .post(`${base_url}login`)
      .send(data)
      .set("accept", "application/json")
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            actions.resetForm({});
            const token = "Bearer " + res.body.token;
            cookie.set("user_token", token, {
              path: "/",
              expires: new Date(Date.now() + (3600 * 1000 * 24)),
            });
            cookie.set("user_info", res.body.user_info, {
              path: "/",
              expires: new Date(Date.now() + (3600 * 1000 * 24)),
            });
            const user_info = JSON.parse(res.body.user_info);
            if (user_info?.is_complete === "0") {
              history.push("/account-complete");
            }
            if (modal) {
              modal(false);
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

export const logoutAction = (history) => (dispatch) => {
  return superagent
    .post(`${base_url}logout`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          cookie.remove("user_token", {
            path: "/",
            expires: new Date(Date.now() + (3600 * 1000 * 24)),
          });
          cookie.remove("user_info", {
            path: "/",
            expires: new Date(Date.now() + (3600 * 1000 * 24)),
          });
          history.push("/");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
