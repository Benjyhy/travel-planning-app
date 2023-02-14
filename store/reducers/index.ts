import { combineReducers } from "redux";
import fromReducer from "./fromReducer";
import toReducer from "./toReducer";
import itineraryReducer from "./itineraryReducer";

export default combineReducers({
    from: fromReducer,
    to: toReducer,
    itinerary: itineraryReducer,
});
