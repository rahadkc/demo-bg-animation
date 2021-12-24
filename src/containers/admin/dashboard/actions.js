import superagent from "superagent";
import Cookies from "universal-cookie";
import {
  IS_LOADING,
  THROW_ERROR,
  THROW_SUCCESS,
} from "../../../store/constants";
import { base_url } from "../../../utils/constants";
import { getRequest } from "../../../utils/request";
import {
  GET_ALL_BLACKLIST_DATA,
  GET_ALL_INSURANCES,
  GET_ALL_IP_LIST,
  GET_ALL_PAGES_DATA,
  GET_ALL_PLANS_BY_ID,
  GET_ALL_USERS_LIST,
  GET_CATEGORY_LIST_DATA,
  GET_FAQ_DETAILS,
  GET_FAQS,
  GET_FEATURE_DETAILS_DATA,
  GET_FEATURE_LIST_DATA,
  GET_INSURANCE_BY_ID,
  GET_INSURANCE_CMS_DATA,
  GET_PALN_DETAILS,
  GET_RESOURCE_DETAILS_DATA,
  GET_RESOURCE_LIST_DATA,
  GET_SUBSCRIPTION_DETAILS,
  GET_SUBSCRIPTIONS_BY_ID,
  GET_USER_DETAILS,
} from "./constants";

const cookie = new Cookies();

export const getAllUsersDataAction = (data) => (dispatch) => {
  getRequest("admin/user-list", data, dispatch, GET_ALL_USERS_LIST);
};
export const getDetailsAction = (slug, data) => (dispatch) => {
  getRequest(`admin/single-user?id=${slug}`, data, dispatch, GET_USER_DETAILS);
};

export const updateSingleUser = (data, slug) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/single-user-update/${slug}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `admin/single-user?id=${slug}`,
            data,
            dispatch,
            GET_USER_DETAILS
          );
          // modal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const deleteSingleUserAction = (slug, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/account-delete/${slug}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/user-list", null, dispatch, GET_ALL_USERS_LIST);
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

export const addBlockListSingleUser = (data, history, modal) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/blacklist-add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/user-list", null, dispatch, GET_ALL_USERS_LIST);
          getRequest("admin/blacklist", null, dispatch, GET_ALL_BLACKLIST_DATA);

          if (history) {
            history.push("/admin/users");
          }
          modal(false);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getAllBlacklistDataAction = (data) => (dispatch) => {
  getRequest("admin/blacklist", data, dispatch, GET_ALL_BLACKLIST_DATA);
};

export const getAllIpListDataAction = (data) => (dispatch) => {
  getRequest("admin/ip-list-without-banned", data, dispatch, GET_ALL_IP_LIST);
};

