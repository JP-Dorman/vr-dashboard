import React from 'react';
import './entitiesListPage.css'
import '../../zIndex.css'
import LeftDrawer from '../../components/leftDrawer/leftDrawer.js'
import RightDrawer from '../../components/rightDrawer/rightDrawer.js'
import ExistingEntities from '../../components/existingEntities/existingEntities.js'
import Modal from '../../components/modal/modal.js'
import Snackbar from '../../components/snackbar/snackbar.js'
import BottomSheet from '../../components/bottomSheet/bottomSheet.js'
import AnimationTest from '../../components/animationTest/animationTest.js'
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Button from '../../components/formElements/button/button.js';


class DashboardPage extends React.Component {
    /*==================== State ====================*/
    constructor() {
      super();
      this.state = {
        leftDrawerOpen: false,
        rightDrawerOpen: false,
        jsonData: [],
        modalData:["",[],""],
        modalShow: false,
        bottomSheetShow: false,
        bottomSheetData:["",[],""],
        firebaseJsonData: [],
        latestEntityKey: 0,
      };
    }

    /*==================== Functions ====================*/
    componentDidMount = () => {
      this.firebaseGetData();
    }

    componentDidUpdate = () => { /*...*/ }

    firebaseGetData = () => {
      /*========== Firebase Application ==========*/
      const rootRef = firebase.database().ref().child('vrcms');
      const vrEntitiesRef = rootRef.child('vrEntities');
      const userRef = vrEntitiesRef.child(this.props.userId);

      if (userRef) {
        userRef.on('value', snap => {
          this.setState({ firebaseJsonData: [] });

          // Create new entry for list
          snap.forEach(entity => {
            const meta = entity.child('meta');
            const props = entity.child('props');
            const key = entity.key;

            const pushEntity = {
              "firebaseKey": key,
              "name":  meta.child('name').val(),
              "userId": this.state.userId,
              "primitive": props.child('primitive').val(),
              "color": props.child('color').val(),
              "positionX": props.child('positionX').val(),
              "positionY": props.child('positionY').val(),
              "positionZ": props.child('positionZ').val(),
              "scaleX": props.child('scaleX').val(),
              "scaleY": props.child('scaleY').val(),
              "scaleZ": props.child('scaleZ').val(),
            };

            // Push new item to firebaseJsonData array for populating list
            this.setState(prevState => ({
              firebaseJsonData: [...prevState.firebaseJsonData, pushEntity]
            }));

            // Set new entity id to one above current highest id
            if (key >= this.state.latestEntityKey) {
              this.setState({ latestEntityKey: parseInt(key, 10) + 1 })
            }
          });
        });
      }
    }

    toggleRightDrawer = () => {
      if (this.state.rightDrawerOpen === true) {
        this.setState({ rightDrawerOpen: false });
      } else {
        this.setState({ rightDrawerOpen: true });
      }
    }

    toggleLeftDrawer = () => {
      if (this.state.leftDrawerOpen === true) {
        this.setState({ leftDrawerOpen: false });
      } else {
        this.setState({ leftDrawerOpen: true });
      }
    }

    toggleModal = (headerContent, bodyContent, firebaseNodeKey) => {
      this.setState ({
        modalShow: !this.state.modalShow,
        modalData: [headerContent, bodyContent, firebaseNodeKey]
      });
    }

    toggleBottomSheet = (headerContent, bodyContent, firebaseNodeKey) => {
      if (this.state.bottomSheetShow === false) {
        this.setState ({
          bottomSheetData: [headerContent, bodyContent, firebaseNodeKey]
        });
      }
      this.setState ({
        bottomSheetShow: !this.state.bottomSheetShow,
      });
    }

    submitNewEntity = (e, latestEntityKey, inputName, inputShape, inputColour, inputPositionX, inputPositionY, inputPositionZ, inputScaleX, inputScaleY, inputScaleZ, undoBool) => {
      if (e) { e.preventDefault();}

      const rootRef = firebase.database().ref();
      const parentRef = rootRef.child('vrcms/vrEntities/' + this.props.userId);

      // Create the database entry
      parentRef.child(latestEntityKey).set({
        meta: {
          name: inputName
        },
        props: {
          primitive: inputShape,
          color: inputColour,
          positionX: inputPositionX,
          positionY: inputPositionY,
          positionZ: inputPositionZ,
          scaleX: inputScaleX,
          scaleY: inputScaleY,
          scaleZ: inputScaleZ
        }
      });

      // If you want to trigger an undo, show snackbar and pass undo function as param
      if (undoBool) {
        this.props.toggleSnackbar(
          inputName + ' created',
          'Undo',
          this.deleteEntity,
          [
            this.props.userId,
            latestEntityKey,
            false
          ]
        );
      }
    }

