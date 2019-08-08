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

        res.status(200).json({"status": "Success", "apiToken": token, "payInvoice": generatedInvoice['pay_req']});
    } else {
        res.status(400).json({"Error": "Missing parameter"});
    }
};

export const checkInvoice = async (req, res) => {
    if(req.body && req.body['token']){
        let dbResponse = await Token.findOne({token: req.body['token']})
        console.log(dbResponse)
        if(dbResponse['revoked'] == true){
            let invoiceDetails = await lookupInvoice(dbResponse['rHash'])
            console.log(invoiceDetails)
            if(invoiceDetails['settled']){
                await Token.findOneAndUpdate({token: req.body['token']}, { $set: { revoked: false, settleTime: invoiceDetails['settle_date']} });
            } else {
                return res.status(200).json({"status": "Success", "response": "payment pending"});
            }
        }
        Token.findOneAndUpdate({token: req.body['token']}, { $set: { revoked: false } });
        return res.status(200).json({"status": "Success", "response": "Token active"});
    }
};

export const getRefund = async (req, res) => {
    if(req.body && req.body['token']) {
        let dbResponse = await Token.findOne({token: req.body['token']})
        console.log(dbResponse)
        if(dbResponse['revoked'] == false){
            let refundAmount = dbResponse['planAmount'] - dbResponse['useTime'];
        let lndResponse = await sendPayment(dbResponse['refundInvoice'], refundAmount)
            console.log(lndResponse)
            await Token.findOneAndUpdate({token: req.body['token']}, { $set: { revoked: true } });
            return res.status(200).json({"status": "Success", "response": `Refunded ${refundAmount}`})
        }
        return res.status(200).json({"status": "Failed", "response": "Either Token expired or payment not received."});
    }
    res.status(400).json({"Error": "Token parameter missing"})
};

