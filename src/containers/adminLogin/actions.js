import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
const cookie = new Cookies();

export const adminLoginAction = (data, actions, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}adb-login`)
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
          history.push("/admin/users");
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
