import { SET_TO_GEOPOINT, TO_IS_PATHING, CLEAR_TO } from "../types";
import { PositionConfigState } from "../../models/States/PositionConfigState";

const initialState: PositionConfigState = {
    pathing: false,
    geoPoint: "",
};

const toReducer = (
    state = initialState,
    action: { type: string; payload: {} }
) => {
    switch (action.type) {
        case SET_TO_GEOPOINT:
            return {
                ...state,
                geoPoint: action.payload,
            };
        case TO_IS_PATHING:
            return {
                ...state,
                pathing: true,
            };
        case CLEAR_TO:
            return initialState;
        default:
            return state;
    }
};

export default toReducer;
