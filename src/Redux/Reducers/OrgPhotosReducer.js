import { Constants } from "../Constants/Constants";

const initialState = {
    photos : [],
};

export const OrgPhotosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_ORG_PHOTOS:
        return { ...state, photos: payload }; 
      default:
        return state;
    }
  };