import React from "react";
import {Route, Switch} from "react-router-dom";
// public
import PageNotFound from "../404";
import MyAccount from "../account";
import PremiumMyAccount from "../account/PremiumMyAccount";
import FounderMyAccount from "../account/FounderMyAccount";
import UpgradeBasicToPremium from "../accountUpgrade/basicToPremium";
import UpgradeBasicToFounder from "../accountUpgrade/basicToFounder";
import UpgradePremiumToFounder from "../accountUpgrade/premiumToFounder";
import Discourse from "../discourse";
import AccountComplete from "../accountComplete";
import AddNewFeatures from "../admin/addNewFeatures";
import AddNewResource from "../admin/addNewResource";
import AddNewInsurance from "../admin/addNewInsurance";
import AddNewUser from "../admin/addNewUser";
// admin
import BlackList from "../admin/blacklist";
import BlackListDetails from "../admin/blacklistDetails";
import Categories from "../admin/categories";
import Dashboard from "../admin/dashboard";
import EditResource from "../admin/editResource";
import PagesList from "../admin/pages";
import EditCommunityCMS from "../admin/pages/community";
import EditHome from "../admin/pages/editHome";
import EditPrivacyCMS from "../admin/pages/privacy";
import EditInsuranceCMS from "../admin/pages/insurance";
import EditSingleInsuranceCMS from "../admin/pages/singleinsurance";
import EditResourceCMS from "../admin/pages/resource";
import EditTermsCMS from "../admin/pages/trems";
import UpcomingFeatureCMS from "../admin/pages/upcomingFeature";
import ResourceList from "../admin/resourceList";
import UpcomingFeature from "../admin/upcomingFeature";
import UpdateNewFeatures from "../admin/updateNewFeatures";
import UserDetails from "../admin/userDetails";
import UserList from "../admin/userlist";
import AdminLogin from "../adminLogin";
import Community from "../community";
import ConfirmEmail from "../confirmEmail";
import CancelAccount from "../cancelAccount";
import ContactUs from "../contactUs";
import ForgetPassword from "../forgetPassword";
import ForgetPasswordConfirmEmail from "../forgetPasswordConfirmEmail";
import ApplyForPlan from "../applyForPlan";
import HomePage from "../home";
import Login from "../login";
import PrivacyPolicy from "../privacyPolicy";
import ReportAProblem from "../reportAProblem";
import RequestAFeature from "../requestAFeature";
import ResetPassword from "../resetPassword";
import Resources from "../resources";
import ResourcesTemplate from "../resourcesTemplate";
import Signup from "../signup";
import Success from "../success";
import SuccessMessage from "../successProud";
import TermsOfService from "../termsOfService";
import UpcomingFeatured from "../upcomingFeatured";
import Pricing from "../pricing";
import SelectInsurance from "../selectinsurance";
import HowItWorks from "../howitworks";
import WhatYouWillNeed from "../requiredthings";
import Insurance from "../insurance";
import AdminRoute from "./_admin";
import PublicRoute from "./_public";

// redux
import {useSelector} from "react-redux";
import SingleInsurance from "../SingleInsurance";
import InsuranceList from "../admin/insurancelist";
import PlanList from "../admin/insuranceplanlist";
import SubscriptionList from "../admin/subscriptionlist";
import addNewPlan from "../admin/addNewPlan";
import UpdateInsurance from "../admin/updateInsurance";
import UpdatePlan from "../admin/updatePlan";
import FaqList from "../admin/faqlist";
import AddNewFaq from "../admin/addNewFaq";
import UpdateFaq from "../admin/updateFaq";
import EditHowItWorks from "../admin/pages/howitworks";

