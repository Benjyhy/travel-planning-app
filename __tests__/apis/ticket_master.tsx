/**
 * @jest-environment node
 */
import getEventsByGeoPoint from "../../services/ticket_master";

describe("getEventsByGeoPoint", () => {
    test("should return an error with message if no string paramater", async () => {
        try {
            // @ts-ignore: Unreachable code error
            await getEventsByGeoPoint(0);
        } catch (e: any) {
            expect(e.message).toMatch(
                "getEventsByGeoPoint needs a string as a parameter"
            );
        }
    });
    test("should throw error if param string length > 9", async () => {
        try {
            // @ts-ignore
            await getEventsByGeoPoint("u140j8f0z");
        } catch (e: any) {
            expect(e.message).toMatch(
                'Query param "geoPoint" must be a valid geoHash which resolves to a latitude within [-90,90] and a longitude within [-180,180] with a maximum length of 9 characters '
            );
        }
    });
});
