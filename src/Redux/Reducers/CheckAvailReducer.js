import { Constants } from "../Constants/Constants";

const initialState = {
    checkavailability:[],
    checkavailabilityError:[]
};

export const CheckAvailabilityReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_CHECKAVAILABILITY:
        return { ...state, checkavailability: payload }; 
      default:
        return state;
    }
  };

  export const CheckAvailabilityErrorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_CHECKAVAILABILITY:
        return { ...state, checkavailabilityError: payload }; 
      default:
        return state;
    }
  };