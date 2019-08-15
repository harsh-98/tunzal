import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { fetchUserTokens } from '../actions'
import ListElement from './ListElement'


import NavBar from './NavBar';


class Landing extends Component {
    constructor() {
        super()
        this.state = { user: {} }
    }

    componentWillMount() {
        if (!this.state.user.hasOwnProperty('username')) {
            this.setState({ user: this.props.userSession.loadUserData() })
            this.props.fetchUserTokens(this.props.userSession.loadUserData().username)
        }
    }

    render() {
        return (
            <div>
                <NavBar title="List tokens" message="Generate Token" endpoint="/#/generate/token"/>
                <Grid container justify="center" spacing={10} style={{marginTop: 10}}>
                    {this.props.userToken.slice(0).reverse().map((val, i) => {
                        return (<Grid item xs={12} sm={10} style={{padding: 10}} key={i} >
                            <ListElement tokenDetails={val} expanded={i==0} />
                        </Grid>)
                    })}
                    {this.props.userToken.length ? "":  "No tokens found"}

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        userSession: state.userSession
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserTokens: (state) => {
            fetchUserTokens(state)(dispatch);
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Landing);
