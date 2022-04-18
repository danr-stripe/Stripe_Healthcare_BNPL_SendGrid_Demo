/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './App.css';

class UserInfo extends React.Component {
  constructor(props) {

    super(props)
    // console.log("Header PROPS:", props)

    this.onComplete = props.onComplete;
    this.handleChange = props.handleChange;
    this.nextButton = props.nextButton;

    this.state = {
      currentStep: 1,
      // Step 1 - Calculate
      procedure: '',
      downpay: 0,
      numpay: 0,
      // Step 2 - Name / email
      fname: '',
      lname: '',
      email: '',
      phone: '',
      // Step 3 - Payment Info
      paymeth: '',
      billst1: '',
      billst2: '',
      billcity: '',
      billstate: '',
      billzip: '',
      // Step 4 - Shipping Info
      shipst1: '',
      shipst2: '',
      shipcity: '',
      shipstate: '',
      shipzip: '',
      // NA
      // username: '',
      // password: '',
    }
  }


  render() {
    return (
      <React.Fragment>
        <link media="all"
          href="./CNYWeb/autoptimize_c5530e081320e040ef9bfacfaac3eaad.css"
          rel="stylesheet" />

        <section className="block__afording--start waypoint__block" data-name="PRICES"
          data-icon="https://www.cnyfertility.com/wp-content/uploads/2020/01/affording_1.svg">
          <div className="container">
            <div className="head">
              <h5>Treatment Pricing</h5> <a className="anchorPoint" name="fertility-treatment-cost-payment-plans"></a>
              <h2> Fertility Treatment Cost &amp; Payment Plans</h2>
              <p>Self-pay pricing.</p>
            </div>
          </div>
        </section>
      </React.Fragment >

    );
  }
}

export default UserInfo;