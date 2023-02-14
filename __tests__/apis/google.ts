/**
 * @jest-environment node
 */
import axios from "axios";
jest.mock("axios")
import nearbySearch from "../../services/google/nearbySearch";

describe("nearbySearch restaurants", () => {
    test('retourne un objet', async () => {
        const places = {
            business_status: "OPERATIONAL",
            geometry: {
                location: {
                    lat: 50.6380446,
                    lng: 3.0551082
                },
                viewport: {
                    northeast: {
                        lat: 50.6393105802915,
                        lng: 3.056486980291502
                    },
                    southwest: {
                        lat: 50.6366126197085,
                        lng: 3.053789019708498
                    }
                }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
            icon_background_color: "#909CE1",
            icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
            name: "Couvent des Minimes de Lille",
            opening_hours: {
                open_now: true
            },
            photos: [
                {
                    height: 374,
                    html_attributions: [
                        "<a href='https://maps.google.com/maps/contrib/107103514485903672901'>Hôtel Couvent Des Minimes</a>"
                    ],
                    photo_reference: "Aap_uED3x3iTabS7V2FivCh_Yh9RmBKJWcNKRws2xHNaZ-_lTrHucVYVUkT5Y93h_xuIMpmXFT2d5c6JMmMR2fu3lp4BF3JijD7C0sVYNviWWooAE8U9V9RM6YIi3ehAXWlC5chfMKgmkVpIbDq3VKu1za9ynfMD7vB3D4wpi98JGJQDU9j9",
                    width: 664
                }
            ],
            place_id: "ChIJ_06084DVwkcRs3KZA8Rv32s",
            plus_code: {
                compound_code: "J3Q4+62 Lille, France",
                global_code: "9F25J3Q4+62"
            },
            rating: 4.1,
            reference: "ChIJ_06084DVwkcRs3KZA8Rv32s",
            scope: "GOOGLE",
            types: [
                "bar",
                "lodging",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            user_ratings_total: 768,
            vicinity: "17 Quai du Wault, Lille"
        }
        const resp = { data: { results: places } };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(resp);
        // @ts-ignore
        const result = await nearbySearch("50.6380446,3.0551082", "restaurant");
        expect(result).toEqual(places);
    });
});

describe("nearbySearch drinks", () => {
    test('retourne un objet', async () => {
        const places = {
            business_status: "OPERATIONAL",
            geometry:{
                location: {
                    lat: 46.89989079999999,
                    lng: 1.6351126
                },
                viewport: {
                    northeast: {
                        lat: 46.90120073029149,
                        lng: 1.636394630291502
                    },
                    southwest: {
                        lat: 46.89850276970849,
                        lng: 1.633696669708498
                    }
                }
            },
            icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
            icon_background_color: "#4B96F3",
            icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/shopping_pinlet",
            name: "Café des Sports - Chez David & Céline ☕",
            opening_hours: {
                "open_now":true
            },
            photos: [
                {
                height: 3120,
                html_attributions:[
                    "<a href=\"https://maps.google.com/maps/contrib/111327975782629040955\">Jean-François Lacou</a>"
                ],
                photo_reference: "Aap_uEAM2SdaOBpCr91RTeDRIR8bL6Fkb3HwXhddrFry4gRBNCBVMi_-BMVnQ-TZuFN9egJoeZ1HydCbZ4KrIUKclZ2TBTCm_FEk2wlDtyuPxZK0N7lFxMazz1GADf_0AJGRV-eqUEMzO8Y79Ic7NRr2Bf5uzRSX2xiRRJieZcw8uPZ11JeV",
                width: 4160
                }
            ],
            place_id: "ChIJTbek668M-0cR6N1eKzqXfWE",
            plus_code:{
                compound_code: "VJXP+X2 Vineuil, France",
                global_code: "8FR3VJXP+X2"
            },
            price_level:1,
            rating: 4.5,
            reference: "ChIJTbek668M-0cR6N1eKzqXfWE",
            scope: "GOOGLE",
            types: [
                "meal_takeaway",
                "book_store",
                "bar",
                "store",
                "restaurant",
                "point_of_interest",
                "food",
                "establishment"
            ],
            user_ratings_total: 66,
            vicinity: "5 Rue de la Gare, Vineuil"
        }
        const resp = { data: { results: places } };
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(resp);
        // @ts-ignore
        const result = await nearbySearch("46.898002, 1.635191", "bar");
        expect(result).toEqual(places);
    });

    test("should return an empty array", async () => {
        // @ts-ignore
        const res = await nearbySearch('42.983080, 4.323136', 'bar');
        expect(res).toEqual([])
    });

    test("should return an error with message if no string paramater", async () => {
        try {
            // @ts-ignore: Unreachable code error
            await nearbySearch(0, 'drink');
        } catch (e: any) {
            expect(e.message).toMatch(
                "nearbySearch needs"
            );
        }
    });
});

describe("nearbySearch travel", () => {
    test("should return an empty array", async () => {
        // @ts-ignore
        const train_station: Array<any> = await nearbySearch('42.983080, 4.323136', "train_station");
        // @ts-ignore
        const bus_station: Array<any> = await nearbySearch('42.983080, 4.323136', "bus_station");
        // @ts-ignore
        const car_rental: Array<any> = await nearbySearch('42.983080, 4.323136', "car_rental");
        // @ts-ignore
        const taxi_stand: Array<any> = await nearbySearch('42.983080, 4.323136', "taxi_stand");
        // @ts-ignore
        const airport: Array<any> = await nearbySearch('42.983080, 4.323136', "airport");

        let unSortPlaces: Array<any> = train_station.concat(train_station, bus_station, car_rental, taxi_stand, airport )

        let places: Array<any> = []

        unSortPlaces.forEach((place: any) => {
            if(!(places.find((element: any) => element.name === place.name))){
                places.push(place)
            }
        })

        expect(places).toEqual([])
    });

    test("should return an error with message if no string paramater", async () => {
        try {
            // @ts-ignore: Unreachable code error
            await nearbySearch(0, 'train_station');
        } catch (e: any) {
            expect(e.message).toMatch(
                "nearbySearch needs"
            );
        }
    });
});

describe("when API call fails", () => {
    it("should return empty places list", async () => {
        // given
        const message = "Network Error";
        (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(message));

        // when
        // @ts-ignore
        const result = await nearbySearch("50.6380446,3.0551082", "restaurant");

        // then
        expect(result).toEqual([]);
    });
});