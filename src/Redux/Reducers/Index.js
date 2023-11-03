import { combineReducers } from "redux";
import { AccountReducer, CenterReducer, OffersListReducer } from "./Reducers";
const reducers = combineReducers({
  offersListData: OffersListReducer,
  AccountReducer: AccountReducer,
  CenterReducer:CenterReducer
});

export default reducers;