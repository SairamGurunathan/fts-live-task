import { Constants } from "../Constants/Constants";

const initialState = {
    cost:[]
};

export const CostByPriceReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_COST_BY_PRICE:
        return { ...state, cost: payload }; 
      default:
        return state;
    }
  };