import React from 'react';

class SwordMixin extends React.Component {
    render() {
        return (
            <a-mixin id="sword"
            hoverable grabbable draggable droppable dynamic-body shadow
            rotation="-90 0 0"
            obj-model="obj: url(models/sword/model.obj); mtl: url(models/sword/materials.mtl)">
            </a-mixin>
        );
    };
}

export default SwordMixin;
