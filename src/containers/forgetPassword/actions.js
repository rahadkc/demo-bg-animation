import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
const cookie = new Cookies();

export const forgetPasswordAction =
  (data, actions, history, modal) => (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    return superagent
      .post(`${base_url}forget-password`)
      .send(data)
      .set("accept", "application/json")
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            if (actions) {
              actions.resetForm({});
            }
            if (history) {
              history.push("/forget-password-confirm-email");
            }
            cookie.set("forget_email", data);
            if (modal) {
              modal(false);
            }
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

export const resetPasswordAction = (data, actions, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}password-reset`)
    .send(data)
    .set("accept", "application/json")
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (actions) {
            actions.resetForm({});
          }
          if (history) {
            history.push("/login");
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
