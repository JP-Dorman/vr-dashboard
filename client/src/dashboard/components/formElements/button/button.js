import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import './button.css';

class Button extends React.Component {
  render() {
    let content;
    if (this.props.link) {
      content = <div className={this.props.className}>
        <Link to={this.props.link}>
          <div className="rippleContainer"></div>
          <div className="shadowContainer"></div>
          <input
            type={this.props.type}
            value={this.props.value}
          />
        </Link>
      </div>;
    } else {
      content = <div className={this.props.className}>
        <div className="rippleContainer"></div>
        <div className="shadowContainer"></div>
        <input
          type={this.props.type}
          value={this.props.value}
        />
      </div>;
    }
    return (
      content
    );
  };
}

export default Button;
