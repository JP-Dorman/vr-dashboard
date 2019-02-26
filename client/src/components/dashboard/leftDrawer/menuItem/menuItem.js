import React from 'react';
import './menuItem.css';
import * as firebase from 'firebase';


class MenuItem extends React.Component {
    constructor(props) {
       super(props);
       this.state = {

       };
     }

     clickLogout = () => {
         firebase.auth().signOut();
     }

    render() {
        const primaryClass = this.props.isPrimaryItem === true ? "menu-item-primary" :  "";
        const fadedClass = this.props.isFadedItem === true ? "menu-item-faded" :  "";
        const func = this.props.func === "clickLogout" ? this.clickLogout : undefined;


        return (
            <button
                className={"menu-item " + primaryClass +" "+ fadedClass}
                onClick={func}>
                {this.props.text}
            </button>
        );
    };
}

export default MenuItem;
