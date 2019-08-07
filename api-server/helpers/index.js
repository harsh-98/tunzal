import crypto from 'crypto'

export const randomString = (cut) => {
	return crypto.randomBytes(50).toString('hex').slice(0,cut)
}


const COST = [60, 1440, 43200, 525600]
export const validPlanAmount = (planAmount) => {
    return COST.includes(planAmount)
}