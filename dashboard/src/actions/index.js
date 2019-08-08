import axios from '../api-axios'


export const purchasePlan = (state) => {
    return async (dispatch) => {
        let response = await axios.post(`/plan`, {
            refundInvoice: state.refundInvoice,
            plan: state.plan.duration
        })
            dispatch({
                type: 'SETRESPONSE',
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
