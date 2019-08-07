import express from 'express'
import {addPlan, checkInvoice, getRefund} from '../controller'

let router = express.Router();

router.post('/plan', addPlan);
router.post('/check/invoice', checkInvoice);
router.post('/refund', getRefund);

export default router