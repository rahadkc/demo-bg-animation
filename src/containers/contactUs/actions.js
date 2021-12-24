import superagent from "superagent";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";

export const contactUsAction = (data, actions) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}contact-us`)
    .send(data)
    .set("accept", "application/json")
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          actions.resetForm({});
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
