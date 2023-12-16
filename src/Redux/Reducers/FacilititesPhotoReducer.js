import { Constants } from "../Constants/Constants";

const initialState = {
    facilitiesPhotos : [],
};

export const FacilitiesPhotoReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_FACILITIES_PHOTO:
        return { ...state, facilitiesPhotos: payload }; 
      default:
        return state;
    }
  };