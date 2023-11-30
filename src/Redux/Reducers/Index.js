import { combineReducers } from "redux";
import { AccountReducer, CenterReducer, FacilitiesReducer, OffersListReducer, OrgInfoReducer } from "./Reducers";
import { SportsListReducer } from "./SportsListReducer";
import { CourtDetailsReducer } from "./CourtDetailsReducer";
import { AddSportsFormReducer } from "./AddSportsReducer";
const reducers = combineReducers({
  offersListData: OffersListReducer,
  AccountReducer: AccountReducer,
  CenterReducer:CenterReducer,
  OrgInfoStore:OrgInfoReducer,
  FacilitiesReducer:FacilitiesReducer,
  SportsListReducer : SportsListReducer,
  CourtDetailsReducer : CourtDetailsReducer,
  AddSportsFormReducer : AddSportsFormReducer,
});

export default reducers;