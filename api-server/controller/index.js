import {randomString, validPlanAmount} from './../helpers'
import Token from './../models/Token'
import {generateInvoice} from '../lnd'

export const addPlan = async (req, res) => {
    if(req.body && validPlanAmount(req.body['plan'])){
        const token = randomString(48);
        let pay_req = await generateInvoice(req.body['plan'])
        var newToken = new Token({
            token: token,
            planAmount: req.body['plan'],
            refundInvoice: req.body['refundInvoice'],
            payInvoice: pay_req
		});
        newToken.save((err, response) =>{
			if(err) throw err;
            console.log(response);

		});

        res.status(200).json({"status": "Success", "api-token": token, "payInvoice": pay_req});
    } else {
        res.status(400).json({"Error": "Missing parameter"});
    }
}