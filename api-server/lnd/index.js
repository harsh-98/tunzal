import shell from 'shelljs'
require('dotenv').config()
import {randomString} from '../helpers'



let lncli = `lncli --network testnet --rpcserver=${process.env.LNDURL} --macaroonpath  ${process.env.MACAROONPATH} --tlscertpath ${process.env.TLSPATH}`
export const addInvoice = async (planAmount) => {
    let cmd = `${lncli} addinvoice --amt=${planAmount}`
    console.log(cmd)
    let response = await shell.exec(cmd).stdout
    console.log(JSON.parse(response))

    return JSON.parse(response)
};
export const lookupInvoice = async (rHash) => {
    let cmd = `${lncli} lookupinvoice ${rHash}`
    console.log(cmd)
    let response = await shell.exec(cmd).stdout
    console.log(JSON.parse(response))

    return JSON.parse(response)
};

export const sendPayment = async (invoice, amt) => {
    let cmd = `echo yes | ${lncli} sendpayment --pay_req=${invoice} --amt=${amt}`
    console.log(cmd)
    let response = await shell.exec(cmd).stdout
    console.log(response)

    return ""
}