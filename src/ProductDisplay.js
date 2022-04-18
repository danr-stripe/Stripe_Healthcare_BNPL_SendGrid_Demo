import React from 'react';
// import Receipt from './Receipt';
// import Logo from './Logo';
// import ProcedureTypes from './ProcedureTypes';
import './App.css';

import { BallTriangle } from 'react-loader-spinner'

// require('dotenv').config({ path: './.env' });

const PAYMENT_SERVER_CHECKOUT = "/create-checkout-session";

class ProductDisplay extends React.Component {
  constructor(prop) {
    super(prop)
    let props = prop.props;
    // console.log("PRODUCT PROPS:", props)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    let refId = props.selected.custid + '-' + props.selected.treatment + '-' + today;

    // this.onComplete = props.onComplete;
    // this.handleChange = props.handleChange;
    // this.nextButton = props.nextButton;
    // console.log("REF ID", refId)

    this.state = {
      checkedOut: false,
      product:
      {
        referenceId: refId,
        info: props.selected,
        costs: props.totalcosts
      }
    }

    // this.handleSubmit = this.handleSubmit.bind(this);
    // console.log("PRODUCT DISPLAY", this.state)
  }


  handleSubmit = event => {
    // event.preventDefault();
    // this.setState({ checkedOut: true })
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
            <div id="block__treatment--left-content" className="left-content">
              <div className="hide-on-blog">
                <div>
                  <p>Please confirm the details on this page.  Once initial payment has been accepted, reoccuring payments will be sent to the email on record automatically on a monthy basis.   Upon withdrawl of the first payment a binding agreement has been entered based on the terms of your plan.</p>
                </div>
              </div>
              <div className="details">
                <h5 className="section-title">Patient Information</h5>
                <ul className="tick-list">

                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Patient</h6>
                    <div><label>{this.state.product.info.lname}</label></div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Patient ID</h6>
                    <div><label>{this.state.product.info.custid}</label></div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Treatment</h6>
                    <div><label>{this.state.product.info.treatment}</label></div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Contract length (in months)</h6>
                    <div><label>{this.state.product.costs.numpay} months</label></div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Down Payment</h6>
                    <div><label>$ {this.state.product.costs.downpayment}</label></div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Custom Payment Plan Identifier</h6>
                    <div><label>{this.state.product.referenceId}</label></div>
                  </li>
                </ul>
              </div>

            </div>
            {/* <Receipt props={this.state} /> */}
            <div id="block__treatment--right-content" className="right-content">
              <div id="VUEpriceCalc" className="white-card">
                <h5>Sample Payment Calculator: Monthly Billing Summary</h5>
                <ul className="payment-calc is-minify">
                  {/* {(this.state.info.treatment) ? (
                    <li className="detail__treatment detail__item"
                      style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                      <div className="payment-calc--item item-treatment">
                        <table className="payment-calc--table">
                          <tbody>
                            <tr>
                              <td rowSpan="2" style={{ width: '80px' }}><noscript><img
                                src="./CNYWeb/IVF.svg"
                                alt="In Vitro Fertilization"
                                className="item--detail--icon" /></noscript><img
                                  src="./CNYWeb/IVF.svg"
                                  alt="In Vitro Fertilization"
                                  className="item--detail--icon ls-is-cached lazyloaded" /></td>
                              <td><span className="item--label">{this.state.product.costs.downpayment} xxxx</span>
                                <span className="item--note"></span></td>
                              <td><span className="item--price item--price--cny">$ {this.state.info.treatment}yyyy</span>
                              </td>
                            </tr>
                            <tr>
                              <td><small className="item--note--avg">National Average.</small>
                              </td>
                              <td><small className=" item--price--others">${this.state.treatment.avg}</small></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>) : ''} */}
                  {/* {(this.state.treatment) ? (
                    <li className="detail__monitor detail__item">
                      <div className="payment-calc--item item--add item--add-on">
                        <table className="payment-calc--table">
                          <tbody>

                            <tr className="row-cny">
                              <td>+</td>
                              <td><span className="item--label">In House Monitoring</span></td>
                              <td><span className="item--price item--price--cny">$995</span></td>
                            </tr>
                            <tr className="row-national">
                              <td></td>
                              <td><small className="item--note--avg">National Average.</small>
                              </td>
                              <td><small className="item--price--others">$2000</small></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </li>) : ''} */}


                  {/* <li className="detail__ivf-fet detail__item" style={{ height: '0px' }}>
                    <div className="payment-calc--item item--add item--add-on">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr className="row-cny">
                            <td>+</td>
                            <td><span className="item--label">IVF FET </span></td>
                            <td><span className="item--price item--price--cny">$</span></td>
                          </tr>
                          <tr className="row-national">
                            <td></td>
                            <td><small className="item--note--avg">National Average.</small>
                            </td>
                            <td><small className=" item--price--others">$</small></td>
                          </tr>
                          <tr className="row-third-party">
                            <td>+</td>
                            <td><small className="item--note--third">Third Party </small></td>
                            <td><small className=" item--price--third">$</small></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li> */}
                  <li className="detail__total">
                    <div className="payment-calc--item item--total item--total-total">
                      <div className="item--row">
                        <div className="item--detail"><span>New Treatment</span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span className="item--price--cny">${this.state.product.costs.total}</span>
                        </div>
                      </div>
                      <div className="item--row">
                        <div className="item--detail"><span>Rollover Amount</span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span className="item--price--cny">$ {this.state.product.costs.balance}</span>
                        </div>
                      </div>
                      <div className="item--row">
                        <div className="item--detail item--grandtotal"><span
                          className="item--total-label">Grand Total</span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span
                          className="item--price--grandtotal">${this.state.product.costs.grandTotal}</span></div>
                      </div>
                    </div>
                  </li>
                  <li className="detail__zymotSperm detail__item">
                    <div className="payment-calc--item item--add item--add-on">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr className="row-cny">
                            <td>-</td>
                            <td><span className="item--label">Initial Payment</span></td>
                            <td><span className="item--price item--price--cny">$ {this.state.product.costs.downpayment}</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="detail__total">
                    <div className="payment-calc--item item--total item--total-total">
                      <div className="item--row">
                        <div className="item--detail"><span>Amount to Finance</span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span className="item--price--cny">$ {this.state.product.costs.financeamt}</span>
                        </div>
                      </div>
                      <div className="item--row">
                        <div className="item--detail"><span><small> Contract Length
                          Costs</small></span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span><small
                          className="item--price--third-party">{this.state.product.costs.numpay}</small></span></div>
                      </div>
                      <div className="item--row">
                        <div className="item--detail item--grandtotal"><span
                          className="item--total-label">Monthly Payment</span>
                          <div className="v-tooltip">
                            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
                              width="12" height="12" viewBox="0 0 24 24">
                              <path
                                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                              </path>
                            </svg></div>
                          </div>
                        </div>
                        <div className="item--price"><span
                          className="item--price--grandtotal">$ {this.state.product.costs.monthlypayment}</span></div>
                      </div>
                      <div className="item--row">
                        <div className="item--detail"><span
                          className="item--total-label"><small>First Payment:
                          </small></span></div>
                        <div className="item--price"><span><small
                          className="item--price--national">July 1, 2022</small></span></div>
                      </div>
                    </div>
                  </li>
                </ul>
                <h5 className="payment-calc-method--title">Payment method</h5>
                {(this.state.checkedOut) ?
                  (
                    <div className="payment-calc-method--btns">
                      <BallTriangle color="#00BFFF" height={80} width={80} />
                      {/* <a href="#calc" onClick={this.nextButton} className="button is-outline"> Continue with Financing </a> */}
                      {/* Add a hidden field with the lookup_key of your Price */}
                      <form onSubmit={this.handleSubmit} action={PAYMENT_SERVER_CHECKOUT} method="POST">
                        <input type="hidden" name="lookup_key" value={this.state.product.referenceId} />
                        <input type="hidden" name="user_custid" value={this.state.product.info.custid} />
                        <input type="hidden" name="user_email" value={this.state.product.info.email} />
                        <input type="hidden" name="user_phone" value={this.state.product.info.phone} />
                        <input type="hidden" name="user_name" value={this.state.product.info.lname} />
                        <input type="hidden" name="product_treatment" value={this.state.product.info.treatment} />
                        <input type="hidden" name="product_total" value={this.state.product.costs.total} />
                        <input type="hidden" name="product_balance" value={this.state.product.costs.balance} />
                        <input type="hidden" name="product_grandTotal" value={this.state.product.costs.grandTotal} />
                        <input type="hidden" name="product_downpayment" value={this.state.product.costs.downpayment} />
                        <input type="hidden" name="product_financeamt" value={this.state.product.costs.financeamt} />
                        <input type="hidden" name="product_numpay" value={this.state.product.costs.numpay} />
                        <input type="hidden" name="product_monthlypayment" value={this.state.product.costs.monthlypayment} />
                        <button className="button is-outline" disabled="true" id="checkout-and-portal-button" type="submit">
                          Checkout
                        </button>
                      </form>
                    </div>
                  )
                  :
                  (
                    <div className="payment-calc-method--btns">
                      {/* <a href="#calc" onClick={this.nextButton} className="button is-outline"> Continue with Financing </a> */}
                      {/* Add a hidden field with the lookup_key of your Price */}
                      <form onSubmit={this.handleSubmit} action="/create-checkout-session" method="POST">
                        <input type="hidden" name="lookup_key" value={this.state.product.referenceId} />
                        <input type="hidden" name="user_custid" value={this.state.product.info.custid} />
                        <input type="hidden" name="user_email" value={this.state.product.info.email} />
                        <input type="hidden" name="user_phone" value={this.state.product.info.phone} />
                        <input type="hidden" name="user_name" value={this.state.product.info.lname} />
                        <input type="hidden" name="product_treatment" value={this.state.product.info.treatment} />
                        <input type="hidden" name="product_total" value={this.state.product.costs.total} />
                        <input type="hidden" name="product_balance" value={this.state.product.costs.balance} />
                        <input type="hidden" name="product_grandTotal" value={this.state.product.costs.grandTotal} />
                        <input type="hidden" name="product_downpayment" value={this.state.product.costs.downpayment} />
                        <input type="hidden" name="product_financeamt" value={this.state.product.costs.financeamt} />
                        <input type="hidden" name="product_numpay" value={this.state.product.costs.numpay} />
                        <input type="hidden" name="product_monthlypayment" value={this.state.product.costs.monthlypayment} />
                        <button className="button is-outline" id="checkout-and-portal-button" type="submit">
                          Checkout
                        </button>
                      </form>
                    </div>
                  )}
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
                <p> The above calculation is for simulation purposes only. It is reflective of self-pay
                  pricing, includes highly variable estimates paid to CNY and third parties, and
                  national averages obtained through internal research, FertilityIQ, ASRM, and
                  Resolve. Billing through insurance will likely result in substantially different
                  fees. CNY Fertility does not warrant or guarantee any price for services conducted
                  or rendered by a third party and recommends everyone obtain written estimates from
                  any medical facility involved in your treatment as well as verification of coverage
                  from your insurance company prior to beginning treatment.</p>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment >

    );
  }
}

export default ProductDisplay;
