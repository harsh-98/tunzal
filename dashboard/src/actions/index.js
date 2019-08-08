import axios from '../api-axios'


export const purchasePlan = (state) => {
    return async (dispatch) => {
        let response = await axios.post(`/plan`, {
            refundInvoice: state.refundInvoice,
            plan: state.plan.duration
        })
            dispatch({
                type: 'PURCHASEPLAN',
                response: response.data
            });

      };
};
