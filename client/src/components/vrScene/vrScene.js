import 'aframe-animation-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DynamicElements from './dynamicElements.js'
import SwordMixin from './mixins/swordMixin.js'
import OrcMixin from './mixins/orcMixin.js'
import BigOrcMixin from './mixins/bigOrcMixin.js'
import {PlayerCursorMixin, PlayerTouchMixin} from './mixins/playerMixin.js'
import * as firebase from 'firebase';


class VrScenePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dynamicElements: [],
          firebaseJsonData: []
        };
    }

    // Document ready
    componentDidMount() {
      this.firebaseGetData();
    }

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


    render() {
        return (
          <Scene physics="driver: worker" environment="shadow: true">
            {/*=== Assets ===*/}
            <a-assets>
              {/*=== Images ===*/}
              <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" alt="floor" crossOrigin="anonymous"/>
              {/*<img id="skyTexture" src="http://jp-dorman.co.uk/vrcms/img/sky.png" alt="sky" crossOrigin="anonymous"/>*/}
              <SwordMixin />
              <OrcMixin />
              <BigOrcMixin />
              <PlayerCursorMixin />
              <PlayerTouchMixin />
            </a-assets>

            {/*=== Controls ===*/}
            <Entity progressive-controls="gazeMixin: mycursor; touchMixin: mytouch; override: true">
              {/*=== listing controller entities to set IDs for MoCap replay optional for normal use ===*/}
              <a-entity id="rhand" class="right-controller"></a-entity>
              <a-entity id="lhand" class="left-controller"></a-entity>
            </Entity>

            {/*=== Sky ===*/}
            <a-sky height="2048" radius="30" theta-length="90" width="2048" color='#5fc1ff'></a-sky>

            {/*=== Ground ===*/}
            <a-box id="ground-collider" static-body width="100" height="1" depth="100" visible="false" position="0 -0.5 0"></a-box>

            {/*=== Sword ===*/}
            {/*===<Entity id="sword"
            mixin="sword"
            position="0 1 -0.5"
            color="#7F7F7F"
            data-damage="3"
            dynamic-body="shape: box; cylinderAxis: x; mass: 5">
            </Entity>===*/}

            {/*=== Camera ===*/}
            <Entity camera="userHeight: 1.6" look-controls></Entity>

            {/*=== dynamicElements ===*/}
            {this.state.firebaseJsonData.map((obj, index) => {
                return (
                    <DynamicElements
                        key={index}
                        {...obj}
                    />
                );
            })}
          </Scene>
        );
    }
}

export default VrScenePage;
