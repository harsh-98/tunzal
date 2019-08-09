import React, { Component } from 'react';
import Landing from './Landing';
import ListUserToken from './ListUserToken';
import { connect } from 'react-redux';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor() {
    super()
    this.signIn = this.signIn.bind(this)
  }

  componentWillMount() {
    const session = this.props.userSession
    console.log(session)
    console.log(session.isUserSignedIn())
    console.log(session.isSignInPending())
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      console.log(session)
      console.log(session)
      console.log("componenetwill")
      session.handlePendingSignIn()
        .then((userData) => {
          if (!userData.username) {
            throw new Error('This app requires a username.')
          }
          window.location = `/plans/${userData.username}`
        })
    }
  }

  signIn(e) {
    console.log("sample")
    console.log(this.props.userSession)
    e.preventDefault()
    this.props.userSession.redirectToSignIn()
  }

  render() {
    return (
      <div>
        {!this.props.userSession.isUserSignedIn() ?
          (
            <Grid style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Fab variant="extended" color="secondary" aria-label="add" onClick={(e)=>{ this.signIn(e)}}>
                <NavigationIcon />
                SignIn with BlockStack
              </Fab>
            </Grid>)
          :
          <Router>
              <Route exact
                path='/plans/:username'
                component={() => <Landing/>}
              />
              <Route exact
                path='/'
                component={() => <Landing/>}
              />
              <Route exact
                path='/list/tokens'
                  component={() => <ListUserToken/>}

              />
          </Router>
        }
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    userSession: state.userSession
  };
};

const mapDispatchToProps = dispatch => {
  return {
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps)(App);
