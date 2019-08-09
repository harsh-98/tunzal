import React, { Component } from 'react';
import { connect } from 'react-redux';
import { purchasePlan,setResponse } from '../actions'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import './Landing.css';
import MySnackBar from './MySnackBar';
import NavBar from './NavBar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Landing extends Component {
    constructor() {
        super()
        this.state = { refundInvoice: "", plan: { duration: 0 }, index: -1, copied: false, user: {}}
        this.selectPlan = this.selectPlan.bind(this)
        this.renderApiResponse = this.renderApiResponse.bind(this)
        this.apiForm = this.apiForm.bind(this)
        this.copy = this.copy.bind(this)
        this.gotoGenerate = this.gotoGenerate.bind(this)
        this.signOut = this.signOut.bind(this)


        // this.purchase = this.purchase.bind(this)
    }

    componentWillMount(){
        if (!this.state.user.hasOwnProperty('username')){
            this.setState({ user: this.props.userSession.loadUserData()})
        }
    }
    helperText() {
        let amount = this.state.plan.duration;
        if (amount != 0)
            return `You will get refunded on this invoice, once you cancel your subscription. This invoice should be valid for duration of selected plan. In this case, for ${amount * 60} seconds.`
        return ""
    }

    _handleTextFieldChange(e) {
        this.setState({
            refundInvoice: e.target.value
        });
    }

    selectPlan(i) {
        this.setState({ plan: this.props.plans[i], index: i })
    }

    copy() {
        this.setState({copy: true})
    }

    gotoGenerate() {
        console.log("hasad")
        this.props.setResponse({})
        this.setState({ plan: {duration: 0}, index: -1, refundInvoice: "" })
    }

    signOut(e) {
        e.preventDefault()
        this.props.userSession.signUserOut()
        window.location = '/'
    }

    renderApiResponse() {
        return (<div>
            <Grid container spacing={3}>
                <CopyToClipboard text={this.props.response.payInvoice}
                    onCopy={this.copy}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label="PayInvoice"
                            disabled
                            style={{ margin: 10 }}
                            placeholder=""
                            helperText="Pay invoice to active the api-token"
                            fullWidth
                            value={this.props.response.payInvoice}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </CopyToClipboard>
                <CopyToClipboard text={this.props.response.apiToken}
                    onCopy={this.copy}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="outlined-full-width"
                            label="Api Token"
                            disabled
                            style={{ margin: 10 }}
                            placeholder=""
                            helperText="Use this token with tunzal client for enjoying premium features."
                            fullWidth
                            // className="darkStyle"
                            value={this.props.response.apiToken}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </CopyToClipboard>
            </Grid>
            <Button variant="contained" color="primary" onClick={() => this.props.purchasePlan(this.state)}>
                { "Activate": "Activated"}
                    </Button>
            <div className="addButton" onClick={this.gotoGenerate}>
          <Fab aria-label="Add"  color="primary">
          <AddIcon />
          </Fab>
            </div>
        </div>)
    }

    apiForm() {
        return (<div>
            Select Plan
                <Grid container className="flexBox" spacing={2} >
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={10}>
                        {this.props.plans.map((value, i) => (
                            <Grid key={value.name} item>
                                <Card onClick={() => { this.selectPlan(i) }} raised={i == this.state.index} className="raise">
                                    <CardContent>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {value.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {value.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {value.cost}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <TextField
                        id="outlined-full-width"
                        label="RefundInvoice"
                        style={{ margin: 10 }}
                        placeholder="Enter a zero amount invoice"
                        helperText={this.helperText()}
                        fullWidth
                        onChange={this._handleTextFieldChange.bind(this)}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={() => this.props.purchasePlan(this.state)}>
                Purchase
                    </Button>
        </div>)
    }


    render() {
        return (
            <div>
                <NavBar title={this.props.response.hasOwnProperty("payInvoice") ? "Your Tokens": "Generate Token"} username={this.state.user.username} signOut={this.signOut}/>
                <MySnackBar variant="success" message="Copied" open={this.state.copy} />
                <Container maxWidth="lg" className="setplan">
                    {this.props.response.hasOwnProperty("payInvoice") ? this.renderApiResponse() : this.apiForm()}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        plans: state.plans,
        selected: state.selected,
        response: state.response,
        userSession: state.userSession
    };
};

const mapDispatchToProps = dispatch => {
    return {
        purchasePlan: (state) => {
            purchasePlan(state)(dispatch);
        },
        setResponse: (state) => {
            dispatch(setResponse(state));
        },
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps)(Landing);
