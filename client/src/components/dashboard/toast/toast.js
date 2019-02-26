import React from 'react';
import './toast.css'
import * as firebase from 'firebase';


class Modal extends React.Component {

    render() {
        const modalHeaderContent = this.props.modalData[0];
        const modalBodyContent = this.props.modalData[1];
        const showClass = this.props.modalShow === true ? 'show' : '';

        return (
            <div id="">
              
            </div>
        );
    };
}

export default Modal;