const Routes = () => {
  const user_info = useSelector((state) => state.my_account.user_info);
  return (
    <Switch>
      <PublicRoute component={HomePage} path="/" exact/>
      <PublicRoute component={Pricing} path="/membership" exact/>
      <PublicRoute
        component={UpcomingFeatured}
        path="/upcoming-features"
        exact
      />
      <PublicRoute
        component={SingleInsurance}
        path="/insurance/:insurance_slug"
        exact
      />
      <PublicRoute component={Insurance} path="/insurance" exact/>
      <PublicRoute component={HowItWorks} path="/how-it-works" exact/>
      <PublicRoute
        component={WhatYouWillNeed}
        path="/what-you-will-need"
        exact
      />
      <PublicRoute
        component={RequestAFeature}
        path="/request-a-feature"
        exact
      />
      <PublicRoute component={SelectInsurance} path="/select-insurance" exact/>
      <PublicRoute component={ReportAProblem} path="/report-a-problem" exact/>
      <PublicRoute component={ContactUs} path="/contact-us" exact/>

      {user_info?.subscription_type === "PREMIUM" ? (
        <PublicRoute component={PremiumMyAccount} path="/my-account" exact/>
      ) : user_info?.subscription_type === "FOUNDER" ? (
        <PublicRoute component={FounderMyAccount} path="/my-account" exact/>
      ) : (
        <PublicRoute component={MyAccount} path="/my-account" exact/>
      )}

      <PublicRoute component={Discourse} path="/discourse/sso" exact/>
      <PublicRoute component={TermsOfService} path="/terms-of-service" exact/>
      <PublicRoute component={PrivacyPolicy} path="/privacy-policy" exact/>
      <PublicRoute component={SuccessMessage} path="/success-message" exact/>
      <PublicRoute component={Resources} path="/resources" exact/>
      <PublicRoute component={Login} path="/login" exact/>
      <PublicRoute component={AdminLogin} path="/admin" exact/>
      <PublicRoute component={Signup} path="/signup" exact/>

      <PublicRoute component={CancelAccount} path="/cancel-account" exact/>

      <PublicRoute component={UpgradeBasicToPremium} path="/account-upgrade/basic-premium" exact/>
      <PublicRoute component={UpgradeBasicToFounder} path="/account-upgrade/basic-founder" exact/>
      <PublicRoute component={UpgradePremiumToFounder} path="/account-upgrade/premium-founder" exact/>

      <PublicRoute component={ConfirmEmail} path="/confirm-email" exact/>
      <PublicRoute component={ForgetPassword} path="/forget-password" exact/>
      <PublicRoute
        component={ApplyForPlan}
        path="/apply-for-plan"
        exact
      />
      <PublicRoute
        component={ForgetPasswordConfirmEmail}
        path="/forget-password-confirm-email"
        exact
      />
      <PublicRoute component={ResetPassword} path="/reset-password" exact/>
      <PublicRoute component={Success} path="/success" exact/>
      <PublicRoute component={Community} path="/community" exact/>
      <PublicRoute
        component={ResourcesTemplate}
        path="/resources/:id/:slug"
        exact
      />
      <PublicRoute
        component={AccountComplete}
        path="/account-complete"
        exact
      />
      <AdminRoute component={BlackList} path="/admin/blacklist" exact/>
      <AdminRoute
        component={BlackListDetails}
        path="/admin/blacklist/:id/:slug"
        exact
      />
      <AdminRoute component={Dashboard} path="/admin/dashboard" exact/>
      <AdminRoute component={UserList} path="/admin/users" exact/>
      <AdminRoute component={AddNewUser} path="/admin/add-new-user" exact/>
      <AdminRoute component={UserDetails} path="/admin/users/:id/:slug" exact/>
      <AdminRoute component={ResourceList} path="/admin/resources" exact/>

      <AdminRoute component={FaqList} path="/admin/insurances/faqs" exact/>
      <AdminRoute
        component={AddNewFaq}
        path="/admin/insurances/faqs/add-new-faq"
        exact
      />
      <AdminRoute
        component={UpdateFaq}
        path="/admin/insurances/faqs/:faq_id/update"
        exact
      />

      <AdminRoute component={InsuranceList} path="/admin/insurances" exact/>
      <AdminRoute
        component={AddNewInsurance}
        path="/admin/insurances/add-new-insurance"
        exact
      />
      <AdminRoute
        component={UpdateInsurance}
        path="/admin/insurance/:insurance_id/update"
        exact
      />
      <AdminRoute
        component={PlanList}
        path="/admin/insurance/:insurance_id/plans"
        exact
      />
      <AdminRoute
        component={addNewPlan}
        path="/admin/insurance/:insurance_id/add-new-plan"
        exact
      />
      <AdminRoute
        component={UpdatePlan}
        path="/admin/insurance/:insurance_id/plan/:plan_id/update"
        exact
      />
      <AdminRoute
        component={SubscriptionList}
        path="/admin/insurance/:insurance_id/plan/:plan_id/subscriptions"
        exact
      />

      <AdminRoute
        component={AddNewResource}
        path="/admin/add-new-resource"
        exact
      />

      <AdminRoute
        component={EditResource}
        path="/admin/resources/:id/:slug"
        exact
      />
      <AdminRoute component={Categories} path="/admin/categories" exact/>
      <AdminRoute
        component={UpcomingFeature}
        path="/admin/upcoming-features"
        exact
      />
      <AdminRoute component={AddNewFeatures} path="/admin/add-feature" exact/>
      <AdminRoute
        component={UpdateNewFeatures}
        path="/admin/upcoming-features/:id/:slug"
        exact
      />
      <AdminRoute component={PagesList} path="/admin/pages" exact/>
      <AdminRoute component={EditHome} path="/admin/pages/home" exact/>
      <AdminRoute
        component={EditResourceCMS}
        path="/admin/pages/resources"
        exact
      />
      <AdminRoute
        component={UpcomingFeatureCMS}
        path="/admin/pages/upcoming-features"
        exact
      />
      <AdminRoute
        component={EditCommunityCMS}
        path="/admin/pages/community"
        exact
      />
      <AdminRoute component={EditTermsCMS} path="/admin/pages/terms" exact/>
      <AdminRoute
        component={EditPrivacyCMS}
        path="/admin/pages/privacy-policy"
        exact
      />

      <AdminRoute
        component={EditInsuranceCMS}
        path="/admin/pages/insurance"
        exact
      />

      <AdminRoute
        component={EditSingleInsuranceCMS}
        path="/admin/insurances/:insurance_slug"
        exact
      />

      <AdminRoute
        component={EditHowItWorks}
        path="/admin/pages/how-it-works"
        exact
      />

      <Route component={PageNotFound} exact/>
    </Switch>
  );
};
export default Routes;
