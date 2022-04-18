
import React from 'react';
// import BarGraph from './BarGraph';
import './App.css';
import PriceMenu from './PriceMenu';
import BillingMenu from './BillingMenu';
import UserInfo from './UserInfo';
import ProductDisplay from './ProductDisplay';

import DebugScreen from './DebugScreen';

import Header from './Header';
import Footer from './Footer';



const NumScreens = 4;

class MasterForm extends React.Component {
  constructor(props) {

    super(props)
    // console.log("MASTER PROPS:")
    // console.log(props)

    this.onComplete = props.onComplete;

    this.state = {
      currentStep: 1,   // if -1 = debug mode
      handleChange: this.handleChange,
      handleStoreState: this.handleStoreState,
      nextButton: this._next,
      selected: {}
    }
  }

  handleChange = event => {

    let ctype = event.target.type;
    let name = event.target.name;
    let value = null;

    // console.log(event.target);

    if (ctype === "checkbox") {
      value = (event.currentTarget.checked);
    } else {
      value = event.target.value;
    }

    // console.log("SET NAME:", name, " VAL:", value);
    let selected = this.state.selected;
    selected[name] = value;

    if (name && name.length > 1) {
      this.setState({
        selected: selected
      })
    }
  }

  handleStoreState = stateInfo => {
    this.setState(stateInfo);
  }


  handleDebug = event => {
    console.log("DEBUGGING...")
    console.log(this.state)
    this.setState({
      currentStep: -1
    })
  }



  handleSubmit = event => {
    // console.log("SUBMITTING...")
    // console.log(this.state)

    event.preventDefault()
    this.onComplete(this.state);
  }

  _next = () => {
    // console.log("NEXT")
    let currentStep = this.state.currentStep
    currentStep = currentStep >= (NumScreens - 1) ? NumScreens : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev = () => {
    // console.log("PREV")
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  /*
  * the functions for our button
  */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </button>
      )
    }
    return null;
  }

  nextButton() {

    // console.log('NEXT BUTT')
    let currentStep = this.state.currentStep;
    if (currentStep < NumScreens) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </button>
      )
    }
    return null;
  }

  render() {
    // console.log(this)
    return (
      <React.Fragment>
        <Header />

        <DebugStep
          currentStep={this.state.currentStep}
          handleStoreState={this.handleStoreState}
          nextButton={this._next}
          props={this.state}
        />
        <Step1
          currentStep={this.state.currentStep}
          handleStoreState={this.handleStoreState}
          nextButton={this._next}
          props={this.state}
        />
        <Step2
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          nextButton={this._next}
          props={this.state}
        />
        <Step3
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          nextButton={this._next}
          props={this.state}
        />
        <Step4
          currentStep={this.state.currentStep}
          handleChange={this.handleChange}
          nextButton={this.handleSubmit}
          props={this.state}
        />
        {/* {this.previousButton()}
        {this.nextButton()} */}

        <Footer props={this.state} />

        <section className="footer__disclaimer">
          <div className="footer__disclaimer--wrap container">
            <div className="footer__disclaimer--box">
              <h5>DEBUG: Current state information</h5>
              {/* <button
                  className="button is-outline" id="checkout-and-portal-button"
                  type="button" onClick={this.onDebug}>
                  Debug
                </button> */}
              <div className="payment-calc-method--btns">
                <a href="#calc" onClick={this.handleDebug} className="button is-outline"> Debug </a>
              </div>


              {/* {{ this.syntaxHighlight(this.state.props.props) }} */}
            </div>
          </div>
        </section>

      </React.Fragment >
    );
  }
}


function DebugStep(prop) {
  let props = prop.props;
  // console.log("STEP1:", props)

  if (props.currentStep !== -1) {
    return null
  }
  return (
    <DebugScreen
      props={props}
    />)
}


function Step1(prop) {
  let props = prop.props;
  // console.log("STEP1:", props)

  if (props.currentStep !== 1) {
    return null
  }
  return (
    <PriceMenu
      props={props}
    />)
}

function Step2(prop) {
  let props = prop.props;
  // console.log("STEP2:", props)
  if (props.currentStep !== 2) {
    return null
  }
  return (
    <BillingMenu
      props={props}
    />);
}


function Step3(prop) {
  let props = prop.props;
  // console.log("STEP3:", props)

  if (props.currentStep !== 3) {
    return null
  }
  return (
    <UserInfo
      props={props}
    />
  );
}

function Step4(prop) {
  let props = prop.props;
  // console.log("STEP4:", props)

  if (props.currentStep !== 4) {
    return null
  }
  return (
    <ProductDisplay
      props={props}
    />
  );
}

export default MasterForm;