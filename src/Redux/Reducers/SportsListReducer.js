import { Constants } from "../Constants/Constants";

const initialState = {
    sportsList : [],
};

export const SportsListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_SPORTS_LIST:
        return { ...state, sportsList: payload }; 
      default:
        return state;
    }
  };
  