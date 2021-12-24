import superagent from "superagent";
import Cookies from "universal-cookie";
import { base_url } from "../../utils/constants";

const cookie = new Cookies();

export const getDiscourseURL = (data, history) => () => {
  return superagent
    .post(`${base_url}discourse/sso`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res && res.body.url) {
        window.location = res.body.url;
      } else {
        history.push("/login");
      }
    });
};