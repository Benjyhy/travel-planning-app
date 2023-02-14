import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import Map from "../../pages/map";
import { createTestStore } from "../../__mocks__/createTestStore";
import pathCollection from "../../__mocks__/pathsCollection";
import createGoogleMapsMock from "jest-google-maps-mock";
import "@testing-library/jest-dom";

let store;

describe("Map", () => {
    beforeEach(() => {
        const mockmap = createGoogleMapsMock();
        google.maps = mockmap;
        store = createTestStore();
        const paths = pathCollection;
        const primaryPath = paths[0];
        React.useState = jest.fn().mockReturnValue([primaryPath, {}]);
        render(
            <Provider store={store}>
                <Map />
            </Provider>
        );
    });
    afterAll(() => {
        jest.clearAllMocks();
    });
    test("should render a select", () => {
        const select = screen.getByTestId("selectPath");
        expect(select).toBeInTheDocument();
    });
    test("should render a map", () => {
        const map = document.getElementById("google-map");
        expect(map).toBeInTheDocument();
    });
});
