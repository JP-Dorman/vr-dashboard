import React from 'react';

class PlayerCursorMixin extends React.Component {
    render() {
        return (
            <a-mixin id="mycursor" position="0 0 -0.5" raycaster
            geometry="primitive: ring; radiusOuter: 0.008; radiusInner: 0.005; segmentsTheta: 32"
            material="color: white; shader: flat"
            static-body="shape: sphere; sphereRadius: 0.001"
            super-hands="colliderEvent: raycaster-intersection; colliderEventProperty: els; colliderEndEvent:raycaster-intersection-cleared; colliderEndEventProperty:el; colliderState:">
            </a-mixin>
        );
    };
}

class PlayerTouchMixin extends React.Component {
    render() {
        return (
            <a-mixin id="mytouch" physics-collider phase-shift
            collision-filter="collisionForces: false"
            static-body="shape: sphere; sphereRadius: 0.02"
            super-hands="colliderEvent: collisions; colliderEventProperty: els; colliderEndEvent: collisions; colliderEndEventProperty: clearedEls; colliderState:">
            </a-mixin>
        );
    };
}

export {PlayerCursorMixin, PlayerTouchMixin};
