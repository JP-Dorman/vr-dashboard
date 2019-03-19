import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './buttonRow.css';
import Button from '../button/button.js';

class ButtonRow extends React.Component {
  render() {
    return (
      <div className="buttonRow">
        {this.props.buttons.map((thisButton, index) => {
          return (
            <Button
              key={index}
              {...thisButton}
            />
          );
        })}
      </div>
    );
  };
}

export default ButtonRow;
