import { Constants } from "../Constants/Constants";

const initialState = {
    pricingRule : [],
};

export const PricingRuleReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_PRICING_RULE:
        return { ...state, pricingRule: payload }; 
      default:
        return state;
    }
  };