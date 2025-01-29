"client-side"

import { useState } from "react";
import SigMfInput from "./SigMfInput";

export default function SigMfGeoInput( { idPart } ) {

    const [isGeoEnabled, setIsGeoEnabled] = useState(false);

    return (
        <div>
            {/* TODO: modify the color of the lat lon based on if geolocation is checked */}
            <SigMfInput label="Geolocation" id={`${idPart}-geo-enabled-input`} type="checkbox" changeFuction={setIsGeoEnabled} />
            <SigMfInput label="Type" id={`${idPart}-geo-type-input`} type="text" placeholder="Point" hidden={!isGeoEnabled} />
            <SigMfInput label="Latitude" id={`${idPart}-geo-lat-input`} type="number" placeholder="0.0" hidden={!isGeoEnabled} required />
            <SigMfInput label="Longitude" id={`${idPart}-geo-lon-input`} type="number" placeholder="0.0" hidden={!isGeoEnabled} required />
            <SigMfInput label="Altitude" id={`${idPart}-geo-alt-input`} type="number" placeholder="0.0" hidden={!isGeoEnabled} />
        </div>
    );
}