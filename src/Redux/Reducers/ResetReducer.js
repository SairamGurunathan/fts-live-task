import { Constants } from "../Constants/Constants";

const initialState = {
  resetState : []
};

const resetReducer = (state = initialState, action) => {
  switch (action) {
    case Constants.RESET_STATE:
      return initialState; 
    default:
      return state;
  }
};

export default resetReducer;