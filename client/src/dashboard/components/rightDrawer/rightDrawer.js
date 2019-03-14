import React from 'react';
import './rightDrawer.css'
import * as firebase from 'firebase';
import Input from '../../components/formElements/input/input.js';
import Select from '../../components/formElements/select/select.js';
import Button from '../../components/formElements/button/button.js';

class RightDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: "",
      inputShape: "box",
      inputColour: "F44336",
      inputPositionX: "0",
      inputPositionY: "1",
      inputPositionZ: "-2",
      inputScaleX: "1",
      inputScaleY: "1",
      inputScaleZ: "1"
    };
    this.inputChange = this.inputChange.bind(this);
  }


  /*==================== Functions ====================*/
  inputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox'? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


  /*==================== Content ====================*/
  render() {
    const openDrawer = this.props.open === true ? "open" : "closed";

    return (
      <div id="rightDrawerContainer" className={openDrawer}>
        <button className="shade" onClick={this.props.toggleRightDrawer}>
        </button>
        <div id="rightDrawer">
          <form onSubmit={
            event => this.props.submitNewEntity(
              event,
              this.props.latestEntityKey,
              this.state.inputName,
              this.state.inputShape,
              this.state.inputColour,
              this.state.inputPositionX,
              this.state.inputPositionY,
              this.state.inputPositionZ,
              this.state.inputScaleX,
              this.state.inputScaleY,
              this.state.inputScaleZ,
              true
            )}>

            {/* === Name === */}
            <Input
              label='Name:'
              name='inputName'
              value={this.state.inputName}
              inputChange={this.inputChange}
              placeholder='Enter name..'
            />

            {/* === Shape === */}
            <Select
              label='Shape:'
              name='inputShape'
              value={this.state.inputShape}
              inputChange={this.inputChange}
              options={[
                {value: 'box', text: 'Box'},
                {value: 'sphere', text: 'Sphere'},
                {value: 'cylinder', text: 'Cylinder'},
                {value: 'plane', text: 'Plane'}
              ]}
            />

            {/* === Colour === */}
            <Select
              label='Colour:'
              name='inputColour'
              value={this.state.inputColour}
              inputChange={this.inputChange}
              options={[
                {value: 'F44336', text: 'Red'},
                {value: 'FFEB3B', text: 'Yellow'},
                {value: 'E91E63', text: 'Pink'},
                {value: '4CAF50', text: 'Green'},
                {value: 'FF9800', text: 'Orange'},
                {value: '9C27B0', text: 'Purple'},
                {value: '2196F3', text: 'Blue'},
                {value: '212121', text: 'Black'},
                {value: 'FAFAFA', text: 'White'},
                {value: '9E9E9E', text: 'Grey'},
              ]}
            />

            {/* === Position X === */}
            <Select
              label='Left / Right:'
              name='inputPositionX'
              value={this.state.inputPositionX}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Position Y === */}
            <Select
              label='Up / Down:'
              name='inputPositionY'
              value={this.state.inputPositionY}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Position Z === */}
            <Select
              label='Forward / Backward:'
              name='inputPositionZ'
              value={this.state.inputPositionZ}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Scale X === */}
            <Select
              label='Width:'
              name='inputScaleX'
              value={this.state.inputScaleX}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Scale Y === */}
            <Select
              label='Height:'
              name='inputScaleY'
              value={this.state.inputScaleY}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Scale Z === */}
            <Select
              label='Depth:'
              name='inputScaleZ'
              value={this.state.inputScaleZ}
              inputChange={this.inputChange}
              options={[
                {value: '-5', text: '-5'},
                {value: '-4', text: '-4'},
                {value: '-3', text: '-3'},
                {value: '-2', text: '-2'},
                {value: '-1', text: '-1'},
                {value: '0', text: '0'},
                {value: '1', text: '1'},
                {value: '2', text: '2'},
                {value: '3', text: '3'},
                {value: '4', text: '4'},
                {value: '5', text: '5'},
              ]}
            />

            {/* === Submit === */}
            <Button
              className='buttonContainer materialButton primary'
              type='submit'
              value='Submit'
            />
          </form>
        </div>
      </div>
    );
  };
}

export default RightDrawer;
