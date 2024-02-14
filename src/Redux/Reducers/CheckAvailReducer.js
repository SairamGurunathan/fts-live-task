import { Constants } from "../Constants/Constants";

const initialState = {
    checkavailability:[]
};

export const CheckAvailabilityReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_CHECKAVAILABILITY:
        return { ...state, checkavailability: payload }; 
      default:
        return state;
    }
  };