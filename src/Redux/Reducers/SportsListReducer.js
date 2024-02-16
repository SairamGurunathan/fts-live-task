import { Constants } from "../Constants/Constants";

const initialState = {
    sportsList : [],
    facilityList : [],
    facilityAllList : [],
};

export const SportsListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_SPORTS_LIST:
        return { ...state, sportsList: payload }; 
      default:
        return state;
    }
  };
  
  export const FacilityListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_FACILITYLIST:
        return { ...state, facilityList: payload }; 
      default:
        return state;
    }
  };

  export const FacilityAllListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case Constants.FETCH_ALLFACILITYLIST:
        return { ...state, facilityAllList: payload }; 
      default:
        return state;
    }
  };