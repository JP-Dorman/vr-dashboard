import React from 'react';
import './input.css'

class Input extends React.Component {

  render() {
    return (
      <label className="inputContainer">
        <span className="inputLabel">{this.props.label}</span>
        <input
          name={this.props.name}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.inputChange}
          placeholder={this.props.placeholder}
        />
      </label>
    );
  };
}

export default Input;
