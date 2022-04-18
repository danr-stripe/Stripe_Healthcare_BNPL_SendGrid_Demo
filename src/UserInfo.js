import React from 'react';
import './App.css';


class UserInfo extends React.Component {
  constructor(prop) {
    super(prop)
    let props = prop.props;
    console.log("UI PROPS:", props)

    this.onComplete = props.onComplete;
    this.handleChange = props.handleChange;
    this.nextButton = props.nextButton;

    this.state = {
    }
  }

  isFormComplete = () => {
    // CONFIRM Treatment has been set
    let bComplete =
      (this.state.hasOwnProperty('custid') && this.state['custid']) &&
      (this.state.hasOwnProperty('lname') && this.state['lname']) &&
      (this.state.hasOwnProperty('email') && this.state['email']) &&
      (this.state.hasOwnProperty('phone') && this.state['phone']);

    // if (!bComplete) console.log(this.state);
    return bComplete;
  }

  onChangeEvent = event => {

    let name = event.target.name;
    let value = event.target.value;

    // console.log("CHANGE EVENT NAME:", name, " VAL:", value);
    if (name && name.length > 1) {
      this.setState({
        [name]: value
      })
    }
    this.handleChange(event);
  }


  onNextEvent = event => {
    // console.log("UI OnNext")
    // console.log(this.state)
    // CONFIRM Treatment has been set
    if (this.isFormComplete()) {
      this.nextButton(event);
      // stripe.customers.create({
      //   id: this.state['custid'],
      //   description: 'User created by the CNY portal',
      //   email: this.state['email'],
      //   name: this.state['lname'],
      //   phone: this.state['phone'],
      // },
      //   (error, customer) => {
      //     if (error) {
      //       console.log("Customer ERROR")
      //       console.log(error);
      //       console.error(error);
      //     } else {
      //       console.log("Customer")
      //       console.log(customer);
      //       this.nextButton(event);
      //     }
      //   });
    }
  }

  render() {
    return (
      <React.Fragment>

        <section id="VUEtreatmentCalc" data-adminurl="https://www.cnyfertility.com/wp-admin/admin-ajax.php"
          data-treatments="1" data-filters="1" data-security="98ca9ae8e0"
          className="VUEtreatmentCalc block__affording--plan gt__affording-calc ">
          <div className="treatment__head text-center align-center container">
            <div className="treatment-list--filters">
              Gather User Information
            </div>
          </div>

          <div id="block__treatment--wrap" className="block__treatment--wrap container">

            <div id="block__treatment--right-content" className="right-content">
              <div id="VUEpriceCalc" className="white-card">
                <h5>Sample User Data Collection: Self Pay Pricing</h5>
                <ul className="payment-calc is-minify">
                  <li className="detail__treatment detail__item"
                    style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <div className="payment-calc--item item-treatment">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="item--label">
                                <input
                                  className="form-control"
                                  id="custid"
                                  name="custid"
                                  type="text"
                                  placeholder="Cross Reference ID"
                                  value={this.custid}
                                  onChange={this.onChangeEvent}
                                />
                              </span>
                              <span className="item--note">Cross Reference ID</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="detail__treatment detail__item"
                    style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <div className="payment-calc--item item-treatment">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="item--label">
                                <input
                                  className="form-control"
                                  id="lname"
                                  name="lname"
                                  type="text"
                                  placeholder="Enter patients name (used for billing name)"
                                  value={this.phone}
                                  onChange={this.onChangeEvent}
                                />
                              </span>
                              <span className="item--note">Patient Name</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="detail__treatment detail__item"
                    style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <div className="payment-calc--item item-treatment">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="item--label">
                                <input
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  type="text"
                                  placeholder="Enter billing email address"
                                  value={this.phone}
                                  onChange={this.onChangeEvent}
                                />
                              </span>
                              <span className="item--note">Email</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                  <li className="detail__treatment detail__item"
                    style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
                    <div className="payment-calc--item item-treatment">
                      <table className="payment-calc--table">
                        <tbody>
                          <tr>
                            <td>
                              <span className="item--label">
                                <input
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                  type="text"
                                  placeholder="Enter phone number"
                                  value={this.phone}
                                  onChange={this.onChangeEvent}
                                />
                              </span>
                              <span className="item--note">Phone Number</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </li>
                </ul>

                <div className="payment-calc-method--btns">
                  <a href="#calc" onClick={this.onNextEvent} disabled={!this.isFormComplete()} className="button is-outline"> Submit </a>
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
                <p> The above calculation is for simulation purposes only. It collects users information that is used for the Stripe billing process and creates that user in Mobiquity created back end services.</p>
              </div>
              <div className="block__treatment--showmore-cta text-center" style={{ marginTop: '30px' }} >
                {/* <a href="https://www.cnyfertility.com/ivf/"   onClick={this.nextButton} className="button is-primary is-solid is-full"> */}
                <a href="#calc" onClick={this.onNextEvent} disabled={true} className="button is-primary is-solid is-full">
                  <span style={{ marginRight: '5px' }}>Start Over</span>
                  <span> Automated Payments</span>
                </a>
              </div>
            </div>
          </div>
          <div className="block__treatment--cta container" style={{ display: 'none' }}></div>
        </section>

      </React.Fragment >

    );
  }
}

export default UserInfo;