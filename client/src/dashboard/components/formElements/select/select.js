import React from 'react';
import './select.css'

class Select extends React.Component {

  render() {
    return (
      <label className="selectContainer">
        <span className="selectLabel">{this.props.label}</span>
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.inputChange}
        >
          {this.props.options.map((thisOption, index) => {
            return (
              <option
                key={index}
                value={thisOption.value}>{thisOption.text}
              </option>
            );
          })}
        </select>
      </label>
    );
  };
}

export default Select;
