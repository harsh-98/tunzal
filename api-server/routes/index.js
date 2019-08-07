import express from 'express'
import {addPlan} from '../controller'

let router = express.Router();

router.post('/plan', addPlan);

export default router