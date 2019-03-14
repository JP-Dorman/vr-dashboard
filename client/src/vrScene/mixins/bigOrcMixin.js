import React from 'react';

class BigOrcMixin extends React.Component {
    render() {
        return (
            <a-mixin id="bigOrc"
            geometry="radius: 0.6;
              height: 4.5;">
            </a-mixin>
        );
    };
}

export default BigOrcMixin;
