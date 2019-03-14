import React from 'react';

class OrcMixin extends React.Component {
    render() {
        return (
            <a-mixin id="orc"
            shadow
            material="color: #6B8D5B"
            geometry="primitive: cylinder; radius: 0.5; height: 1.5;">
            </a-mixin>
        );
    };
}

export default OrcMixin;
