import { PositionConfigState } from "../../models/states/positionConfigState";
import { SET_FROM_GEOPOINT, FROM_IS_PATHING, CLEAR_FROM } from "../types";

const initialState: PositionConfigState = {
    pathing: false,
    geoPoint: "",
};

const fromReducer = (
    state = initialState,
    action: { type: string; payload: {} }
) => {
    switch (action.type) {
        case SET_FROM_GEOPOINT:
            return {
                ...state,
                geoPoint: action.payload,
            };
        case FROM_IS_PATHING:
            return {
                ...state,
                pathing: true,
            };
        case CLEAR_FROM:
            return initialState;
        default:
            return state;
    }
};

export default fromReducer;
