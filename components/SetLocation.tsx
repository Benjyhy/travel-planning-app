import React from "react";
import { store } from "../store/store";
import getYourLocation from "../services/yourLocationService";
import { useState } from "react";
import { SET_TO_GEOPOINT, SET_FROM_GEOPOINT } from "../store/types";
import { useRouter } from "next/router";

const SetLocation = ({ point }) => {
    const router = useRouter();
    const [ownLoc, setOwnLoc] = useState("");

    const getOwnLocation = () => {
        const lat = getYourLocation().lat;
        const long = getYourLocation().long;
        return `${lat},${long}`;
    };

    const handleClick = () => {
        const isOrigin = point === "from";
        store.dispatch({
            type: isOrigin ? SET_FROM_GEOPOINT : SET_TO_GEOPOINT,
            payload: ownLoc,
        });
        router.push({ pathname: `/places/${point}/drink` })
    };
    return (
        <div className="container flex flex-col justify-center items-center p-5 space-y-10">
            <h2 className="text-3xl font-bold text-slate-900 text-center">
                Select a location (lat, long) or define your current location
            </h2>
            <div className="flex">
                <input type="text" defaultValue={ownLoc} className="shadow appearance-none border border-slate-500 rounded text-gray-700 px-2 focus:outline-none focus:shadow-outline" />
                <button onClick={() => setOwnLoc(getOwnLocation())} className="
                        rounded 
                        border-2 
                        border-emerald-500 
                        flex-1 
                        font-bold 
                        text-emerald-500 
                        mx-5 
                        p-2 
                        text-center 
                        transition-all
                        hover:border-emerald-400
                        hover:text-emerald-400
                    ">
                    Get your current location
                </button>
            </div>
            <button onClick={handleClick} className="
                rounded 
                bg-emerald-500 
                flex-1 
                text-slate-50 
                font-bold
                py-3
                text-center 
                hover:bg-emerald-400 
                transition-colors
                w-fit
                px-5
            ">
                Validate
            </button>
        </div>
    );
};

export default SetLocation;
