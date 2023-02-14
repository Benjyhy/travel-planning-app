import React from "react";
import { useSelector } from "react-redux";
import { MainAppState } from "../models/states";
import { store } from "../store/store";
import { ADD_PLACE, REMOVE_PLACE } from "../store/types";

const TravelItem = ({ travelItem }) => {
    const placeIds = useSelector((state: MainAppState) => state.itinerary);

    const handleClick = (e) => {
        e.stopPropagation();
        const place_id = e.currentTarget.getAttribute("data-placeid");
        if (!isPlanned(place_id)) {
            store.dispatch({
                type: ADD_PLACE,
                payload: [place_id],
            });
        } else {
            store.dispatch({
                type: REMOVE_PLACE,
                payload: place_id,
            });
        }
    };
    const isPlanned = (id: string) => {
        return placeIds.googlePlaceIds.some((i: string) => i == id);
    };

    return (
        <div
            onClick={handleClick}
            data-placeid={travelItem.place_id ? travelItem.place_id : ""}
            className={`
             bg-teal-50
             hover:bg-teal-100
             ${isPlanned(travelItem.place_id) ? "bg-teal-200" : "bg-teal-50"}
             px-5
             py-10
             my-5
             h-32
             border
             rounded
             border-teal-300
             shadow-sm
             cursor-pointer
            `}
        >
            <h3 data-testid="itemName" className="font-bold text-slate-700">{travelItem.name} &rarr;</h3>
            <p role="rating" className="text-slate-500">{travelItem.rating}</p>
        </div>
    );
};

export default TravelItem;
