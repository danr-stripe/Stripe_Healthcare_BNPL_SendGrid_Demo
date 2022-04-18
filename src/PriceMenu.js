/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
// import Receipt from './Receipt';
import './App.css';
import Papa from 'papaparse';
// import ProcedureTypes from './ProcedureTypes';

//const CNYPackagesPricingCSV = './assistedV1.csv';
const CNYPackagesPricingCSV = '/CNYPackagesPricing.csv';


const AddOnSwitch = ({ id, name, label, onChangeEvent }) => (
  <label id="control__frozen2"
    form="controls_frozen_transfer" className="with-toggle">
    <div className="check-left">
      <input type="checkbox" name={name} id={id} onChange={onChangeEvent} />
      <div className="switcher"></div>
    </div>
    <div className="check-body"><span className="switch-label"> {label} </span>
      <div className="v-tooltip">
        <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg" width="12"
          height="12" viewBox="0 0 24 24">
          <path
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
          </path>
        </svg>
        </div>
      </div>
    </div>
  </label>
);


const ReceiptTreatmentItem = ({ item }) => (
  (item) ? (
    <li className="detail__treatment detail__item" style={{ transform: 'matrix(1, 0, 0, 1, 0, 0)' }}>
      <div className="payment-calc--item item-treatment">
        <table className="payment-calc--table">
          <tbody>
            <tr>
              <td rowSpan="2" style={{ width: '80px' }}>
                <noscript>
                  <img
                    src="./CNYWeb/IVF.svg"
                    alt="In Vitro Fertilization"
                    className="item--detail--icon" />
                </noscript>
                <img
                  src="./CNYWeb/IVF.svg"
                  alt="In Vitro Fertilization"
                  className="item--detail--icon ls-is-cached lazyloaded" />
              </td>
              <td>
                <span className="item--label">{item.Service} </span>
                <span className="item--note"></span>
              </td>
              <td><span className="item--price item--price--cny">$ {item.Price}</span>
              </td>
            </tr>
            <tr>
              <td><small className="item--note--avg">{item.Message}</small></td>
              <td><small className="item--price--third">${item.SubPrice} </small></td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  ) : ('')
);

