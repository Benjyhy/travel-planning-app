/**
 * @jest-environment node
 */
import nearbySearch from "../../services/google/nearbySearch";
import axios from "axios";
jest.mock("axios")

describe("getAccomodationPlace", () => {

    test("tests /sleep endpoint", async () => {
        const hotel = {
                "business_status": "OPERATIONAL",
                "geometry": {
                    "location": {
                        "lat": 48.4322836,
                        "lng": -4.4605182
                    },
                    "viewport": {
                        "northeast": {
                            "lat": 48.43350343029149,
                            "lng": -4.459492669708498
                        },
                        "southwest": {
                            "lat": 48.4308054697085,
                            "lng": -4.462190630291503
                        }
                    }
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
                "icon_background_color": "#909CE1",
                "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
                "name": "Hotel Escale Oceania Brest",
                "opening_hours": {
                    "open_now": true
                },
                "photos": [
                    {
                        "height": 2362,
                        "html_attributions": [
                            "<a href=\"https://maps.google.com/maps/contrib/112945456065495444048\">Hôtel Escale Oceania Brest</a>"
                        ],
                        "photo_reference": "Aap_uECs5UDQGtfWZA1sE8KGri7-KkBbs4TPTCEU8N3k1Nq9U2Vr_-nXZ2O5puy5quwUaaB9uVuk8vHI9FAXm4z-GdYWVTF73XgAa-FJFGG3qoc2iBDCyJ7xALoF2r7KamAKwGOjbh6yFXezjbrPJAEl59pf5B1XYxSwIPbL1C3poiO2Uj0P",
                        "width": 3543
                    }
                ],
                "place_id": "ChIJLQoRZ1W6FkgR6Q5mu6XYNJk",
                "plus_code": {
                    "compound_code": "CGJQ+WQ Gouesnou, France",
                    "global_code": "8CWQCGJQ+WQ"
                },
                "rating": 4.2,
                "reference": "ChIJLQoRZ1W6FkgR6Q5mu6XYNJk",
                "scope": "GOOGLE",
                "types": [
                    "lodging",
                    "spa",
                    "bar",
                    "restaurant",
                    "food",
                    "point_of_interest",
                    "establishment"
                ],
                "user_ratings_total": 454,
                "vicinity": "32 Avenue Baron Lacrosse, Gouesnou"
        };
        const resp = { data: { results: hotel } };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(resp);
        // @ts-ignore
        const result = await nearbySearch("48.4323679, -4.4630133", "lodging");
        expect(result).toEqual(hotel);
    })

    test('it returns the name of the hotel in Brest', async () => {
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
            data: {
                results: "Hotel Escale Oceania Brest"
            }
        })
        // @ts-ignore
        const result = await nearbySearch("48.4323679, -4.4630133", "lodging");
        expect(result).toEqual("Hotel Escale Oceania Brest")
    })
});