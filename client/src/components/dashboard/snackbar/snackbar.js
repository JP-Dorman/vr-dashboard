import React from 'react';
import './snackbar.css'
import * as firebase from 'firebase';


class Snackbar extends React.Component {

  /*==================== Functions ====================*/
  handleAction = (event) => {
    this.props.toggleSnackbar('', '', null)
  }

  /*==================== Content ====================*/
  render() {
    const showClass = this.props.snackShow === true ? "show" : "";

    return (
      <div id="snackWindow">
        <div id="snack" className={showClass}>
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
