import { Constants } from "../Constants/Constants";

const initialState = {
  login: [],
  partner: [],
  account: [],
  center: [],
  timezone : [],
  centerList: [],
  orgInfo:[],
  facilities:[]
};
export const OffersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_LOGIN:
      return { ...state, login: payload };
    case Constants.FETCH_PARTNER:
      return { ...state, partner: payload };
    case Constants.FETCH_CENTER:
        return { ...state, center: payload };
    default:
      return state;
  }
};

export const AccountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_ACCOUNT:
      return { ...state, account: payload };
    case Constants.FETCH_TIMEZONE:
        return { ...state, timezone: payload };
    default:
      return state;
  }
};

export const CenterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_CENTERSLIST:
      return { ...state, centerList: payload }; 
    default:
      return state;
  }
};

export const OrgInfoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
      case Constants.FETCH_ORGINFO:
      return { ...state, OrgInfo: payload };  
    default:
      return state;
  }
};

export const FacilitiesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_FACILITIES:
    return { ...state, facilities: payload };  
  default:
    return state;
}
}