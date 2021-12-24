import superagent from "superagent";
import Cookies from "universal-cookie";
import { IS_LOADING, THROW_ERROR, THROW_SUCCESS } from "../../store/constants";
import { base_url } from "../../utils/constants";

const cookie = new Cookies();

export const finishSetupAction = (data, step, actions) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .post(`${base_url}account-complete`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          actions.resetForm({});
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          step.activeStep(step.currentStep + 1);
          step.nextStep();
          cookie.set("user_info", res.body.data, {
            path: "/",
            expires: new Date(Date.now() + 3600 * 1000 * 24),
          });
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const profileSetupAction = (data, step) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });

  return superagent
    .post(`${base_url}profile-setup`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          step.activeStep(step.currentStep + 1);
          step.nextStep();
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const uploadProfilePictureAction = (data, step) => (dispatch) => {
  let formImage = new FormData();

  formImage.append("photo", data.photo);

  return superagent
    .post(`${base_url}profile-picture`)
    .send(formImage)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          step.activeStep(step.currentStep + 1);
          step.nextStep();
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const memberProfileAction = (data, step) => (dispatch) => {
  return superagent
    .post(`${base_url}member-profile`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          step.setShowBasic(true);
          step.activeStep(step.currentStep + 1);
          step.nextStep();
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const accountVerifyAction =
  (id, token, expires, signature, secret_token, history) => (dispatch) => {
    return superagent
      .get(
        `${base_url}email/verify/${id}/${token}?expires=${expires}&signature=${signature}`
      )
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${secret_token}`)
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            if (history) {
              history.push("/membership");
            }
            const token = "Bearer " + secret_token;
            cookie.set("user_token", token, {
              path: "/",
              expires: new Date(Date.now() + 3600 * 1000 * 24),
            });
            cookie.set("user_info", res.body.data, {
              path: "/",
              expires: new Date(Date.now() + 3600 * 1000 * 24),
            });
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };
