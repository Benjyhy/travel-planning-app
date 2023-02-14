import { ADD_PLACE, REMOVE_PLACE, CLEAR_ITINERARY } from "../types";
import { ItineraryState } from "../../models/States/ItineraryState";

const initialState: ItineraryState = {
    googlePlaceIds: [],
};

const itineraryReducer = (
    state = initialState,
    action: {
        payload: any;
        type: any;
    }
) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                googlePlaceIds: state.googlePlaceIds.concat(action.payload),
            };
        case REMOVE_PLACE:
            return {
                ...state,
                googlePlaceIds: state.googlePlaceIds.filter(
                    (id) => id != action.payload
                ),
            };
        case CLEAR_ITINERARY:
            return initialState;
        default:
            return state;
    }
};

export default itineraryReducer;
