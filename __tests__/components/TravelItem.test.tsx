import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TravelItem from "../../components/TravelItem";
import { Provider } from "react-redux";
import { createTestStore } from "../../__mocks__/createTestStore";
import React from "react";

const props = {
    id: 1,
    name: "Test",
    rating: 4.5,
};
let store;
describe("TravelItem", () => {
    beforeEach(() => {
        store = createTestStore();
        jest.mock('react-redux', () => ({
            useDispatch: () => {},
            useSelector: () => ({
              store
            }),
          }));
    });
    test("should render a heading with the name of travel item", () => {
        render(
            <Provider store={store}>
                <TravelItem travelItem={props} key={props.id} />
            </Provider>
        );
        const itemName = screen.getByRole("heading");
        expect(itemName).toHaveTextContent(props.name);
    });
    test("should render a heading with the name of travel item", () => {
        render(
            <Provider store={store}>
                <TravelItem travelItem={props} key={props.id} />
            </Provider>
        );
        const itemRate = screen.getByRole("rating");
        expect(itemRate).toHaveTextContent(props.rating.toString());
    });
});
