import { Constants } from "../Constants/Constants";

const initialState = {
    search:[]
};

export const ResevationSearchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_RESERVASTION_SEARCH:
        return { ...state, search: payload }; 
      default:
        return state;
    }
  };