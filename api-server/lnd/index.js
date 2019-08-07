import shell from 'shelljs'
require('dotenv').config()
import {randomString} from '../helpers'



let lncli = `lncli --network testnet --rpcserver=${process.env.LNDURL} --macaroonpath  ${process.env.MACAROONPATH} --tlscertpath ${process.env.TLSPATH}`
export const generateInvoice = async (planAmount) => {
    let cmd = `${lncli} addinvoice --amt=${planAmount}`
    console.log(cmd)
    let response = await shell.exec(cmd).stdout
    console.log(JSON.parse(response))

    return JSON.parse(response)['pay_req']
}