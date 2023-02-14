import Link from "next/link";
import React from "react";

function PlacesTypesTab({ point }) {
    return (

        <nav className="flex sm:justify-between space-x-4 border-b-2 border-b-slate-100 my-7">
            {[
                ['Eat', `/places/${point}/eat`],
                ['Drink', `/places/${point}/drink`],
                ['Sleep', `/places/${point}/sleep`],
                ['Travel', `/places/${point}/travel`],
                ['Enjoy', `/places/${point}/enjoy`],
            ].map(([title, url]) => (
                <Link href={url} key={title}>
                    <a className="flex-1 text-center rounded px-3 py-2 text-slate-700 font-medium hover:bg-emerald-100 hover:text-slate-900">{title}</a>
                </Link>
            ))}
        </nav>
    );
}

export default PlacesTypesTab;
