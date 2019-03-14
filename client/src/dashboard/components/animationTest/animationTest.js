import React from 'react';
import './animationTestBall.css'
import './animationTestVoltorb.css'
import * as firebase from 'firebase';


class AnimationTest extends React.Component {

  /*==================== Functions ====================*/
  handleAction = (event) => {
    this.props.toggleSnackbar('', '', null)
  }

  /*==================== Content ====================*/
  render() {

    return (
      <div id="animationWindow">
        {/*========== Ball animation test ==========*/}
        {/*} <div id="ball"><div id="line"></div></div> {*/}

        {/*========== Voltorb animation test ==========*/}
        <div id="skew-voltorb">
          <div id="voltorb">
            <div id="volt-body">
              <div id="volt-body-top">
                <div id="volt-body-top-fill">
                </div>
              </div>
              <div id="volt-body-middle">
                <div id="volt-body-middle-line">
                  <div id="volt-body-middle-fill"></div>
                </div>
              </div>
              <div id="volt-body-bottom">
                <div id="volt-body-bottom-fill"></div>
              </div>
              <div id="volt-face">
                <div id="volt-skew-eye-right">
                  <div id="volt-eye-right">
                    <div id="volt-eye-right-inner-1"></div>
                    <div id="volt-eye-right-inner-2"></div>
                    <div id="volt-eye-right-inner-3"></div>
                    <div id="volt-eye-right-pupil"></div>
                    <div id="volt-eye-right-border-top"></div>
                    <div id="volt-eye-right-border-right"></div>
                    <div id="volt-eye-right-border-bottom"></div>
                  </div>
                </div>
                <div id="volt-eye-left">
                  <div id="volt-eye-left-inner-1"></div>
                  <div id="volt-eye-left-inner-2"></div>
                  <div id="volt-eye-left-inner-3"></div>
                  <div id="volt-eye-left-pupil"></div>
                  <div id="volt-eye-left-border-top"></div>
                  <div id="volt-eye-left-border-left"></div>
                  <div id="volt-eye-left-border-bottom-1"></div>
                  <div id="volt-eye-left-border-bottom-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AnimationTest;
