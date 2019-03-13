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
                <button className="entity-button" id={buttonId}
                  onClick={this.props.toggleBottomSheet.bind(this, insertName, [{icon:'delete', text:'Delete'}], [this.props.firebaseKey])} >
                </button>
                <div className="name"><span>{insertName}</span></div>
                <div className="shape"><span>{insertShape}</span></div>
                <div className="colour"><span style={{background: "#" + insertColour}}></span></div>
                <div className="position-x">
                  <span className="dataLabel">Pos X: &nbsp;</span>
                  <span>{insertPositionX}</span>
                </div>
                <div className="position-y">
                  <span className="dataLabel">Pos Y: &nbsp;</span>
                  <span>{insertPositionY}</span>
                </div>
                <div className="position-z">
                  <span className="dataLabel">Pos Z: &nbsp;</span>
                  <span>{insertPositionZ}</span>
                </div>
                <div className="scale-x">
                  <span className="dataLabel">Size X: &nbsp;</span>
                  <span>{insertScaleX}</span>
                </div>
                <div className="scale-y">
                  <span className="dataLabel">Size Y: &nbsp;</span>
                  <span>{insertScaleY}</span>
                </div>
                <div className="scale-z">
                  <span className="dataLabel">Size Z: &nbsp;</span>
                  <span>{insertScaleZ}</span>
                </div>
            </div>
        );
    };
}

export default ExistingEntities;
