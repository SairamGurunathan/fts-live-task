import { combineReducers } from "redux";
import { AccountReducer, CenterReducer, FacilitiesReducer, OffersListReducer, OrgInfoReducer } from "./Reducers";
import { SportsListReducer } from "./SportsListReducer";
import { CourtDetailsReducer } from "./CourtDetailsReducer";
import { AddSportsFormReducer } from "./AddSportsReducer";
import { RefundFilterDetailsReducer, RefundFilterReducer } from "./RefundFilterReducer";
import { FacilitiesMetasReducer } from "./FacilitiesMetasReducer";
import { OrgPhotosReducer } from "./OrgPhotosReducer";
import { FacilitiesPhotoReducer } from "./FacilititesPhotoReducer";
const reducers = combineReducers({
  offersListData: OffersListReducer,
  AccountReducer: AccountReducer,
  CenterReducer:CenterReducer,
  OrgInfoStore:OrgInfoReducer,
  FacilitiesReducer:FacilitiesReducer,
  SportsListReducer : SportsListReducer,
  CourtDetailsReducer : CourtDetailsReducer,
  AddSportsFormReducer : AddSportsFormReducer,
  RefundFilterReducer : RefundFilterReducer,
  RefundFilterDetailsReducer : RefundFilterDetailsReducer,
  FacilitiesMetasReducer : FacilitiesMetasReducer,
  OrgPhotosReducer : OrgPhotosReducer,
  FacilitiesPhotoReducer : FacilitiesPhotoReducer,
});

export default reducers;