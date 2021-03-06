import React, { Component } from 'react';
import Main from './Main';
import ListUserToken from './ListUserToken';
import { connect } from 'react-redux';
//import NavigationIcon from '@material-ui/icons/Navigation';
//import Fab from '@material-ui/core/Fab'
//import Grid from '@material-ui/core/Grid'
//import Container from '@material-ui/core/Container'
import Landing from './Landing'
import { HashRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor() {
    super()

  }

  componentWillMount() {
    const session = this.props.userSession
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
        .then((userData) => {
          if (!userData.username) {
            throw new Error('This app requires a username.')
          }
          window.location = "/#/generate/token"
        })
    }
  }



  render() {
    return (
      <div>
        {!this.props.userSession.isUserSignedIn() ?
          (
            // <Grid style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
            //   container
            //   direction="row"
            //   justify="center"
            //   alignItems="center"
            // >
            //   <Fab variant="extended" color="secondary" aria-label="add" onClick={(e)=>{ this.signIn(e)}}>
            //     <NavigationIcon />
            //     SignIn with BlockStack
            //   </Fab>
            // </Grid>
            <Landing userSession={this.props.userSession}/>
            )
          :
          <Router>
              <Route exact
                path='/generate/token'
                component={() => <Main/>}
              />
              <Route exact
                path='/'
                component={() => <Main/>}
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
