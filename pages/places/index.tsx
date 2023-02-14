import Head from "next/head";
import React from "react";
import { store } from "../../store/store";
import {
    FROM_IS_PATHING,
    TO_IS_PATHING,
    CLEAR_FROM,
    CLEAR_TO,
    CLEAR_ITINERARY,
} from "../../store/types";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MainAppState } from "../../models/states";
import { ItineraryState } from "../../models/States/ItineraryState";
import { Itinerary } from "../../models/Itinerary";
import { PositionConfigState } from "../../models/States/PositionConfigState";

const Places = () => {
   const router = useRouter()

   const configFrom: PositionConfigState = useSelector(
      (state: MainAppState) => state.from,
   )
   const configTo: PositionConfigState = useSelector(
      (state: MainAppState) => state.to,
   )
   const itinerary: ItineraryState = useSelector(
      (state: MainAppState) => state.itinerary,
   )

    const handleClick = (e: {
        preventDefault: () => void;
        currentTarget: { id: string };
    }): void => {
        e.preventDefault();
        if (e.currentTarget.id == "btn-origin") {
            store.dispatch({
                type: FROM_IS_PATHING,
                payload: undefined,
            });
            router.push("/places/from");
        } else if (e.currentTarget.id == "btn-destination") {
            store.dispatch({
                type: TO_IS_PATHING,
                payload: undefined,
            });
            router.push("/places/to");
        }
    };

    const handleSave = (): void => {
        const newItinerary: Itinerary = {
            name: `itinerary-${Date.now()}`,
            from: configFrom.geoPoint,
            to: configTo.geoPoint,
            itinerary: itinerary.googlePlaceIds,
        };

        const itineraries = JSON.parse(localStorage.getItem("itineraries"));

        if (itineraries) {
            itineraries.push(newItinerary);
            localStorage.setItem("itineraries", JSON.stringify(itineraries));
        } else {
            const objToCreate = JSON.stringify([newItinerary]);
            localStorage.setItem("itineraries", objToCreate);
        }

        const actionsAfterSave = [CLEAR_FROM, CLEAR_TO, CLEAR_ITINERARY];
        actionsAfterSave.forEach((action) => {
            store.dispatch({
                type: action,
                payload: undefined,
            });
        });
        router.push('/');
    };

    return (
        <div className="container flex flex-col justify-top items-center h-screen p-5">
            <Head>
                <title>Create your itinerary</title>
                <meta name="description" content="Draw your path" />
            </Head>
            <h1 className="text-3xl font-bold text-slate-900 text-center mb-5">
                Create your itinerary
            </h1>
            <div className="w-6/12 flex justify-center">
                <button
                    onClick={handleClick}
                    id="btn-origin"
                    className="
                        rounded 
                        bg-emerald-500 
                        flex-1 
                        text-slate-50 
                        font-bold
                        mx-5 
                        py-2 
                        text-center 
                        hover:bg-emerald-400 
                        transition-colors
                    "
                >
                    Configure your origin
                </button>
                <button
                    onClick={handleClick}
                    id="btn-destination"
                    className="
                        rounded 
                        bg-emerald-500 
                        flex-1 
                        text-slate-50 
                        font-bold
                        mx-5 
                        py-2 
                        text-center 
                        hover:bg-emerald-400 
                        transition-colors
                    "
                >
                    Configure your destination
                </button>
            </div>
            {configFrom.pathing && configTo.pathing && (
                <button
                    onClick={handleSave}
                    className="
                rounded 
                bg-emerald-500
                text-slate-50 
                font-bold
                m-5 
                p-2 
                text-center 
                hover:bg-emerald-400 
                transition-colors
            "
                >
                    Save your itinerary
                </button>
            )}
        </div>
    );
};

export default Places