const ReceiptAddOnItem = ({ item }) => (
  (item) ? (
    <li className="detail__geneticTesting detail__item" >
      <div className="payment-calc--item item--add item--add-on">
        <table className="payment-calc--table">
          <tbody>
            <tr className="row-cny">
              <td>+</td>
              <td><span className="item--label">{item.Service}</span></td>
              <td><span className="item--price item--price--cny">${item.Price}</span></td>
            </tr>
            <tr className="row-third-party">
              <td>+</td>
              <td>
                <small className="item--note--third"> {item.Message} </small></td>
              <td>
                {(item.SubPrice) ? (<small className="item--price--third">${item.SubPrice} </small>) : ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </li>
  ) : ('')
);

const ReceiptDiscountItem = ({ item, total }) => (
  (item) ? (
    <li className="detail__discount">
      <div className="payment-calc--item item--sub">
        <div className="item--detail">
          <span>{item.Service}</span>
        </div>
        {/* <div className="item--price">
          <span className="item--price--cny">${total}</span>
        </div> */}
      </div>
    </li>
  ) : ('')
);

const ReceiptTotals = (totals) => (
  <li className="detail__total">
    <div className="payment-calc--item item--total item--total-total">
      <div className="item--row">
        <div className="item--detail"><span>Total to CNY</span>
          <div className="v-tooltip">
            <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg"
              width="12" height="12" viewBox="0 0 24 24">
              <path
                d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
              </path>
            </svg></div>
          </div>
        </div>
        <div className="item--price"><span className="item--price--cny">${totals.totals.internal}</span>
        </div>
      </div>
      <div className="item--row">
        <div className="item--detail"><span><small> Estimated 3rd Party
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
          className="item--price--third-party">${totals.totals.external}</small></span></div>
      </div>
      <div className="item--row">
        <div className="item--detail">
          <span className="item--total-label">
            Discounts:
          </span>
        </div>
        <div className="item--price">
          <span>${totals.totals.totaldiscount}</span>
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
          className="item--price--grandtotal">${totals.totals.total}</span></div>
      </div>

    </div>
  </li>
);


class PriceMenu extends React.Component {
  constructor(prop) {
    super(prop)
    let props = prop.props;
    // console.log("PM PROPS:", props)

    this.onComplete = props.onComplete;
    this.handleStoreState = props.handleStoreState;
    this.nextButton = props.nextButton;

    this.state = {
      selected: {
      },
      totalcosts: {
        internal: 0,
        external: 0,
        discountrate: 0,
        total: 0
      }
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  fetchCsv() {
    return fetch(CNYPackagesPricingCSV).then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  getData(result) {
    // Clean up some of the data
    result.data.forEach((element, index, arr) => {
      // console.log(element);
      // Image
      // Message
      result.data[index].Price = Number(element.Price);
      // SelfPrice
      // Service
      result.data[index].SubPrice = Number(element.SubPrice);
      // Type
      // Warning

      let treatmentTypes = Object.getOwnPropertyNames(result.data[index]).filter(function (str) { return str.indexOf("t_") === 0 })

      for (let i = 0; i < treatmentTypes.length; i++) {
        let tt = treatmentTypes[i];
        result.data[index][tt] = (element[tt].length > 0);
      }
      // Should check on the type here to make more automatic
      // result.data[index].t_fets = (element.t_fets.length > 0);
      // result.data[index].t_fetm = (element.t_fetm.length > 0);
      // result.data[index].t_iui = (element.t_iui.length > 0);
      // result.data[index].t_ivf = (element.t_ivf.length > 0);
      // result.data[index].t_tubalreversal = (element.t_tubalreversalv > 0);
      // result.data[index].t_vasectomyreversal = (element.t_vasectomyreversal.length > 0);
    });

    this.setState({ configuration: result.data });
    // console.log("CSV CONFIGURATION")
    // console.log(this.state)
  }

  getSelectedTreatment() {
    return this.state.selected.treatment;
  }

  getConfigOptionInfo(tag) {
    // console.log("getConfigOptionInfo(", tag)
    if (this.state.configuration) {
      var result = this.state.configuration.find(obj => {
        return obj.Tag === tag
      })
      return result;
    }
    return null;
  }

  calculateCosts = () => {
    let totalcosts = {
      internal: 0,
      external: 0,
      discountrate: 0,
      totaldiscount: 0,
      total: 0
    }

    if (this.state.configuration) {
      if (this.state.selected.treatment) {
        let opt = this.getConfigOptionInfo(this.state.selected.treatment)
        totalcosts.internal = opt.Price;
        totalcosts.external = opt.SubPrice;

        this.state.configuration.forEach(item => {
          if (item.Type === 'addon' && item[this.state.selected.treatment] && this.state.selected[item.Tag]) {
            totalcosts.internal += item.Price;
            totalcosts.external += item.SubPrice;
          }
          if (item.Type === 'discount' && item[this.state.selected.treatment] && this.state.selected[item.Tag]) {
            totalcosts.discountrate += item.Price;
          }
        });
        totalcosts.totaldiscount = totalcosts.discountrate * totalcosts.internal;
        totalcosts.total = totalcosts.internal - totalcosts.totaldiscount;
      }

      return totalcosts;
    }
  }

  isFormComplete = () => {
    // CONFIRM Treatment has been set
    let bComplete = (this.state.selected.hasOwnProperty('treatment') && this.state.selected['treatment'])
    // console.log("COMPLETE = ", bComplete)
    return bComplete;
  }

  onNextEvent = event => {
    // console.log("PM OnNext")
    // console.log(this.state)
    // CONFIRM Treatment has been set

    if (this.isFormComplete()) {
      // this.handleChange(event);
      this.handleStoreState(this.state);
      this.nextButton(event)
    }
  }

  onChangeEvent = event => {
    let ctype = event.target.type;
    let name = event.target.name;
    let inval = null;
    let value = null;

    if (ctype === "checkbox") {
      inval = (event.currentTarget.checked);
    } else {
      inval = event.target.value;
    }

    // Update Treatment Info
    // if (name === 'treatment') {
    //   value = ProcedureTypes[name][inval];
    // } else {
    value = inval;
    // }


    let selected = this.state.selected;
    selected[name] = value;

    if (name && name.length > 1) {
      // console.log("CHANGE EVENT NAME:", name, " VAL:", value);
      this.setState({
        selected: selected
      })
      let costs = this.calculateCosts();
      this.setState({ totalcosts: costs });
      // console.log("COSTS:  ", costs);
    }
  }

  async getCsvData() {
    let csvData = await this.fetchCsv();
    console.log("CSV")
    console.log(csvData)

    Papa.parse(csvData, {
      header: true,
      complete: this.getData
    });
  }

  render() {
    return (
      <React.Fragment>
        <section id="VUEtreatmentCalc" data-adminurl="https://www.cnyfertility.com/wp-admin/admin-ajax.php" data-treatments="1" data-filters="1" data-security="98ca9ae8e0" className="VUEtreatmentCalc block__affording--plan gt__affording-calc ">
          <div className="treatment__head text-center align-center container">
            <div className="treatment-list--filters">
              <a className="is-active"> Assisted Reproduction </a>
              <a className=""> Preserving Fertility </a>
              <a className=""> Donor Packages </a>
              <a className=""> Custom Packages </a>
            </div>
          </div>
          <div className="text-left treatment__head container">
            <div className="treatment--title"></div>
          </div>

          {/* Treatment selections */}
          <div id="block__treatment--wrap" className="block__treatment--wrap container">
            <div id="block__treatment--left-content" className="left-content">
              <div>
                <select name="treatment" onChange={this.onChangeEvent}>
                  <option value="non" selected disabled hidden >--- Select Treatment ---</option>
                  {
                    (this.state.configuration) ?
                      (
                        this.state.configuration.map((item) => (
                          (item.Type === 'treatment') ? (<option value={item.Tag} key={item.Tag} >{item.Service}</option>) : ('' /*console.log("NON OPT")*/))
                        )
                      ) : (''/*console.log("loading...")*/)
                  }
                </select>
              </div>
              <div className="hide-on-blog">
                <div>
                  <p>The female’s eggs are removed from the ovaries, fertilized and grown in a lab,
                    and placed back into the woman’s uterus. The gold standard of reproductive
                    medicine.<a href="https://www.cnyfertility.com/ivf/"> +Learn more</a></p>
                </div>
              </div>

              {/* Included section */}
              <div className="details">
                <h5 className="section-title">Automatically Included</h5>
                <ul className="tick-list">
                  {
                    (this.state.configuration) ?
                      (
                        this.state.configuration.map((item) => (
                          (item.Type === 'include' && this.state.selected.treatment && item[this.state.selected.treatment]) ? (<li> {item.Service} </li>) : (''/*console.log("NON INC")*/))
                        )
                      ) : (''/*console.log("loading...")*/)
                  }
                </ul>
              </div>

              {/* Add On Section */}
              <div className="add-ons">
                <h5 className="section-title">Add ons</h5>
                {/* <label id="finance_monitor_switch2"
                  form="finance_monitor_trigger2" className="with-toggle-options">
                  <input type="checkbox" name="in_house_monitor" onChange={this.onChangeEvent} />
                  <div className="switch"><span data-value="false">
                    <div>
                      <a className="monitor_label" style={{ color: 'inherit' }}> In house monitoring
                      </a>
                      <div className="v-tooltip">
                        <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                          height="12" viewBox="0 0 24 24">
                          <path
                            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                          </path>
                        </svg></div>
                      </div>
                    </div> <small> For local clients </small>
                  </span>
                    <div className="switcher"></div> <span data-value="true">
                      <div><a className="monitor_label" style={{ color: 'inherit' }}> Remote cycle
                        management </a>
                        <div className="v-tooltip">
                          <div tabIndex="0"><svg xmlns="http://www.w3.org/2000/svg" width="12"
                            height="12" viewBox="0 0 24 24">
                            <path
                              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z">
                            </path>
                          </svg></div>
                        </div>
                      </div> <small> For travel clients </small>
                    </span>
                  </div>
                </label> */}
                <div className="controlled--group">
                  {
                    (this.state.configuration) ?
                      (
                        this.state.configuration.map((item) => (
                          (item.Type === 'addon' && this.state.selected.treatment && item[this.state.selected.treatment]) ? (<AddOnSwitch id={item.Tag} name={item.Tag} label={item.Service} onChangeEvent={this.onChangeEvent} />) : (''/*console.log("NO ADDON")*/))
                        )
                      ) : ('' /*console.log("loading...")*/)
                  }
                </div>
              </div>

              {/* Discount Section */}
              <div className="discount-control">
                <h5 className="section-title">Discount</h5>
                {
                  (this.state.configuration) ?
                    (
                      this.state.configuration.map((item) => (
                        (item.Type === 'discount' && this.state.selected.treatment && item[this.state.selected.treatment]) ? (<AddOnSwitch id={item.Tag} name={item.Tag} label={item.Service} onChangeEvent={this.onChangeEvent} />) : (''/*console.log("NO DIS")*/))
                      )
                    ) : ('' /*console.log("loading...")*/)
                }
              </div>

            </div>
            {/* <Receipt props={this.state} /> */}
            <div id="block__treatment--right-content" className="right-content">
              <div id="VUEpriceCalc" className="white-card">
                <h5>Sample Payment Calculator: Self Pay Pricing</h5>
                <ul className="payment-calc is-minify">

                  {/* Treatments Reciept */}
                  {(this.state.selected.treatment) ? (<ReceiptTreatmentItem item={this.getConfigOptionInfo(this.getSelectedTreatment())} />) : ''}

                  {/* Add On Reciept */}
                  {
                    (this.state.configuration) ?
                      (
                        this.state.configuration.map((item) => (
                          (item.Type === 'addon' && this.state.selected[item.Tag]) ? (<ReceiptAddOnItem item={this.getConfigOptionInfo(item.Tag)} />) : (''/*console.log("NEG ADDON")*/))
                        )
                      ) : ('' /*console.log("loading...")*/)
                  }

                  {/* Discounts On Reciept */}
                  {
                    (this.state.configuration) ?
                      (
                        this.state.configuration.map((item) => (
                          (item.Type === 'discount' && this.state.selected[item.Tag]) ? (<ReceiptDiscountItem item={this.getConfigOptionInfo(item.Tag)} total={500} />) : (''/*console.log("NEG ADDON")*/))
                        )
                      ) : ('' /*console.log("loading...")*/)
                  }

                  {/* Totals On Reciept */}
                  {(this.state.selected.treatment) ? (<ReceiptTotals totals={this.state.totalcosts} />) : ''}
                </ul>

                <h5 className="payment-calc-method--title">Payment method</h5>
                <div className="payment-calc-method--btns">
                  {
                    <a href="#calc" onClick={this.onNextEvent} disabled={!this.isFormComplete()} className="button is-outline"> Calculate your monthly Payments </a>
                  }
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
              <div className="block__treatment--showmore-cta text-center" style={{ marginTop: '30px' }}>
                {/* <a href="https://www.cnyfertility.com/ivf/"   onClick={this.nextButton} className="button is-primary is-solid is-full"> */}
                <a href="#calc" onClick={this.onNextEvent} disabled={true} className="button is-primary is-solid is-full">
                  <span style={{ marginRight: '5px' }}>Start</span>
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

export default PriceMenu;