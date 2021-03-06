import {randomString, validPlanAmount} from './../helpers'
import Token from './../models/Token'
import {addInvoice, lookupInvoice, sendPayment} from '../lnd'

export const addPlan = async (req, res) => {
    if(req.body && validPlanAmount(req.body['plan'])){
        const token = randomString(48);
        let generatedInvoice = await addInvoice(req.body['plan'])
        var newToken = new Token({
            token: token,
            planAmount: req.body['plan'],
            username: req.body['username'],
            refundInvoice: req.body['refundInvoice'],
            payInvoice: generatedInvoice['pay_req'],
            rHash: generatedInvoice['r_hash']
		});
        newToken.save((err, response) =>{
			if(err) throw err;
            console.log(response);

		});

        res.status(200).json({"status": "success", "apiToken": token, "payInvoice": generatedInvoice['pay_req']});
    } else {
        res.status(400).json({"response": "Missing parameter", "status": "error"});
    }
};

export const checkInvoice = async (req, res) => {
    if(req.body && req.body['token']){
        let dbResponse = await Token.findOne({token: req.body['token']})
        console.log(dbResponse)
        if(dbResponse['revoked'] && !dbResponse['refunded']){
            let invoiceDetails = await lookupInvoice(dbResponse['rHash'])
            console.log(invoiceDetails)
            if(invoiceDetails['settled']){
                await Token.findOneAndUpdate({token: req.body['token']}, { $set: { revoked: false, settleTime: invoiceDetails['settle_date']} });
                return res.status(200).json({"status": "success", "response": "Token active"});
            } else {
                return res.status(200).json({"status": "warning", "response": "payment pending"});
            }
        }

        if (!dbResponse['revoked'] && !dbResponse['refunded']) {
            return res.status(200).json({"status": "success", "response": "Token already active"});
        }
        return res.status(200).json({"status": "info", "response": "Refund collected, token expired"});
    }
};

export const getRefund = async (req, res) => {
    if(req.body && req.body['token']) {
        let dbResponse = await Token.findOne({token: req.body['token']})
        console.log(dbResponse)
        let refundAmount = dbResponse['planAmount'] - Math.ceil(dbResponse['useTime']/60);
        if(!dbResponse['revoked'] && !dbResponse['refunded'] && refundAmount > 0){
        let lndResponse = await sendPayment(dbResponse['refundInvoice'], refundAmount)
            console.log(lndResponse)
            await Token.findOneAndUpdate({token: req.body['token']}, { $set: { revoked: true ,refunded: true} });
            return res.status(200).json({"status": "success", "response": `Refunded ${refundAmount}`})
        } else if(dbResponse['refunded']) {
            return res.status(200).json({"status": "info", "response": `Already refunded ${refundAmount}`})
        }
        return res.status(200).json({"status": "warning", "response": "Either Token expired or payment not received."});
    }
    res.status(400).json({"response": "Token parameter missing", "status": "error"})
};


export const getUserToken = async (req, res) => {
    if(req.body && req.body['username']) {
        let dbResponse = await Token.find({username: req.body['username']},{payInvoice: 1, token: 1, useTime:1, planAmount: 1, revoked: 1, refunded: 1})
        console.log(dbResponse)
        return res.status(200).json({"tokens": dbResponse, "status": "success"})
    }
    return res.status(400).json({"response": "username missing", "status": "error"})
}
