import React from 'react';
import './bottomSheet.css'
import * as firebase from 'firebase';


class BottomSheet extends React.Component {
  render() {
    const bottomSheetHeaderContent = this.props.bottomSheetData[0];
    const bottomSheetBodyContent = this.props.bottomSheetData[1];
    const showClass = this.props.bottomSheetShow === true ? "show" : "";
    const itemId = this.props.bottomSheetData[2][0];

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
                  <button onClick={
                    () => this.props.deleteEntity(this.props.userId, itemId, true)
                  }>
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
