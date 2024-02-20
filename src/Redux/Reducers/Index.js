import { combineReducers } from "redux";
import { AccountReducer, CenterReducer, FacilitiesReducer, OffersListReducer, OrgInfoReducer } from "./Reducers";
import { RefundFilterDetailsReducer, RefundFilterReducer } from "./RefundFilterReducer";
import { FacilityAllListReducer, FacilityListReducer, SportsListReducer } from "./SportsListReducer";
import { CourtDetailsReducer } from "./CourtDetailsReducer";
import { AddSportsFormReducer } from "./AddSportsReducer";
import { FacilitiesMetasReducer } from "./FacilitiesMetasReducer";
import { OrgPhotosReducer } from "./OrgPhotosReducer";
import { FacilitiesPhotoReducer } from "./FacilititesPhotoReducer";
import resetReducer from "./ResetReducer";
import { ResevationSearchReducer } from "./ResevationSearchReducer";
import { CheckAvailabilityReducer } from "./CheckAvailReducer";
import { PricingRuleReducer } from "./PricingRuleReducer";
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
  resetReducer : resetReducer,
  FacilityListReducer : FacilityListReducer,
  ResevationSearchReducer : ResevationSearchReducer,
  CheckAvailabilityReducer : CheckAvailabilityReducer,
  FacilityAllListReducer : FacilityAllListReducer,
  PricingRuleReducer : PricingRuleReducer,
});

export default reducers;