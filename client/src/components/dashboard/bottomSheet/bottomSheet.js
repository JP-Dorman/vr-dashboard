import React from 'react';
import './bottomSheet.css'
import * as firebase from 'firebase';


class BottomSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemForDelete: {}
    };
  }

  /*==================== Functions ====================*/
  handleDelete = (event) => {
    const rootRef = firebase.database().ref().child('vrcms');
    const vrEntitiesRef = rootRef.child('vrEntities');
    const userRef = vrEntitiesRef.child(this.props.userId);
    const itemRef = userRef.child(this.props.bottomSheetData[2][0]);
    const itemName = this.props.bottomSheetData[0];
    let getData = {}

    // Grab values of item to delete from database
    // Doesn't make a db request as it uses the global listener's cache
    itemRef.on('value', snap => {
      const metaRef = snap.child('meta');
      const propsRef = snap.child('props');
      getData = {
        entityKey: this.props.bottomSheetData[2][0],
        name: metaRef.child('name').val(),
        shape: propsRef.child('primitive').val(),
        color: propsRef.child('color').val(),
        posX: propsRef.child('positionX').val(),
        posY: propsRef.child('positionY').val(),
        posZ: propsRef.child('positionZ').val(),
        scaleX: propsRef.child('scaleX').val(),
        scaleY: propsRef.child('scaleY').val(),
        scaleZ: propsRef.child('scaleZ').val(),
      }
    });
    // Save data of deleted item locally in a const
    const saveData = getData;

    // Remove item from database and hide delete menu
    itemRef.remove();
    this.props.toggleBottomSheet( '', [], '');

    // Show snackbar and pass undo function as param
    this.props.toggleSnackbar(
      itemName + ' deleted',
      'Undo',
      this.props.submitNewEntity,
      [
        null,
        saveData.entityKey,
        saveData.name,
        saveData.shape,
        saveData.color,
        saveData.posX,
        saveData.posY,
        saveData.posZ,
        saveData.scaleX,
        saveData.scaleY,
        saveData.scaleZ,
      ]
    );
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
