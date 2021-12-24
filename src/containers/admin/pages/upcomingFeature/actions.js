import superagent from "superagent";
import Cookies from "universal-cookie";
import {
  IS_LOADING,
  THROW_ERROR,
  THROW_SUCCESS,
} from "../../../../store/constants";
import { base_url } from "../../../../utils/constants";
import { getRequest } from "../../../../utils/request";
import { GET_UPCOMING_FEATURE_CMS_DATA } from "../../../App/constants";

const cookie = new Cookies();

export const addUpcomingCMSDataAction = (data, editView) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/upcoming-feature-cms/add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `upcoming-feature-cms`,
            data,
            dispatch,
            GET_UPCOMING_FEATURE_CMS_DATA
          );
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
