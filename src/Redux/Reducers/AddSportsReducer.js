import { Constants } from "../Constants/Constants";

const initialState = {
    addSports : [],
};

export const AddSportsFormReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_ADD_SPORTSFORM:
        return { ...state, addSports: payload }; 
      default :
        return state;
    }
  };