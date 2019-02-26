import React from 'react';
import './dashboard.css'
import './zIndex.css'
import LeftDrawer from './leftDrawer/leftDrawer.js'
import RightDrawer from './rightDrawer/rightDrawer.js'
import ExistingEntities from './existingEntities/existingEntities.js'
import Modal from './modal/modal.js'
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'


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
            firebaseJsonData: [],
            latestEntityKey: 0,
        };
    }

    /*==================== Doc Ready ====================*/
    componentDidMount = () => {
        this.firebaseGetData();
    }

    componentDidUpdate = () => { /*...*/ }

    /*==================== Functions ====================*/
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
                        <Link to={'/scene'} className="btn btn-negative">View Scene</Link>
                    </div>
                </div>

                <div id="entities">
                    {this.state.firebaseJsonData.map((obj, index) => {
                        return (
                            <ExistingEntities
                            key={index}
                            {...obj}
                            buttonNumber={index}
                            toggleModal={this.toggleModal}
                            />
                        );
                    })}
                </div>

                <button id="fab" onClick={this.toggleRightDrawer}>
                  <i className="material-icons">add</i>
                </button>

                <LeftDrawer open={this.state.leftDrawerOpen}
                    toggleLeftDrawer={this.toggleLeftDrawer}
                />

                <RightDrawer open={this.state.rightDrawerOpen}
                    toggleRightDrawer={this.toggleRightDrawer}
                    axiosGet={this.getJson}
                    jsonData={this.state.jsonData}
                    userId={this.props.userId}
                    latestEntityKey={this.state.latestEntityKey}
                />

                <Modal
                    jsonData={this.state.jsonData}
                    modalShow={this.state.modalShow}
                    modalData={this.state.modalData}
                    toggleModal={this.toggleModal}
                    userId={this.props.userId}
                />
            </div>
        );
    };
}

export default DashboardPage;
