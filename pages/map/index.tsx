import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { Itinerary } from "../../models/Itinerary";

const paths: Itinerary[] = JSON.parse(
    window.localStorage.getItem("itineraries") || "[]"
);

const primaryPath = paths[0];

function Map() {
    const googlemap = useRef(null);
    const [selectedPath, setSelectedPath] = React.useState(primaryPath);
    const handleAttachGoogleMap = useCallback(() => {
        const lat = Number(selectedPath.from.split(",")[0]);
        const lng = Number(selectedPath.from.split(",")[1]);
        const markers = selectedPath.itinerary;
        let map: any;
        map = new google.maps.Map(document.getElementById("google-map"), {
            center: { lat, lng },
            zoom: 15,
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            zoomControl: false,
        });
        setTimeout(() => {
            handleDrawMarkers(map, markers);
        }, 2000);
    }, [selectedPath.from, selectedPath.itinerary]);

    useEffect(() => {
        document.body.classList.add("is-map");
        handleAttachGoogleMap();
        return () => {
            document.body.classList.remove("is-map");
        };
    }, [handleAttachGoogleMap, selectedPath]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const foundPath = paths.find(
            (path: Itinerary) => path.name === e.target.value
        );
        if (foundPath) setSelectedPath(foundPath);
    };

    const handleDrawMarkers = (map: any, markers: []) => {
        const service = new google.maps.places.PlacesService(map);
        markers.forEach((marker) => {
            service.getDetails(
                {
                    placeId: marker,
                },
                (
                    result: typeof google.maps.Place.PlaceResult,
                    status: typeof google.maps.Place.PlacesDetailsStatus
                ) => {
                    if (status != google.maps.places.PlacesServiceStatus.OK) {
                        alert(status);
                        return;
                    }
                    const point = new google.maps.Marker({
                        map: map,
                        place: {
                            placeId: marker,
                            location: result.geometry.location,
                        },
                    });
                }
            );
        });
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-slate-700 text-center my-5">
                Your itineraries
            </h2>
            <div className="mx-5 w-3/5">
                <p
                    className="text-slate-700 font-semibold"
                    data-testid="selectPath"
                >
                    Select an itinerary to visualize it&nbsp;:
                </p>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                    name=""
                    id=""
                    onChange={handleSelectChange}
                >
                    {paths.map((path: Itinerary) => (
                        <option key={path.name} value={path.name}>
                            {path.name}
                        </option>
                    ))}
                </select>
            </div>
            <div
                id="google-map"
                ref={googlemap}
                className="w-3/5 aspect-video mt-5"
            ></div>
        </div>
    );
}

export default Map;
