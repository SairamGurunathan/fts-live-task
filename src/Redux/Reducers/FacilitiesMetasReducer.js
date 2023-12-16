import { Constants } from "../Constants/Constants";

const initialState = {
    facilitesMetas : [],
};

export const FacilitiesMetasReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_METAS:
        return { ...state, facilitesMetas: payload }; 
      default:
        return state;
    }
  };