import itineraryReducer from "../../store/reducers/itineraryReducer";
import * as types from "../../store/types";

describe("itineraryReducer reducer", () => {
    test("should handle initial state", () => {
        expect(itineraryReducer(undefined, {})).toEqual({
            googlePlaceIds: [],
        });
    });

    test("should handle ADD_PLACE", () => {
        expect(
            itineraryReducer(undefined, {
                type: types.ADD_PLACE,
                payload: ["62cdRFES5sd"],
            })
        ).toEqual({
            googlePlaceIds: ["62cdRFES5sd"],
        });

        expect(
            itineraryReducer(
                { googlePlaceIds: ["62cdRFES5sd"] },
                {
                    type: types.ADD_PLACE,
                    payload: ["veq5418", "ERVezf54"],
                }
            )
        ).toEqual({
            googlePlaceIds: ["62cdRFES5sd", "veq5418", "ERVezf54"],
        });
    });

    test("should handle REMOVE_PLACE", () => {
        expect(
            itineraryReducer(
                { googlePlaceIds: ["62cdRFES5sd"] },
                {
                    type: types.REMOVE_PLACE,
                    payload: "62cdRFES5sd",
                }
            )
        ).toEqual({
            googlePlaceIds: [],
        });
    });

    test("should handle CLEAR_ITINERARY", () => {
        expect(
            itineraryReducer(
                {},
                {
                    type: types.CLEAR_ITINERARY,
                }
            )
        ).toEqual({
            googlePlaceIds: [],
        });
    });
});
