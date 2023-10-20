import { combineReducers } from "redux";
import { OffersListReducer } from "./Reducers";
const reducers = combineReducers({
  offersListData: OffersListReducer,
});

export default reducers;