import { combineReducers } from "redux";
import { AccountReducer, CenterReducer, FacilitiesReducer, OffersListReducer, OrgInfoReducer } from "./Reducers";
import { SportsListReducer } from "./SportsListReducer";
const reducers = combineReducers({
  offersListData: OffersListReducer,
  AccountReducer: AccountReducer,
  CenterReducer:CenterReducer,
  OrgInfoReducer:OrgInfoReducer,
  FacilitiesReducer:FacilitiesReducer,
  SportsListReducer : SportsListReducer,
});

export default reducers;