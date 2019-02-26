import React from 'react';
import './existingEntities.css'


class ExistingEntities extends React.Component {

    render() {
        const insertName = this.props.name;
        const insertShape = this.props.primitive;
        const insertColour = this.props.color;
        const insertPositionX = this.props.positionX;
        const insertPositionY = this.props.positionY;
        const insertPositionZ = this.props.positionZ;
        const insertScaleX = this.props.scaleX;
        const insertScaleY = this.props.scaleY;
        const insertScaleZ = this.props.scaleZ;
        const buttonId = "button-" + this.props.buttonNumber;


        return (
            <div className="entity">
                <button className="entity-button" id={buttonId} onClick={this.props.toggleModal.bind(this, insertName, ["delete"], [this.props.firebaseKey])} ></button>
                <div className="name"><span>{insertName}</span></div>
                <div className="shape"><span>{insertShape}</span></div>
                <div className="colour"><span style={{background: "#" + insertColour}}></span></div>
                <div className="position-x"><span>{insertPositionX}</span></div>
                <div className="position-y"><span>{insertPositionY}</span></div>
                <div className="position-z"><span>{insertPositionZ}</span></div>
                <div className="scale-x"><span>{insertScaleX}</span></div>
                <div className="scale-y"><span>{insertScaleY}</span></div>
                <div className="scale-z"><span>{insertScaleZ}</span></div>
            </div>
        );
    };
}

export default ExistingEntities;
