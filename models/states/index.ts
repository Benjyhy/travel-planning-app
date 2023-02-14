import { ItineraryState } from "./ItineraryState";
import { PositionConfigState } from "./PositionConfigState";

export type MainAppState = {
    from: PositionConfigState;
    to: PositionConfigState;
    itinerary: ItineraryState;
};