export const addNewUserAction = (data, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/user/add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/user-list", null, dispatch, GET_ALL_USERS_LIST);
          if (history) {
            history.push("/admin/users");
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

export const getResourceListAction = (data) => (dispatch) => {
  getRequest("admin/resource", data, dispatch, GET_RESOURCE_LIST_DATA);
};

export const getResourceDetailsAction = (id, data) => (dispatch) => {
  getRequest(`resource/${id}`, data, dispatch, GET_RESOURCE_DETAILS_DATA);
};
export const addNewResourceAction = (data, history, actions) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/resource/add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/resource", null, dispatch, GET_RESOURCE_LIST_DATA);
          if (history) {
            history.push("/admin/resources");
          }
          if (actions) {
            actions.resetForm({});
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
export const updateResourceAction = (data, id, modal) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/resource-edit/${id}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `resource/${id}`,
            null,
            dispatch,
            GET_RESOURCE_DETAILS_DATA
          );
          if (modal) {
            modal(false);
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

export const deleteResourceAction = (id) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/resource-delete/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/resource", null, dispatch, GET_RESOURCE_LIST_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const getCategoriesListAction = (data) => (dispatch) => {
  getRequest("admin/category", data, dispatch, GET_CATEGORY_LIST_DATA);
};

export const deleteCategoryAction = (id) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/category/delete/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("category", null, dispatch, GET_CATEGORY_LIST_DATA);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const addNewCategoryAction = (data, actions, modal) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/category/add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("category", null, dispatch, GET_CATEGORY_LIST_DATA);

          if (actions) {
            actions.resetForm({});
          }
          if (modal) {
            modal(false);
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

export const updateCategoryAction =
  (data, actions, modal, id) => (dispatch) => {
    return superagent
      .post(`${base_url}admin/category/update/${id}`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest("category", null, dispatch, GET_CATEGORY_LIST_DATA);

            if (actions) {
              actions.resetForm({});
            }
            if (modal) {
              modal(false);
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

export const getFeatureListAction = (data) => (dispatch) => {
  getRequest("admin/upcoming-feature", data, dispatch, GET_FEATURE_LIST_DATA);
};

export const getFeatureDetailsAction = (id, data) => (dispatch) => {
  getRequest(
    `admin/upcoming-feature/${id}`,
    data,
    dispatch,
    GET_FEATURE_DETAILS_DATA
  );
};

export const addNewFeatureAction = (data, history, actions) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/upcoming-feature/add`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            "admin/upcoming-feature",
            null,
            dispatch,
            GET_FEATURE_LIST_DATA
          );
          if (history) {
            history.push("/admin/upcoming-features");
          }
          if (actions) {
            actions.resetForm({});
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

export const deleteFeatureAction = (id) => (dispatch) => {
  return superagent
    .post(`${base_url}admin/upcoming-feature/delete/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.body.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            "admin/upcoming-feature",
            null,
            dispatch,
            GET_FEATURE_LIST_DATA
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const updateFeatureAction =
  (data, id, removeEdit, setEditView, setEditViewImage) => (dispatch) => {
    return superagent
      .post(`${base_url}admin/upcoming-feature/update/${id}`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.body.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            getRequest(
              `admin/upcoming-feature/${id}`,
              data,
              dispatch,
              GET_FEATURE_DETAILS_DATA
            );
            removeEdit(false);
            setEditView(false);
            setEditViewImage(false);
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };
export const getPagesListAction = (data) => (dispatch) => {
  getRequest(`admin/cms`, data, dispatch, GET_ALL_PAGES_DATA);
};

// subscriptions calls goes here
export const addNewSubscription = (data, plan_id, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}insurance/plan/add-subscription`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          if (history) {
            history.goBack();
          }
          getRequest(
            `insurances/plans/${plan_id}/subscriptions`,
            null,
            dispatch,
            GET_SUBSCRIPTIONS_BY_ID
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
        dispatch({ type: IS_LOADING, payload: false });
      }
    });
};

export const getSubscriptionListByPlanId =
  (slug, search = "", data) =>
  (dispatch) => {
    getRequest(
      `insurances/plans/${slug}/subscriptions${search}`,
      data,
      dispatch,
      GET_SUBSCRIPTIONS_BY_ID
    );
  };

export const getSubscriptionDetails = (id, data) => (dispatch) => {
  getRequest(
    `ins-subscription/${id}`,
    data,
    dispatch,
    GET_SUBSCRIPTION_DETAILS
  );
};

export const updateSubscription =
  (data, subscription_id, plan_id, history) => (dispatch) => {
    dispatch({ type: IS_LOADING, payload: true });
    return superagent
      .post(`${base_url}subscription/${subscription_id}`)
      .send(data)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end((err, res) => {
        if (res) {
          if (res.status) {
            dispatch({ type: THROW_SUCCESS, payload: res.body.message });
            if (history) {
              history.goBack();
            }
            getRequest(
              `insurances/plans/${plan_id}/subscriptions`,
              data,
              dispatch,
              GET_SUBSCRIPTIONS_BY_ID
            );
          } else {
            dispatch({ type: THROW_ERROR, payload: res.body.message });
          }
        } else {
          dispatch({ type: THROW_ERROR, payload: err.data.message });
          dispatch({ type: IS_LOADING, payload: false });
        }
      });
  };

export const deleteSubscription = (id, plan_id) => (dispatch) => {
  return superagent
    .delete(`${base_url}subscription/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `insurances/plans/${plan_id}/subscriptions`,
            null,
            dispatch,
            GET_SUBSCRIPTIONS_BY_ID
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

// plans calls goes here
export const addNewPlan = (data, insurance_id, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}add-plan`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `insurances/${insurance_id}/plans`,
            null,
            dispatch,
            GET_ALL_PLANS_BY_ID
          );
          if (history) {
            history.goBack();
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

export const getPlansByInsuranceId =
  (id, search = "", data) =>
  (dispatch) => {
    getRequest(
      `insurances/${id}/plans${search}`,
      data,
      dispatch,
      GET_ALL_PLANS_BY_ID
    );
  };

export const getPlansBySearch = (id, search, data) => (dispatch) => {
  getRequest(
    `insurances/${id}/plans?${search}`,
    data,
    dispatch,
    GET_ALL_PLANS_BY_ID
  );
};

export const getPlanDetails = (id, data) => (dispatch) => {
  getRequest(`plan/${id}`, data, dispatch, GET_PALN_DETAILS);
};

export const updatePlan = (data, id, insurance_id, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}plan/${id}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `insurances/${insurance_id}/plans`,
            data,
            dispatch,
            GET_ALL_PLANS_BY_ID
          );
          if (history) {
            history.goBack();
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

export const deletePlan = (id, insurance_id) => (dispatch) => {
  return superagent
    .delete(`${base_url}plan/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(
            `insurances/${insurance_id}/plans`,
            null,
            dispatch,
            GET_ALL_PLANS_BY_ID
          );
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

// insurance calls goes here

export const getInsuranceListAction = (data) => (dispatch) => {
  getRequest("insurances", data, dispatch, GET_ALL_INSURANCES);
};
export const getAdminInsuranceListAction = (data) => (dispatch) => {
  dispatch({
    type: "GET_INSURANCE_DETAILS",
    payload: {
      data: {},
    },
  });
  getRequest("admin/insurances", data, dispatch, GET_ALL_INSURANCES);
};

export const getInsuranceById = (slug, data) => (dispatch) => {
  getRequest(`admin/insurance/${slug}`, data, dispatch, GET_INSURANCE_BY_ID);
};

export const addNewInsurance = (data, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/insurances`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/insurances", null, dispatch, GET_ALL_INSURANCES);
          if (history) {
            history.goBack();
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

export const updateInsurance = (data, id, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}insurance/${id}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest(`admin/insurances`, data, dispatch, GET_ALL_INSURANCES);
          if (history) {
            history.push("/admin/insurances");
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

export const deleteInsuranceAction = (slug) => (dispatch) => {
  return superagent
    .delete(`${base_url}admin/insurances/${slug}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("admin/insurances", null, dispatch, GET_ALL_INSURANCES);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

// FAQ API calls goes here

export const getFAQs = (data) => (dispatch) => {
  getRequest("insurance-faq", data, dispatch, GET_FAQS);
};

export const addNewFaq = (data, history) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/create-ins-faq`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("insurance-faq", null, dispatch, GET_FAQS);
          if (history) {
            history.goBack();
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

export const updateFaq = (data, history, faq_id) => (dispatch) => {
  dispatch({ type: IS_LOADING, payload: true });
  return superagent
    .post(`${base_url}admin/update-ins-faq/${faq_id}`)
    .send(data)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("insurance-faq", null, dispatch, GET_FAQS);
          if (history) {
            history.goBack();
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

export const deleteFAQ = (id) => (dispatch) => {
  return superagent
    .delete(`${base_url}admin/delete-ins-faq/${id}`)
    .set("accept", "application/json")
    .set("Authorization", cookie.get("user_token"))
    .end((err, res) => {
      if (res) {
        if (res.status) {
          dispatch({ type: THROW_SUCCESS, payload: res.body.message });
          getRequest("insurance-faq", null, dispatch, GET_FAQS);
        } else {
          dispatch({ type: THROW_ERROR, payload: res.body.message });
        }
      } else {
        dispatch({ type: THROW_ERROR, payload: err.data.message });
      }
    });
};

export const getFaqById = (id, data) => (dispatch) => {
  getRequest(`admin/view-ins-faq/${id}`, data, dispatch, GET_FAQ_DETAILS);
};

export const getInsuranceCMSData = (id, data) => (dispatch) => {
  getRequest(`insurance-cms`, data, dispatch, GET_INSURANCE_CMS_DATA);
};
