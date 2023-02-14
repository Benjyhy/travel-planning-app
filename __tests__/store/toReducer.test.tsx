import toReducer from "../../store/reducers/toReducer";
import * as types from "../../store/types";

describe("toReducer reducer", () => {
    test("should handle initial state", () => {
        expect(toReducer(undefined, {})).toEqual({
            pathing: false,
            geoPoint: "",
        });
    });

    test("should handle SET_TO_GEOPOINT", () => {
        expect(
            toReducer(
                {},
                {
                    type: types.SET_TO_GEOPOINT,
                    payload: "56.541865,56.541865",
                }
            )
        ).toEqual({
            geoPoint: "56.541865,56.541865",
        });
    });

    test("should handle TO_IS_PATHING", () => {
        expect(
            toReducer(
                {},
                {
                    type: types.TO_IS_PATHING,
                }
            )
        ).toEqual({
            pathing: true,
        });
    });

    test("should handle CLEAR_TO", () => {
        expect(
            toReducer(
                {},
                {
                    type: types.CLEAR_TO,
                }
            )
        ).toEqual({
            pathing: false,
            geoPoint: "",
        });
    });
});
