import express from 'express'
import {addPlan, checkInvoice, getRefund} from '../controller'

let router = express.Router();

let sample = (req,res) => { res.status(200).json({"response": "", "apiToken": "ass", "payInvoice": "asass"})}
router.post('/plan', sample);
// router.post('/plan', addPlan);
router.post('/check/invoice', checkInvoice);
router.post('/refund', getRefund);

export default router