    deleteEntity = (userId, itemId, undoBool) => {
      const rootRef = firebase.database().ref().child('vrcms');
      const vrEntitiesRef = rootRef.child('vrEntities');
      const userRef = vrEntitiesRef.child(userId);
      const itemRef = userRef.child(itemId);
      const itemName = this.state.bottomSheetData[0];
      let getData = {}

      // Grab values of item to delete from database
      // Doesn't make a db request as it uses the global listener's cache
      itemRef.on('value', snap => {
        const metaRef = snap.child('meta');
        const propsRef = snap.child('props');
        getData = {
          entityKey: this.state.bottomSheetData[2][0],
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
      // Save data of deleted item locally in a const to stop firebase updating with null values
      const saveData = getData;

      // Remove item from database and hide delete menu
      itemRef.remove();
      if (this.state.bottomSheetShow === true) {
        this.toggleBottomSheet( '', [], '');
      }

      // If you want to trigger an undo, show snackbar and pass undo function as param
      if (undoBool) {
        this.props.toggleSnackbar(
          itemName + ' deleted',
          'Undo',
          this.submitNewEntity,
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
            false
          ]
        );
      }
    }

    /*==================== Page ====================*/
    render() {
        return (
          <div id="dashboard-page">
            <div id="header-bar">
              <div id="header-bar-left">
                <button onClick={this.toggleLeftDrawer}><i className="material-icons">menu</i></button>
                <h1>Edit Scene</h1>
              </div>

              <div id="header-bar-right">
                <Button
                  className='buttonContainer flatButton secondary'
                  type='button'
                  value='View Scene'
                  link="/scene"
                />
              </div>
            </div>

              <div id="entities">
                {this.state.firebaseJsonData.map((obj, index) => {
                  return (
                    <ExistingEntities
                      key={index}
                      {...obj}
                      buttonNumber={index}
                      toggleBottomSheet={this.toggleBottomSheet}
                    />
                  );
                })}
              </div>

              <button id="fab" onClick={this.toggleRightDrawer}>
                <i className="material-icons">add</i>
              </button>

              <LeftDrawer
                open={this.state.leftDrawerOpen}
                toggleLeftDrawer={this.toggleLeftDrawer}
                clickLogout={this.props.clickLogout}
              />

              <RightDrawer open={this.state.rightDrawerOpen}
                toggleRightDrawer={this.toggleRightDrawer}
                axiosGet={this.getJson}
                jsonData={this.state.jsonData}
                userId={this.props.userId}
                latestEntityKey={this.state.latestEntityKey}
                toggleSnackbar={this.props.toggleSnackbar}
                submitNewEntity={this.submitNewEntity}
              />

              <Modal
                jsonData={this.state.jsonData}
                modalShow={this.state.modalShow}
                modalData={this.state.modalData}
                toggleModal={this.toggleModal}
                userId={this.props.userId}
                toggleSnackbar={this.props.toggleSnackbar}
              />

              <Snackbar
                snackShow={this.props.snackShow}
                snackMessage={this.props.snackMessage}
                snackActionText={this.props.snackActionText}
                snackActionFunction={this.props.snackActionFunction}
                snackActionParams={this.props.snackActionParams}
                toggleSnackbar={this.props.toggleSnackbar}
              />

              <BottomSheet
                jsonData={this.state.firebaseJsonData}
                bottomSheetShow={this.state.bottomSheetShow}
                bottomSheetData={this.state.bottomSheetData}
                toggleBottomSheet={this.toggleBottomSheet}
                userId={this.props.userId}
                toggleSnackbar={this.props.toggleSnackbar}
                submitNewEntity={this.submitNewEntity}
                deleteEntity={this.deleteEntity}
              />

              <AnimationTest />
          </div>
      );
    };
}

export default DashboardPage;
