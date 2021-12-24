import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";
const cookie = new Cookies();

export const applyForPlan = (data) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .get(`${base_url}apply-for-plan`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};
