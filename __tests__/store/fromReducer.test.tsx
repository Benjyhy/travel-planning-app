import fromReducer from "../../store/reducers/fromReducer";
import * as types from "../../store/types";

describe("fromReducer reducer", () => {
    test("should handle initial state", () => {
        expect(fromReducer(undefined, {})).toEqual({
            pathing: false,
            geoPoint: "",
        });
    });

    test("should handle SET_FROM_GEOPOINT", () => {
        expect(
            fromReducer(
                {},
                {
                    type: types.SET_FROM_GEOPOINT,
                    payload: "56.541865,56.541865",
                }
            )
        ).toEqual({
            geoPoint: "56.541865,56.541865",
        });
    });

    test("should handle FROM_IS_PATHING", () => {
        expect(
            fromReducer(
                {},
                {
                    type: types.FROM_IS_PATHING,
                }
            )
        ).toEqual({
            pathing: true,
        });
    });

    test("should handle CLEAR_FROM", () => {
        expect(
            fromReducer(
                {},
                {
                    type: types.CLEAR_FROM,
                }
            )
        ).toEqual({
            pathing: false,
            geoPoint: "",
        });
    });
});
