import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "../../__mocks__/navigator.mock";
import "../../__mocks__/routerFrom.mock";
import Point from "../../pages/places/[point]";
import yourLocationService from "../../services/yourLocationService";
import React from "react";

test("yourLocationService", () => {
    const locExample = {
        lat: expect.stringMatching(/[0-9].[0-9]/),
        long: expect.stringMatching(/[0-9].[0-9]/),
    };
    expect(yourLocationService().lat).toHaveLength(8);
    expect(yourLocationService().long).toHaveLength(8);
    expect(yourLocationService().lat).toEqual(expect.stringContaining("."));
    expect(yourLocationService().long).toEqual(expect.stringContaining("."));
    expect(yourLocationService()).toMatchObject(locExample);
});

describe("Point", () => {
    test("renders a div with position", () => {
        render(<Point />);
        fireEvent.click(screen.getByText("Get your current location"));
        expect(
            screen.getByDisplayValue("51.10000,45.30000")
        ).toBeInTheDocument();
    });
});
