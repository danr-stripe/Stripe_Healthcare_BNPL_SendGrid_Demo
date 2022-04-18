import React from 'react';
// import Receipt from './Receipt';
// import ProcedureTypes from './ProcedureTypes';
import './App.css';


class BillingMenu extends React.Component {
  constructor(prop) {
    super(prop)
    let props = prop.props;
    // console.log("BILLING PROPS:", props)

    this.onComplete = props.onComplete;
    this.handleChange = props.handleChange;
    this.nextButton = props.nextButton;

    let tc = props.totalcosts;
    tc.balance = 0;
    tc.numpay = 12;
    tc.downpaypercent = 25;
    tc.grandTotal = Number(tc.balance + tc.total);
    tc.downpayment = Number((tc.downpaypercent * tc.grandTotal / 100.0).toFixed(2));
    tc.financeamt = Number((tc.grandTotal - tc.downpayment)).toFixed(2);
    tc.monthlypayment = Number((tc.financeamt / tc.numpay).toFixed(2));


    this.state = {
      totalcosts: tc
    }

  }

  calculateCosts = () => {

  }

  isFormComplete = () => {
    // CONFIRM Treatment has been set
    let bComplete = true;
    // (this.state.hasOwnProperty('balance') && this.state['balance']) &&
    // (this.state.hasOwnProperty('numpay') && this.state['numpay']) &&
    // (this.state.hasOwnProperty('downpaypercent') && this.state['downpaypercent']) 
    return bComplete;
  }

  onNextEvent = event => {
    // console.log("BM OnNext")
    // console.log(this.state)
    // CONFIRM Treatment has been set
    if (this.isFormComplete()) {
      this.nextButton(event)
    }
  }

  onChangeEvent = event => {

    // let ctype = event.target.type;
    let name = event.target.name;
    let value = Number(event.target.value);

    // console.log("CHANGE EVENT NAME:", name, " VAL:", value);
    if (name && name.length > 1) {
      let tc = this.state.totalcosts;
      tc[name] = value;
      tc.grandTotal = Number(tc.balance + tc.total);
      tc.downpayment = Number((tc.downpaypercent * tc.grandTotal / 100.0).toFixed(2));
      tc.financeamt = Number((tc.grandTotal - tc.downpayment)).toFixed(2);
      tc.monthlypayment = Number((tc.financeamt / tc.numpay).toFixed(2));

      this.setState({ totalcosts: tc });
      // console.log(tc)
    }
  }


  render() {
    return (
      <React.Fragment>
        <section id="VUEtreatmentCalc" data-adminurl="https://www.cnyfertility.com/wp-admin/admin-ajax.php"
          data-treatments="1" data-filters="1" data-security="98ca9ae8e0"
          className="VUEtreatmentCalc block__affording--plan gt__affording-calc ">
          <div className="text-left treatment__head container">
            <h5 className="section-title">Payment Calculator</h5>
          </div>
          <div id="block__treatment--wrap" className="block__treatment--wrap container">
            <div id="block__treatment--left-content" className="left-content">
              <div className="hide-on-blog">
                <div>
                  <p>Payments can be distributed over time to make it easier to handle the burden of costley procedures.  </p>
                </div>
              </div>
              <div className="details">
                <h5 className="section-title">Roll Forward</h5>
                <ul className="tick">

                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <div className="payment-calc--item item-treatment">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="item--label">
                                <input
                                  className="form-control"
                                  id="balance"
                                  name="balance"
                                  type="number"
                                  placeholder="Balance Rollover"
                                  value={this.state.totalcosts.balance}
                                  onChange={this.onChangeEvent}
                                />
                              </span>
                              <span className="item--note">Outstanding Balance</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6>Contract length (in months)</h6>
                    <div id="finance_length_range2">
                      <input
                        id="numpay"
                        name="numpay"
                        type="range"
                        min="6"
                        max="24"
                        step="6"
                        value={this.state.totalcosts.numpay}
                        className="rangeSlider steps4"
                        onChange={this.onChangeEvent}
                      />
                      <div id="financeLenght_labels" className="rangeSelector">
                        <div><label>6 </label></div>
                        <div><label>12 </label></div>
                        <div><label>18 </label></div>
                        <div><label>24 </label></div>
                      </div>
                    </div>
                  </li>
                  <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <h6><span id="down_before_val">25</span>% down before treament</h6>
                    <div id="finance_down">
                      <input
                        id="downpaypercent"
                        name="downpaypercent"
                        type="range"
                        max="100"
                        step="1"
                        min="25"
                        value={this.state.totalcosts.downpaypercent}
                        className="rangeSlider"
                        onChange={this.onChangeEvent}
                      />
                      <div className="rangeSelector">
                        <div><label id="payment_down_min">25%</label></div>
                        <div id="centerLabel" style={{ marginLeft: '-25%' }}><label>50%</label></div>
                        <div><label>100%</label></div>
                      </div>
                    </div>
                    <div id="finance_down_range" className="rangeSelector" ></div>
                  </li>

                </ul>
              </div>

              <div id="finance-control" className="finance">
                <h5 className="section-title">Finance</h5>
                <label id="finance_finance_switch2"
                  className="with-toggle-options">
                  <input type="checkbox" name="finance_finance_switch2" checked onChange={this.onChangeEvent} />
                  <div className="switch"><span data-value="false"> One Time Payment <small> Paid in full
                    before treatment </small></span>
                    <div className="switcher"></div> <span data-value="true"> Finance <small>25% due
                      before treatment</small></span>
                  </div>
                </label>
              </div>
            </div>
            {/* <Receipt props={this.state} /> */}
            <div id="block__treatment--right-content" className="right-content">
              <div id="VUEpriceCalc" className="white-card">
                <h5>Sample Payment Calculator: Monthly Billing Summary</h5>
                <ul className="payment-calc is-minify">

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
                        <div className="item--price">
                          <span className="item--price--cny">${this.state.totalcosts.total}</span>
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
                        <div className="item--price"><span className="item--price--cny">${Number(this.state.totalcosts.balance)}</span>
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
                          className="item--price--grandtotal">${this.state.totalcosts.grandTotal}</span></div>
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
                            <td><span className="item--price item--price--cny">${this.state.totalcosts.downpayment}</span></td>
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
                        <div className="item--price"><span className="item--price--cny">${this.state.totalcosts.financeamt}</span>
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
                        <div className="item--price">
                          <span>
                            <small className="item--price--third-party">{this.state.totalcosts.numpay}</small>
                          </span>
                        </div>
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
                          className="item--price--grandtotal">${this.state.totalcosts.monthlypayment}</span></div>
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
                <div className="payment-calc-method--btns">
                  <a href="#calc" onClick={this.onNextEvent} disabled={!this.isFormComplete()} className="button is-outline"> Continue with Financing </a>
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

export default BillingMenu;