import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import * as firebase from 'firebase';
import LoginPage from './dashboard/pages/loginPage/loginPage.js';
import EntitiesListPage from './dashboard/pages/entitiesListPage/entitiesListPage.js';
import VrScenePage from './vrScene/vrScene.js';
import Snackbar from './dashboard/components/snackbar/snackbar.js';


/*==================== Firebase Setup ====================*/
var config = {
  apiKey: "AIzaSyC6IXRnUFoLq6effu-oOowAnISefT47Kyk",
  authDomain: "fit-fin-183317.firebaseapp.com",
  databaseURL: "https://fit-fin-183317.firebaseio.com",
  projectId: "fit-fin-183317",
  storageBucket: "fit-fin-183317.appspot.com",
  messagingSenderId: "890661902760"
};
firebase.initializeApp(config);



class App extends React.Component {
    /*==================== State ====================*/
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userEmail: '',
            inputEmail: "",
            inputPassword: "",
            userId: "",
            snackShow: '',
            snackMessage: '',
            snackActionText: '',
            snackActionFunction: null,
            snackActionParams: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount = () => {
        // Realtime login listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.setState ({
                    loggedIn: true,
                    userId: firebaseUser.uid,
                    userEmail: firebaseUser.email
                })
            } else {
                this.setState ({ loggedIn: false })
            }
        });
    }

    /*==================== Login Functions ====================*/
    clickLogin = () => {
        const email = document.getElementsByName("inputEmail")[0].value;
        const password = document.getElementsByName("inputPassword")[0].value;
        const auth = firebase.auth();

        // Make sure snackbar animation doesn't fire by accident
        this.setState({ snackShow: '' });

        // Sign in
        const loginPromise = auth.signInWithEmailAndPassword(email, password);

        // Listen for callback errors
        loginPromise.catch((e) => this.toggleSnackbar(e.message));
    }

    clickSignup = () => {
      const email = document.getElementsByName("inputEmail")[0].value;
      const password = document.getElementsByName("inputPassword")[0].value;
      const auth = firebase.auth();

      // Make sure snackbar animation doesn't fire by accident
      this.setState({ snackShow: '' });

      // Sign in
      const loginPromise = auth.createUserWithEmailAndPassword(email, password);

      // Listen for callback errors
      loginPromise.catch((e) => this.toggleSnackbar(e.message));
    }

    clickLogout = () => {
      // Make sure snackbar animation doesn't fire by accident
      this.setState({ snackShow: '' });
      firebase.auth().signOut();
    }

    handleInputChange = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    toggleSnackbar = (snackMessage, snackActionText, snackActionFunction, snackActionParams) => {
      if (this.state.snackShow === '' || this.state.snackShow === 'hide') {
        this.setState ({
          snackMessage: snackMessage,
          snackActionText: snackActionText,
          snackActionFunction: snackActionFunction,
          snackActionParams: snackActionParams
        });

        // Start timeout for snackbar
        setTimeout(() => {
          if(this.state.snackShow === 'show') {
            this.toggleSnackbar();
          }
        }, 3500);

        this.setState ({ snackShow: 'show' });
      } else {
        this.setState ({ snackShow: 'hide' });
      }
    }

    /*==================== Route Configurations ====================*/
    ConfigureRoutes = () => {
      const loggedIn = this.state.loggedIn;

      if (loggedIn) {
        return (
          <Switch>
            <Route path="/scene"
              render={(routeProps) => (
                <VrScenePage
                  {...routeProps}
                  userId={this.state.userId}
                />
              )}
            />
            <Route path="/"
              render={(routeProps) => (
                <EntitiesListPage
                  {...routeProps}
                  userId={this.state.userId}
                  snackShow={this.state.snackShow}
                  snackMessage={this.state.snackMessage}
                  snackActionText={this.state.snackActionText}
                  snackActionFunction={this.state.snackActionFunction}
                  snackActionParams={this.state.snackActionParams}
                  toggleSnackbar={this.toggleSnackbar}
                  clickLogout={this.clickLogout}
                  userEmail={this.state.userEmail}
                />
              )}
            />
          </Switch>
        );
      } else {
        return (
          <Switch>
              <Route path="/"
                render={(routeProps) => (
                  <LoginPage
                    {...routeProps}
                    loggedIn={ this.state.loggedIn }
                    inputEmail={this.state.inputEmail}
                    inputPassword={this.state.inputPassword}
                    handleInputChange={this.handleInputChange}
                    clickLogin={ this.clickLogin }
                    clickSignup={ this.clickSignup }
                    clickLogout={ this.clickLogout }
                    snackShow={this.state.snackShow}
                    snackMessage={this.state.snackMessage}
                    snackActionText={this.state.snackActionText}
                    snackActionFunction={this.state.snackActionFunction}
                    snackActionParams={this.state.snackActionParams}
                    toggleSnackbar={this.toggleSnackbar}
                  />
                 )}
              />
          </Switch>
        );
      }
    }

    render() {
        return (
            <Router>
                <this.ConfigureRoutes />
            </Router>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
