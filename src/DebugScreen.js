import React from 'react';
import './App.css';

// require('dotenv').config({ path: './.env' });

const PAYMENT_SERVER_CHECKOUT = process.env.REACT_APP_CNY_PAYMENT_DOMAIN + "/create-checkout-session";

class DebugScreen extends React.Component {
  constructor(prop) {
    super(prop)
    // let props = prop.props;
    // console.log("DEBUG PROPS:", props)
    console.log("DEBUG PROPS:", process.env)

    this.state = {
      req:
      {
        lookup_key: '4172626761-fet-2022-02-16',
        user_custid: '1',
        user_email: 'rms4home@gmail.com',
        user_phone: '4172626761',
        user_name: 'Randall Sanborn',
        product_treatment: 'fet',
        product_total: '2995',
        product_balance: '0',
        product_grandTotal: '2995',
        product_downpayment: '748.75',
        product_financeamt: '2246.25',
        product_numpay: '12',
        product_monthlypayment: '187.19'
      }
    }

  }

  handleSubmit = event => {
    console.log("SUBMITTING...")
    console.log(this.state)

    return true;
  }

  render() {
    return (
      <React.Fragment>
        <section id="VUEtreatmentCalc" data-adminurl="https://www.cnyfertility.com/wp-admin/admin-ajax.php"
          data-treatments="1" data-filters="1" data-security="98ca9ae8e0"
          className="VUEtreatmentCalc block__affording--plan gt__affording-calc ">
          <div className="text-left treatment__head container">
            <h5 className="section-title">Confirmation</h5>
          </div>
          <div id="block__treatment--wrap" className="block__treatment--wrap container">

            {/* <Receipt props={this.state} /> */}
            <div id="block__treatment--right-content" className="right-content">
              <div id="VUEpriceCalc" className="white-card">
                <h5>Debug: Monthly Billing Summary</h5>
                <h5 className="payment-calc-method--title">Payment method</h5>
                <div className="payment-calc-method--btns">
                  {/* <a href="#calc" onClick={this.nextButton} className="button is-outline"> Continue with Financing </a> */}
                  {/* Add a hidden field with the lookup_key of your Price */}
                  <form onSubmit={this.handleSubmit} action={PAYMENT_SERVER_CHECKOUT} method="POST">
                    <label>lookup_key</label><input name="lookup_key" value={this.state.req.lookup_key} />
                    <label>user_custid</label><input name="user_custid" value={this.state.req.user_custid} />
                    <label>user_email</label><input name="user_email" value={this.state.req.user_email} />
                    <label>user_phone</label><input name="user_phone" value={this.state.req.user_phone} />
                    <label>user_name</label><input name="user_name" value={this.state.req.user_name} />
                    <label>product_treatment</label><input name="product_treatment" value={this.state.req.product_treatment} />
                    <label>product_total</label><input name="product_total" value={this.state.req.product_total} />
                    <label>product_balance</label><input name="product_balance" value={this.state.req.product_balance} />
                    <label>product_grandTotal</label><input name="product_grandTotal" value={this.state.req.product_grandTotal} />
                    <label>product_downpayment</label><input name="product_downpayment" value={this.state.req.product_downpayment} />
                    <label>product_downpayment</label><input name="product_financeamt" value={this.state.req.product_financeamt} />
                    <label>product_financeamt</label><input name="product_numpay" value={this.state.req.product_numpay} />
                    <label>product_numpay</label><input name="product_monthlypayment" value={this.state.req.product_monthlypayment} />
                    <button className="button is-outline" id="checkout-and-portal-button" type="submit">
                      Checkout
                    </button>
                  </form>
                </div>
              </div>
              <div className="footnote__calc-show-more"><button id="toggleCalcDetails" className="is-show"><span
                className="on-show">Show details</span> <span className="on-hide">Hide details</span>
                <svg width="13" height="8" xmlns="http://www.w3.org/2000/svg" className="droparrow">
                  <g stroke="#1970e2" strokeWidth="2" fill="none" fillRule="evenodd"
                    strokeLinecap="square">
                    <path d="M1.439 1.439l4.978 4.978M11.561 1.439L6.583 6.417"></path>
                  </g>
                </svg></button></div>
              <div className="footnote">
                <p> The above calculation is for dubugging purposes only.  </p>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment >
    );
  }
}

export default DebugScreen;
