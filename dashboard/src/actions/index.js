import axios from '../api-axios'


export const purchasePlan = (state) => {
    return async (dispatch) => {
        let response = await axios.post(`/plan`, {
            refundInvoice: state.refundInvoice,
            plan: state.plan.duration,
            username: state.user.username
        })
            dispatch({
                type: 'SETRESPONSE',
                response: response.data
            });

      };
};
export const activateToken = (token) => {
    return async (dispatch) => {
        let response = await axios.post(`/check/invoice`, {
            token
        })
            dispatch({
                type: 'SETCHECK',
                response: response.data
            });

      };
};
export const getRefund = (token) => {
    return async (dispatch) => {
        let response = await axios.post(`/refund`, {
            token
        })
            dispatch({
                type: 'SETREFUND',
                response: response.data
            });

      };
};
export const fetchUserTokens = (token) => {
    return async (dispatch) => {
        let response = await axios.post(`/user/token`, {
            token
        })
            dispatch({
                type: 'SETUSERTOKENS',
                response: response.data
            });

      };
};

export const setResponse = (response) => {
    return {
        type: "SETRESPONSE",
        response: {}
    }
}
