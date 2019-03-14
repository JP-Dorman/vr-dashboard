import React from 'react';
import './snackbar.css'
import * as firebase from 'firebase';


class Snackbar extends React.Component {

  /*==================== Functions ====================*/
  handleAction = (event) => {
    this.props.snackActionFunction(...this.props.snackActionParams);
    this.props.toggleSnackbar('', '', null)
  }

  /*==================== Content ====================*/
  render() {

    return (
      <div id="snackWindow">
        <div id="snack" className={this.props.snackShow}>
          <div id="snackMessage">{this.props.snackMessage}</div>
          <button id="snackAction" onClick={this.handleAction}>
            {this.props.snackActionText}
          </button>
        </div>
      </div>
    );
  };
}

export default Snackbar;
