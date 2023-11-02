import { combineReducers } from "redux";
import { AccountReducer, OffersListReducer } from "./Reducers";
const reducers = combineReducers({
  offersListData: OffersListReducer,
  AccountReducer: AccountReducer
});

export default reducers;