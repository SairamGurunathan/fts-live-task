import { Constants } from "../Constants/Constants";

const initialState = {
  login: [],
  partner: [],
};
export const OffersListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Constants.FETCH_LOGIN:
      return { ...state, login: payload };
    case Constants.FETCH_PARTNER:
      return { ...state, partner: payload };
    default:
      return state;
  }
};