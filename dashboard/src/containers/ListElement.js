import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { getRefund, activateToken, clearRefund, clearCheck } from '../actions'
import { connect } from 'react-redux';
import './ListElement.css'
import MySnackBar from './MySnackBar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';




class ListElement extends Component {
    constructor() {
        super()
        this.state={snackbar: {open: false, message: "", status: "success"} }
        this.copyValue = this.copyValue.bind(this)
    }

    copyValue(e) {
        this.setState({ snackbar: {open: true, message: "Copied", status: "success"} })
    }
    componentDidUpdate() {
        if(this.props.check.hasOwnProperty("status")){
            this.setState({ snackbar: {open: true, message: this.props.check.response, status: this.props.check.status} })
            this.props.clearCheck()
        }
        if(this.props.refund.hasOwnProperty("status")){
            this.setState({ snackbar: {open: true, message: this.props.refund.response, status: this.props.refund.status} })
            this.props.clearRefund()
        }
    }

    render() {
        return (
            <div className="root">
                <ExpansionPanel defaultExpanded={this.props.expanded}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div>
                            <Typography className="heading">{`Usage: ${this.props.tokenDetails.useTime}/${this.props.tokenDetails.planAmount * 60}`}</Typography>
                        </div>
                        <div>
                            <Typography className="secondaryHeading"></Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                            <CopyToClipboard text={this.props.tokenDetails.token}
                                onCopy={this.copyValue}>
                                <Chip
                                    avatar={<FileCopyIcon />}
                                    label={`Token: ${this.props.tokenDetails.token.substring(0, 30)}...`}
                                    clickable
                                // onDelete={handleDelete}
                                />
                            </CopyToClipboard>
                            <CopyToClipboard text={this.props.tokenDetails.payInvoice}
                                onCopy={this.copyValue}>
                                <Chip
                                    avatar={<FileCopyIcon />}
                                    label={`PayInvoice: ${this.props.tokenDetails.payInvoice.substring(0, 40)}...`}
                                    clickable

                                // onDelete={handleDelete}
                                />
                            </CopyToClipboard>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" color="primary" onClick={()=> this.props.activateToken(this.props.tokenDetails.token)}>
                            {this.props.tokenDetails.revoked ? "Activate" : "Activated"}
                        </Button>
                        <Button size="small" color="secondary" onClick={()=> this.props.getRefund(this.props.tokenDetails.token)}>
                            {this.props.tokenDetails.refunded ? "Refunded" : "Refund"}
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <MySnackBar variant={this.state.snackbar.status} message={this.state.snackbar.message} open={this.state.snackbar.open} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userToken: state.userToken,
        userSession: state.userSession,
        check: state.check,
        refund: state.refund
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getRefund: (state) => {
            getRefund(state)(dispatch);
        },
        activateToken: (state) => {
            activateToken(state)(dispatch);
        },
        clearRefund: () =>{
            dispatch(clearRefund());
        },
        clearCheck: () =>{
            dispatch(clearCheck());
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ListElement);