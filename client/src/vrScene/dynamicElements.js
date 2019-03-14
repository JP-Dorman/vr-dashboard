import React from 'react';
import {Entity} from 'aframe-react';

class DynamicElements extends React.Component {
    render() {

        return (
            <Entity
                geometry={"primitive: " + this.props.primitive}
                position={this.props.positionX +" "+ this.props.positionY +" "+
                    this.props.positionZ}
                material={"color: #" + this.props.color}
            />
        );
    };
}

export default DynamicElements;
