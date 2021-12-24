import { getRequest } from "../../utils/request";
import { GET_HOME_PAGE_DATA } from "./constants";
export const getHomeDataAction = (data) => (dispatch) => {
  getRequest("home-cms", data, dispatch, GET_HOME_PAGE_DATA);
};
