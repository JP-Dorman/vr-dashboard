import React from 'react';
import './menuItem.css';
import * as firebase from 'firebase';


class MenuItem extends React.Component {
    constructor(props) {
       super(props);
       this.state = {

       };
     }

    render() {
        const primaryClass = this.props.isPrimaryItem === true ? "menu-item-primary" :  "";
        const fadedClass = this.props.isFadedItem === true ? "menu-item-faded" :  "";


        return (
            <button
                className={"menu-item " + primaryClass +" "+ fadedClass}
                onClick={this.props.func}>
                {this.props.text}
            </button>
        );
    };
}

export default MenuItem;
