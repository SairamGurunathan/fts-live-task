import { Constants } from "../Constants/Constants";

const initialState = {
    filter : [],
    filterDetails : [],
};

export const RefundFilterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_REFUND_FILTER:
        return { ...state, filter: payload }; 
      default:
        return state;
    }
  };

  export const RefundFilterDetailsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_REFUND_FILTER_DETAILS:
        return { ...state, filterDetails: payload }; 
      default:
        return state;
    }
  };