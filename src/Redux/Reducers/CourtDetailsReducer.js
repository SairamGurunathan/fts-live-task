import { Constants } from "../Constants/Constants";

const initialState = {
    courtDetails : [],
};

export const CourtDetailsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_COURTDETAILS:
        return { ...state, courtDetails: payload }; 
      default:
        return state;
    }
  };