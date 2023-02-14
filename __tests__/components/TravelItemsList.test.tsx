import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TravelItemsList from "../../components/TravelItemsList";
import { Provider } from "react-redux";
import { createTestStore } from "../../__mocks__/createTestStore";
import React from "react";

const props = [
    {
        id: 0,
        name: "Test",
        rating: 4.5,
    },
    {
        id: 1,
        name: "Test",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Test",
        rating: 4.5,
    },
];
let store;

describe("TravelItemList", () => {
    beforeEach(() => {
        store = createTestStore();
        render(
            <Provider store={store}>
                <TravelItemsList travelItems={props} />
            </Provider>
        );
    });
    test("should render a list", () => {
        const itemListSection = screen.getByRole("list-section");
        expect(itemListSection).toBeInTheDocument();
    });
    test("should render as many items as there are in props", () => {
        const item = screen.getAllByTestId("itemName");
        expect(item).toHaveLength(props.length);
    });
});
