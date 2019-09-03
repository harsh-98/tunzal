import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import './NavBar.css'
import { connect } from 'react-redux';




class NavBar extends Component {
  constructor() {
    super()
    this.handleMenu = this.handleMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.signOut = this.signOut.bind(this)
    this.state = { anchor: null, open: false, user: {} }
  }

  handleMenu(event) {
    this.setState({ anchor: event.currentTarget, open: !this.state.open });
  }
  handleClose(event) {
    this.setState({ anchor: null, open: false });
  }
  signOut(e) {
    e.preventDefault()
    this.props.userSession.signUserOut()
    window.location = '/'
  }
  componentWillMount() {
    if (!this.state.user.hasOwnProperty('username')) {
      this.setState({ user: this.props.userSession.loadUserData() })
    }
  }
  render() {

    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="userImage" >
              {this.props.title}
            </Typography>
            <Typography variant="h6" className="username">
              {this.state.user.username}
            </Typography>
            <a target='_blank' rel="noopener noreferrer" href="https://github.com/harsh-98/tunzal/releases" style={{color: 'white'}}>
              <IconButton edge="start" color="inherit" aria-label="menu">
              <CloudDownloadIcon/>
              </IconButton>
              </a>
            {true && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => { window.location = this.props.endpoint }}>{this.props.message}</MenuItem>
                  <MenuItem onClick={this.signOut}>Sign out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userSession: state.userSession,
  }
};

const mapDispatchToProps = dispatch => {
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(NavBar);