import { createStore, combineReducers } from "redux";
import fromReducer from "../store/reducers/fromReducer";
import toReducer from "../store/reducers/toReducer";
import itineraryReducer from "../store/reducers/itineraryReducer";

export function createTestStore() {
    const store = createStore(
        combineReducers({
            from: fromReducer,
            to: toReducer,
            itinerary: itineraryReducer,
        })
    );
    return store;
}
