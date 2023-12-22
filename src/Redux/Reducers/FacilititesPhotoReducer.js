import { Constants } from "../Constants/Constants";

const initialState = {
    facilitiesPhotos : [],
};

export const FacilitiesPhotoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_FACILITIES_PHOTO:
        return { ...state, facilitiesPhotos: payload }; 
        case Constants.RESET_STATE:
          return initialState;
      default:
        return state;
    }
  };