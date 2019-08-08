import { UserSession, AppConfig } from 'blockstack'
export const initialState = {
    plans: [
        {
            name: "Plan A",
            description: "1 Hr (1 satoshi per min)",
            cost: "60 satoshis",
            duration: 60
        },
        {
            name: "Plan B",
            description: "1 Day (1 satoshi per min)",
            cost: "1440 satoshis",
            duration: 1440
        },
        {
            name: "Plan C",
            description: "1 Month (1 satoshi per min)",
            cost: "1440 satoshis",
            duration: 43200
        },
        {
            name: "Plan D",
            description: "1 Year (1 satoshi per min)",
            cost: "525600 satoshis",
            duration: 525600
        }
    ],
    apikeys: [
        {
            token: "",
            refundInvoice: "",
            useTime: 0,
            planAmount: 60,
            payInvoice: "",
            settleTime: ""
        }
    ],
    response: {},
    userSession: new UserSession({ appConfig: new AppConfig(['store_write', 'publish_data']) })
};