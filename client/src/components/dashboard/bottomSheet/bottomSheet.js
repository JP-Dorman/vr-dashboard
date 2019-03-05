import React from 'react';
import './bottomSheet.css'
import * as firebase from 'firebase';


class BottomSheet extends React.Component {

  /*==================== Functions ====================*/
  handleDelete = (event) => {
    const rootRef = firebase.database().ref().child('vrcms');
    const vrEntitiesRef = rootRef.child('vrEntities');
    const userRef = vrEntitiesRef.child(this.props.userId);
    const itemName = this.props.bottomSheetData[0];

    userRef.child(this.props.bottomSheetData[2][0]).remove();
    this.props.toggleBottomSheet( '', [], '');
    this.props.toggleSnackbar(itemName + ' deleted', 'Undo', '' );
  }


  /*==================== Content ====================*/
  render() {
    const bottomSheetHeaderContent = this.props.bottomSheetData[0];
    const bottomSheetBodyContent = this.props.bottomSheetData[1];
    const showClass = this.props.bottomSheetShow === true ? "show" : "";

    return (
      <div id="bottomSheetWindow" className={showClass}>
        <button id="bottomSheetShade"
          onClick={this.props.toggleBottomSheet.bind(this, "", [], "")}>
        </button>
        <div id="bottomSheet">
          <div id="bottomSheetHead">{bottomSheetHeaderContent}</div>
          <div id="bottomSheetBody">
          <ul>
            {bottomSheetBodyContent.map((content, index) => {
              return (
                <li key={index}>
                  <button onClick={this.handleDelete}>
                    <i className="material-icons bottomSheetItemIcon">
                      {content.icon}
                    </i>
                    <span className="bottomSheetItemText">
                      {content.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          </div>
        </div>
      </div>
    );
  };
}

export default BottomSheet;
