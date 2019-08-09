import express from 'express'
import {addPlan, checkInvoice, getRefund, getUserToken} from '../controller'

let router = express.Router();

let sample = (req,res) => { res.status(200).json({"status": "", "apiToken": "ass", "payInvoice": "asass"})}
// router.post('/plan', sample);
router.post('/plan', addPlan);
router.post('/check/invoice', checkInvoice);
router.post('/refund', getRefund);
router.post('/user/token', getUserToken);

export default router