import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR } from "../../store/constants";
import { base_url } from "../../utils/constants";
const cookie = new Cookies();

export const requestFeatureAction =
  (data, actions, setFiles, success) => (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    let formImage = new FormData();
    formImage.append("idea", data.idea);
    formImage.append("title", data.title);
    formImage.append("description", data.description);
    for (let i = 0; i < data.image.length; i++) {
      formImage.append(`image[]`, data.image[i], data.image[i].name);
    }
    return superagent
      .post(`${base_url}request-a-feature`)
      .send(formImage)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))

      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            actions.resetForm({});
            setFiles([]);
            success(true);
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
