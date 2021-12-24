import { RE_RENDERED, THROW_ERROR, THROW_SUCCESS } from "../constants";

export const throwErrorAction = (payload) => (dispatch) => {
  dispatch({
    type: THROW_ERROR,
    payload,
  });
};

export const throwSuccessAction = (payload) => (dispatch) => {
  dispatch({
    type: THROW_SUCCESS,
    payload,
  });
};

export const reRenderedAction = (payload) => (dispatch) => {
  dispatch({
    type: RE_RENDERED,
    payload,
  });
};
