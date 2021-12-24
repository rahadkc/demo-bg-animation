import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import {connect} from "react-redux";
import {getPaymentHistory} from "../../containers/account/actions";
import "./paymenthistory.scss";
import angleLeft from "../../assets/images/icons/angle-left.svg";
import angleRight from "../../assets/images/icons/angle-right.svg";
import moment from "moment";

const PaymentHistory = (props) => {
  const [shot, setShot] = useState(5);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    props.getPaymentHistory(`?paginate=${shot}`);
  }, []);

  const handleChangePaginate = (e) => {
    setShot(e.target.value);
    props.getPaymentHistory(`?paginate=${e.target.value}`);
  };

  const handleChange = (value) => {
    setSelected(value.selected);
    props.getPaymentHistory(`?paginate=${shot}&page=${value.selected + 1}`);
  };

  return (
    <div id="history">
      <div className="paymenthistory">
        <div className="paymenthistory_header">
          <p className="accountSubTitle">Payment History</p>
          <span>
            Billing Question? <a
            href="mailto:hello@claritycooperative.com?subject=I%20Have%20Questions%20About%20A%20Payment">Click Here.</a>
          </span>
        </div>
        {Object.keys(props?.paymenthistory).length > 0 ? (
          props?.paymenthistory?.data.length > 0 ? (
            <div className="paymenthistory__card">
              {props?.paymenthistory?.data?.map((transaction) => (
                <div className="paymenthistory__transaction">
                  <div>
                    <b>Transaction #</b>
                    <p> {String(transaction?.id).padStart(8, '0') || "__"}</p>
                  </div>
                  <div>
                    <b>Card #</b>
                    <p>**** **** **** {transaction?.card_number || "__"}</p>
                  </div>
                  <div>
                    <h3 className="subscription__title">
                      ${Number(transaction?.total_price).toFixed(2) || "97.00"}
                    </h3>
                    <p>
                      Made on {" "}
                      {moment(transaction?.created_at).format("MM/DD/YYYY") || "__"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="nohistoryfound">No payment history found!</p>
          )
        ) : null}

        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          {props?.paymenthistory?.total >
          props?.paymenthistory?.per_page && (
            <ReactPaginate
              containerClassName="paginationWrapper"
              pageCount={
                props?.paymenthistory?.total /
                props?.paymenthistory?.per_page
              }
              pageRangeDisplayed={props?.paymenthistory?.per_page}
              onPageChange={handleChange}
              nextLabel={<img src={angleRight} alt="right"/>}
              previousLabel={<img src={angleLeft} alt="left"/>}
              forcePage={selected}
            />
          )}
          <div className="shortingFilter">
            <select value={shot} onChange={handleChangePaginate}>
              <option value="5">Showing 5</option>
              <option value="10">Showing 10</option>
              <option value="25">Showing 25</option>
              <option value="50">Showing 50</option>
            </select>
            <span>out of {props?.paymenthistory?.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  paymenthistory: state.my_account.paymenthistory,
});

export default connect(mapStateToProps, {
  getPaymentHistory,
})(PaymentHistory);
