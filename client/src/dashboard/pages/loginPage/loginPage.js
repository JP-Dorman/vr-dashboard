import React from 'react';
import '../../index.css';
import './loginPage.css';
import Card from '../../components/card/card.js';
import Input from '../../components/formElements/input/input.js';
import ButtonRow from '../../components/formElements/buttonRow/buttonRow.js';
import Button from '../../components/formElements/button/button.js';
import Snackbar from '../../components/snackbar/snackbar.js';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: "",
      inputPassword: "",
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

  submit = (e) => {
    // Use separate events attached to button OnClicks
    e.preventDefault();
  }


  /*==================== Content ====================*/
  render() {
    const logInOutClass = this.props.loggedIn === false ? "logged-out" : "logged-in";

    const cardContent =
      <div>
        <p>
          Please enter a dummy email address and a fake password at least 6 characters long.
        </p>

        <form onSubmit={
          event => this.submit(event)
        }>

          {/* === Email === */}
          <Input
            label='Email:'
            name='inputEmail'
            value={this.state.inputEmail}
            inputChange={this.inputChange}
            placeholder='Enter faux email..'
            type='email'
          />

          {/* === Password === */}
          <Input
            label='Name:'
            name='inputPassword'
            value={this.state.inputPassword}
            inputChange={this.inputChange}
            placeholder='Enter faux password..'
            type='password'
          />


          {/*=== Buttons ===*/}
          <ButtonRow
            buttons={[
              {
                className: 'buttonContainer flatButton primary',
                type: 'button',
                value: 'Log In',
                onClick: this.props.clickLogin
              },
              {
                className: 'buttonContainer materialButton primary',
                type: 'button',
                value: 'Sign Up',
                onClick: this.props.clickSignup
              }
            ]}
          />
        </form>
      </div>
    ;

    return (
      <div id="login-page">

        <Card
          id='login-card'
          className=''
          cardContent={cardContent}
        />
        {/*<div id="login-card" className={"card " + logInOutClass}>
          <p>
            Please enter a dummy email address and a fake password at least 6 characters long.
          </p>

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
            )
          }>


            <Input
              label='Email:'
              name='inputEmail'
              value={this.state.inputEmail}
              inputChange={this.inputChange}
              placeholder='Enter faux email..'
              type='email'
            />


            <Input
              label='Name:'
              name='inputPassword'
              value={this.state.inputPassword}
              inputChange={this.inputChange}
              placeholder='Enter faux password..'
              type='password'
            />



            <div className="button-container">
              <Button
                className='buttonContainer materialButton secondary'
                type='button'
                value='Sign Up'
              />
              <Button
                className='buttonContainer materialButton primary'
                type='button'
                value='Log In'
              />
            </div>
          </form>*/}
          {/*
          <label>
          <span>Email:</span>
          <input id="input-email" name="inputEmail" type="email" value={this.props.inputEmail} onChange={this.props.handleInputChange} placeholder="Email.." />
          </label>


          <label>
          <span>Password:</span>
          <input id="input-password" name="inputPassword" type="password" value={this.props.inputPassword} onChange={this.props.handleInputChange} placeholder="Password.." />
          </label>

          <button  className="btn btn-primary" onClick={this.props.clickLogin}>Login</button>

          <button id="log-out" className="btn btn-primary" onClick={this.props.clickLogout}>Log Out</button>

          <button id="sign-up" className="btn" onClick={this.props.clickSignup}>Sign Up</button>

          */}
      </div>
    );
  };
}
export default DashboardPage;
