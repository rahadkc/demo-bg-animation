import { combineReducers } from "redux";
import faqReducer from "../../components/insurance/faq/reducers";
import transitionReducers from "../../components/transition/reducer";
import accountReducers from "../../containers/account/reducers";
import adminReducers from "../../containers/admin/dashboard/reducers";
import cmsReducers from "../../containers/App/reducers";
import homeReducers from "../../containers/home/reducers";
import insuranceReducer from "../../containers/reduxinsurance/reducers";
import resourceReducers from "../../containers/resources/reducers";
import featureReducers from "../../containers/upcomingFeatured/reducers";
import metaReducer from "./metaReducer";
const rootReducer = combineReducers({
  meta: metaReducer,
  my_account: accountReducers,
  insurancereducer: insuranceReducer,
  admin: adminReducers,
  resources: resourceReducers,
  faqs: faqReducer,
  feature: featureReducers,
  home: homeReducers,
  cms: cmsReducers,
  anim: transitionReducers
});
export default rootReducer;