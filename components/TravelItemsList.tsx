import React from "react";
import TravelItem from "./TravelItem";

const TravelItemsList = ({ travelItems }) => {
    return (
        <div role="list-section">
            {travelItems.map((travelItem) => (
                <TravelItem travelItem={travelItem} key={travelItem.id} />
            ))}
        </div>
    );
};

export default TravelItemsList;
