import { Constants } from "../Constants/Constants";

const initialState = {
    addSports : [],
};

export const AddSportsFormReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_ADD_SPORTSFORM:
        return { ...state, addSports: payload }; 
        case Constants.RESET_STATE:
          return initialState;
      default :
        return state;
    }
  };