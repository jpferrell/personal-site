"use client"

import { useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";

export default function SigMfGeoInput( { idPart }: {idPart: string} ) {

    const [isGeoEnabled, setIsGeoEnabled] = useState<boolean>(false);
    const [geoType, setGeoType] = useState<string>('Point');
    const [lat, setLat] = useState<number|null>(null);
    const [lon, setLon] = useState<number|null>(null);
    const [alt, setAlt] = useState<number|null>(null);

    return (
        <div>
            <SigMfCheckboxInput label="Geolocation" id={`${idPart}-geo-enabled-input`} changeFunction={setIsGeoEnabled} />
            <SigMfTextInput label="Type" id={`${idPart}-geo-type-input`} placeholder="Point" changeFunction={setGeoType} hidden={!isGeoEnabled} required />
            <SigMfNumberInput label="Latitude" id={`${idPart}-geo-lat-input`} placeholder="0.0" hidden={!isGeoEnabled} changeFunction={setLat} required />
            <SigMfNumberInput label="Longitude" id={`${idPart}-geo-lon-input`} placeholder="0.0" hidden={!isGeoEnabled} changeFunction={setLon}  required/>
            <SigMfNumberInput label="Altitude" id={`${idPart}-geo-alt-input`} placeholder="0.0" hidden={!isGeoEnabled} changeFunction={setAlt} />
        </div>
    );
}