import { Modal } from "reactstrap";
import { Field } from "formik";
import moment from "moment";
import TextInput from "../../../components/formfields/InputField.jsx";
import BirthdayTextInput from "../../../components/formfields/BirthdayInputField";
import crose from "../../../assets/images/icons/crose.svg";
import submit from "../../../assets/images/icons/submit.svg";
import cancel from "../../../assets/images/icons/cancel.svg";

export default function Publishlater({
  publishLaterModal,
  setPublishLaterModal,
  publishDateModal,
  setPublishDateModal,
  handleChange,
  later_date,
  handleBlur,
  publishDateSubmitOption,
  publishDateSubmitHandler,
  values,
  errors,
  dirty,
}) {
  return (
    <>
      <Modal
        isOpen={publishLaterModal}
        centered
        fade={false}
        onClosed={() => setPublishLaterModal(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span
          onClick={() => setPublishLaterModal(false)}
          className="signupCroseBtn"
        >
          <img src={crose} alt="crose" />
        </span>
        <div className="blackListModalWrap">
          <h2>Would you like to schedule this post?</h2>
          <p>
            This resource will publish on{" "}
            <strong>{moment(later_date).format("MM/DD/YYYY")}</strong> at
            <strong>{moment(later_date).format("h:mm A")}</strong> EST.
          </p>

          <ul className="modalBtns">
            <li>
              <button
                type="submit"
                onClick={() => publishDateSubmitHandler(values)}
                className="success"
              >
                Yes, Do It <img src={submit} alt="submit" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublishLaterModal(false)}
                type="button"
                className="error"
              >
                No, Don’t Do It <img src={cancel} alt="submit" />
              </button>
            </li>
          </ul>
        </div>
      </Modal>
      <Modal
        isOpen={publishDateModal}
        centered
        fade={false}
        onClosed={() => setPublishDateModal(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span
          onClick={() => setPublishDateModal(false)}
          className="signupCroseBtn"
        >
          <img src={crose} alt="crose" />
        </span>
        <div className="blackListModalWrap">
          <h2>Select Publish Date</h2>
          <p>
            Choose the date and time. Scheduling based on the Eastern Timezone.
          </p>
          <div className="row">
            <div className="col-sm-6 col-12">
              <Field
                name="later_date"
                component={BirthdayTextInput}
                // component={TextInput}
                value={values.later_date}
                onChange={handleChange}
                onBlur={handleBlur}
                className="editField"
                type="date"
                label="Select Date"
                min={new Date()}
              />
            </div>
            <div className="col-sm-6 col-12">
              <Field
                name="later_time"
                component={TextInput}
                value={values.later_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className="editField"
                type="time"
                label="Select Time"
              />
            </div>
          </div>
          <ul className="modalBtns">
            <li>
              <button
                type="button"
                onClick={() => publishDateSubmitOption(errors, dirty)}
                className="success"
              >
                Yes, Do It <img src={submit} alt="submit" />
              </button>
            </li>
            <li>
              <button
                onClick={() => setPublishDateModal(false)}
                type="button"
                className="error"
              >
                No, Don’t Do It <img src={cancel} alt="submit" />
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </>
  );
}
