import React from 'react';
import './App.css';

class Footer extends React.Component {
  constructor(props) {
    super(props)
    console.log("FOOTER-PROPS:", props)

    // this.handleChange = props.props.handleStoreState;
    // console.log(this.handleChange)

    this.state = {
      props: props
    }
  }

  syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      // var cls = 'number';
      // if (/^"/.test(match)) {
      //   if (/:$/.test(match)) {
      //     cls = 'key';
      //   } else {
      //     cls = 'string';
      //   }
      // } else if (/true|false/.test(match)) {
      //   cls = 'boolean';
      // } else if (/null/.test(match)) {
      //   cls = 'null';
      // }
      // return '<span className="' + cls + '">' + match + '</span>';
      return match + '\n';
    });

  }

  onDebug(event) {
    // event.preventDefault();
    // this.setState({ checkedOut: true })
    console.log("DEBUG...")
    console.log(this)
    // this.state.handleStoreState({ currentStep: -1 })
    return true;
  }

  render() {
    return (
      <React.Fragment>
        <footer className="footer" id="main__footer">
          <section className="footer__primary">
            <div className="footer__primary--wrap container">
              <div className="footer__left">
                <div>
                  <noscript>
                    <img
                      src="https://www.cnyfertility.com/wp-content/themes/CNYFertility/public/images/CNY-Fertility.svg"
                      alt="CNY Fertility" />
                  </noscript>
                  <img className="lazyload"
                    src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%20210%20140%22%3E%3C/svg%3E"
                    data-src="https://www.cnyfertility.com/wp-content/themes/CNYFertility/public/images/CNY-Fertility.svg"
                    alt="CNY Fertility" />
                  <p /> MTWF: 6A-4P | TH-SAT: 7A-1P <br /> 24/7 CLINICAL ACCESS<br />
                  <a href="tel:8443152229" target="_blank" rel="noopener noreferrer">844-315-2229 (BABY)
                  </a>

                  <p />
                  <a
                    href="https://dashboard.stripe.com/test/dashboard"
                    className="button is-outline">Go to Payment Dashboard
                  </a>
                </div>
                <div>
                  <ul className="social-icons">
                    <li> <a className="trigger_search" href="https://www.cnyfertility.com/affording-treatment/#"
                      aria-label="Open Search Dialog" aria-controls="search--overlay"> <svg width="27"
                        height="27" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path className="circle"
                            d="M13.856.093c1.813 0 3.512.344 5.096 1.032a13.266 13.266 0 0 1 4.141 2.797 13.267 13.267 0 0 1 2.798 4.142c.688 1.584 1.032 3.282 1.032 5.095 0 1.814-.344 3.512-1.032 5.096a13.46 13.46 0 0 1-2.798 4.157 13.135 13.135 0 0 1-4.141 2.814c-1.584.687-3.283 1.031-5.096 1.031-1.813 0-3.511-.344-5.095-1.031a13.323 13.323 0 0 1-4.158-2.814 13.323 13.323 0 0 1-2.813-4.157C1.102 16.67.758 14.973.758 13.159c0-1.813.344-3.511 1.032-5.095a13.134 13.134 0 0 1 2.813-4.142 13.46 13.46 0 0 1 4.158-2.797C10.345.437 12.043.093 13.856.093z">
                          </path>
                          <path className="icn" stroke="#FFF" strokeWidth=".2"
                            d="M15.529 15.029a3.411 3.411 0 1 0-4.824-4.824 3.411 3.411 0 0 0 4.824 4.824zm.555 1.757A5.118 5.118 0 0 1 9.5 9a5.117 5.117 0 0 1 7.787 6.585c.018.015.035.031.052.048l2.412 2.412a.853.853 0 1 1-1.206 1.206l-2.412-2.412a.864.864 0 0 1-.048-.052z">
                          </path>
                        </g>
                      </svg> </a></li>
                    <li> <a className="" href="https://www.facebook.com/CNYFertilityCenter/"
                      aria-label="Go to CNY Fertility Facebook page" target="_blank" rel="noopener noreferrer">
                      <svg width="27"
                        height="27" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path className="circle"
                            d="M13.098 0c1.813 0 3.517.344 5.11 1.032a13.274 13.274 0 0 1 4.174 2.813 13.323 13.323 0 0 1 2.813 4.157c.688 1.584 1.032 3.283 1.032 5.096 0 1.813-.344 3.517-1.032 5.11a13.274 13.274 0 0 1-2.813 4.174 13.274 13.274 0 0 1-4.173 2.813c-1.594.688-3.298 1.032-5.111 1.032-1.813 0-3.512-.344-5.096-1.032a13.323 13.323 0 0 1-4.157-2.813 13.274 13.274 0 0 1-2.813-4.173C.344 16.615 0 14.91 0 13.098c0-1.813.344-3.512 1.032-5.096a13.323 13.323 0 0 1 2.813-4.157 13.323 13.323 0 0 1 4.157-2.813C9.586.344 11.285 0 13.098 0z">
                          </path>
                          <path className="icn"
                            d="M16.403 7h-2.156c-.42 0-.807.076-1.162.229a3.12 3.12 0 0 0-.933.61 2.753 2.753 0 0 0-.617.864 2.332 2.332 0 0 0-.218.966v1.348H9.403v2.644h1.914V19h2.543v-5.339h1.89v-2.644h-1.89v-.686c0-.204.076-.365.23-.484.153-.118.287-.178.4-.178h1.913V7z">
                          </path>
                        </g>
                      </svg> </a></li>
                    <li> <a className="" href="https://www.instagram.com/cnyfertility/"
                      aria-label="Go to CNY Fertility Instragram page" target="_blank" rel="noopener noreferrer">
                      <svg
                        width="27" height="27" xmlns="http://www.w3.org/2000/svg">
                        <g fillRule="nonzero" fill="none">
                          <path className="circle"
                            d="M13.844.031c1.813 0 3.511.344 5.095 1.032a13.46 13.46 0 0 1 4.157 2.798 13.135 13.135 0 0 1 2.814 4.141c.688 1.584 1.031 3.283 1.031 5.096 0 1.813-.343 3.511-1.031 5.095a13.323 13.323 0 0 1-2.814 4.158 13.323 13.323 0 0 1-4.157 2.813c-1.584.688-3.282 1.032-5.095 1.032-1.813 0-3.512-.344-5.096-1.032a13.135 13.135 0 0 1-4.142-2.813 13.46 13.46 0 0 1-2.797-4.158C1.12 16.61.777 14.911.777 13.098c0-1.813.344-3.512 1.032-5.096a13.267 13.267 0 0 1 2.797-4.141 13.267 13.267 0 0 1 4.142-2.798C10.332.375 12.031.03 13.844.03z">
                          </path>
                          <g className="icn">
                            <path
                              d="M21.96 9.704c-.038-.85-.176-1.435-.373-1.941a3.904 3.904 0 0 0-.925-1.419 3.939 3.939 0 0 0-1.416-.922c-.51-.197-1.091-.334-1.942-.372-.856-.04-1.128-.05-3.3-.05-2.174 0-2.446.01-3.299.047-.85.037-1.435.175-1.941.372a3.905 3.905 0 0 0-1.42.925 3.94 3.94 0 0 0-.922 1.416c-.197.51-.334 1.09-.372 1.94-.04.857-.05 1.13-.05 3.302s.01 2.444.047 3.297c.037.85.175 1.435.372 1.941.203.538.519 1.02.925 1.42.4.405.885.721 1.416.921.51.197 1.091.335 1.942.372.853.038 1.125.047 3.298.047s2.445-.01 3.298-.047c.85-.037 1.435-.175 1.942-.372a4.093 4.093 0 0 0 2.341-2.34c.197-.51.335-1.092.372-1.942.038-.853.047-1.125.047-3.297 0-2.173-.003-2.445-.04-3.298zm-1.442 6.533c-.034.781-.165 1.203-.275 1.484a2.654 2.654 0 0 1-1.52 1.52c-.28.109-.706.24-1.484.274-.844.038-1.097.047-3.233.047-2.135 0-2.391-.01-3.232-.047-.782-.034-1.204-.165-1.485-.275a2.463 2.463 0 0 1-.92-.597 2.487 2.487 0 0 1-.596-.919c-.11-.28-.241-.706-.275-1.484-.038-.844-.047-1.097-.047-3.232 0-2.135.009-2.391.047-3.232.034-.781.165-1.203.275-1.485.128-.347.331-.662.6-.919.26-.265.572-.469.919-.597.281-.109.707-.24 1.485-.275.844-.037 1.097-.047 3.232-.047 2.139 0 2.392.01 3.233.047.781.035 1.204.166 1.485.275.347.128.663.332.919.597.266.26.469.572.597.92.11.28.24.706.275 1.484.038.844.047 1.097.047 3.232 0 2.135-.01 2.385-.047 3.229z">
                            </path>
                            <path
                              d="M14 9a4.001 4.001 0 0 0 0 8 4 4 0 0 0 0-8zm0 6.595a2.595 2.595 0 1 1 0-5.19 2.595 2.595 0 0 1 0 5.19zM19 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z">
                            </path>
                          </g>
                        </g>
                      </svg> </a></li>
                  </ul>
                </div>
              </div>
              <div className="footer__nav--primary">
                <div className="menu-cny-footer-vertical-container">
                  <ul id="menu-cny-footer-vertical">
                    <li>+ <a href="https://www.cnyfertility.com/about-us/">About Us</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/schedule-your-appointment-with-call-back/">Schedule a Consultations</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/fertility-treatments/">Fertility
                      Treatments</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/fertility-101/">Fertility 101</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/become-an-egg-donor/">Become an Egg
                      Donor</a></li>
                    <li className="current-menu-item active">+ <a
                      href="https://www.cnyfertility.com/affording-treatment/"
                      aria-current="page">Affording Fertility Treatment</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/travel/">Traveling for Treatment</a></li>
                    <li>+ <a href="https://www.cnyfertility.com/blog/">Blog</a></li>
                    <li>+ <a href="https://www.mobiquity.com">Mobiquity</a></li>
                    <li>+ <a href="https://stripe.com/docs/api">Stripe Documentation</a></li>
                  </ul>
                </div>
              </div>
              <div className="footer__locations">
                <ul>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-syracuse/">SYRACUSE
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://www.google.com/maps/place/CNY+Fertility+Center/@43.0024876,-76.1291339,16.75z/data=!4m5!3m4!1s0x89d9f48b5dee71a5:0xd75ce72701b537cc!8m2!3d43.0022974!4d-76.1264296"
                      rel="noopener noreferrer" target="_blank"> 195 INTREPID LN<br />SYRACUSE, NY 13205</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-albany/">ALBANY
                      FERTILITY CLINIC:</a></h3>s
                    <p><a href="https://www.google.com/maps/place/CNY+Fertility+Center/@42.7598133,-73.7618798,17z/data=!3m1!4b1!4m5!3m4!1s0x89de0dc2ac0dbebb:0x3ffbe4882156dc2d!8m2!3d42.7598094!4d-73.7596911"
                      rel="noopener noreferrer" target="_blank"> 38A OLD SPARROWBUSH RD<br />LATHAM, NY 12110</a>
                    </p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-buffalo/">BUFFALO
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://www.google.com/maps/place/835+Hopkins+Rd,+Buffalo,+NY+14221,+USA/@43.0017611,-78.7411616,17z/data=!3m1!4b1!4m5!3m4!1s0x89d37403087ec563:0xab41fa024eaa9f6d!8m2!3d43.0017611!4d-78.7389729"
                      rel="noopener noreferrer" target="_blank"> 835 HOPKINS RD<br />BUFFALO, NY 14221</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-rochester/">ROCHESTER
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://www.google.com/maps/dir//2244+East+Ave,+Rochester,+NY+14610/@43.1414088,-77.5470685,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89d6ca8e9b975b89:0x4a3512a561ffcf50!2m2!1d-77.5448798!2d43.1414049"
                      rel="noopener noreferrer" target="_blank"> 2244 EAST AVE<br />ROCHESTER, NY 14610</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-atlanta/">ATLANTA
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://www.google.com/maps/place/CNY+Fertility/@33.7938025,-83.7312806,17z/data=!3m1!4b1!4m5!3m4!1s0x88f5d1c274c3dd3f:0xf8ddfb8b8838f5b7!8m2!3d33.7937981!4d-83.7290866"
                      rel="noopener noreferrer" target="_blank"> 924 WEST SPRING STREET<br />MONROE, GA 30655</a>
                    </p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-montreal/">MONTREAL
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://www.google.com/maps/search/CNY+FERTILITY+6363+TRANSCANADIENNE,+STE+105+MONTREAL+(QC)+CANADA+H4T+1S3/@45.4955645,-73.6886371,17z/data=!3m1!4b1"
                      rel="noopener noreferrer" target="_blank"> 6363 TRANSCANADIENNE, STE 105<br />MONTREAL (QC)
                      CANADA H4T 1S3</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-colorado/">COLORADO
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://goo.gl/maps/TVt6ifwAJ42qU6dp8" rel="noopener noreferrer" target="_blank"> 265
                      S. PARKSIDE DRIVE, SUITE 200<br />COLORADO SPRINGS, CO, 80910</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-philadelphia/">PHILADELPHIA
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://goo.gl/maps/ns5ecWvCR6ydKMec6" rel="noopener noreferrer" target="_blank"> 20
                      Bustleton Pike, Ground<br />Feasterville-Trevose, PA 19053</a></p>
                  </li>
                  <li>
                    <h3><a href="https://www.cnyfertility.com/location/cny-fertility-florida/">FLORIDA
                      FERTILITY CLINIC:</a></h3>
                    <p><a href="https://goo.gl/maps/3wDUZLkPz4ZcF7fq9" rel="noopener noreferrer" target="_blank"> 5922
                      Cattlemen Ln<br />Sarasota, FL 34232</a></p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="footer__disclaimer">
            <div className="footer__disclaimer--wrap container">
              <div className="footer__disclaimer--box">
                <h5>DISCLAIMER: THIS WEBSITE DOES NOT PROVIDE MEDICAL ADVICE</h5>
                <p>The information, including but not limited to text, PDFs, graphics, images, and other
                  material contained on this website are for informational purposes only. No material on this
                  site is intended to be a substitute for professional medical advice, diagnosis, treatment,
                  or quantify or create a patient-doctor relationship. Always seek the advice of your
                  physician or other qualified healthcare provider with any questions you may have regarding a
                  medical condition, lifestyle or dietary changes, treatments, and before undertaking a new
                  health care regimen. Never disregard professional medical advice or delay in seeking it
                  because of something you have read on this website.</p>
              </div>
            </div>
          </section>

          <section className="footer__secondary">
            <div className="footer__secondary--wrap container">
              <span className="footer__copy"> © 2022 Mobiquity.
                All rights reserved. </span>
              <ul id="menu-cny-footer-horizontal" className="footer__nav--secondary">
                <li><a href="https://www.cnyfertility.com/contact-us/">Contact Us</a></li>
                <li><a href="https://www.cnyfertility.com/privacy-policy/">Privacy Policy</a></li>
                <li><a href="https://www.cnyfertility.com/career-opportunities/">Careers</a></li>
                <li><a href="#calc">Make a Payment</a></li>
              </ul>
            </div>
          </section>
        </footer>
      </React.Fragment >

    );
  }
}

export default Footer;