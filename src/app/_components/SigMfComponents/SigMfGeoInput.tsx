"use client"

import { useState, useEffect } from "react";

import SigMfNumberInput from "./Inputs/SigMfTextInput";
import SigMfCheckboxInput from "./Inputs/SigMfCheckboxInput";
import SigMfTextInput from "./Inputs/SigMfTextInput";
import { SigMfGeoType } from "./SigMfInterfaces";

export default function SigMfGeoInput( { idPart, isHidden, changeFunction }: {idPart: string, isHidden: boolean, changeFunction: Function} ) {

    const [isGeoEnabled, setIsGeoEnabled] = useState<boolean>(false);
    const [geoType, setGeoType] = useState<string>('Point');
    const [lat, setLat] = useState<number|string>("");
    const [lon, setLon] = useState<number|string>("");
    const [alt, setAlt] = useState<number|string>("");

    const [geoData, setGeoData] = useState<SigMfGeoType>({
        enabled: false,
        type: 'Point',
        lat: "",
        lon: "",
        alt: ""
    });

    useEffect(()=> {
        setGeoData({
            enabled: isGeoEnabled,
            type: geoType,
            lat: lat,
            lon: lon,
            alt: alt
        });
    }, [isGeoEnabled, geoType, lat, lon, alt]);

    useEffect(() => {
        let retVal = {};
        if (geoData.enabled && geoData.type !== "" && geoData.lat !== "" && geoData.lon !== "") {
            if (geoData.alt === "") {
                retVal = {
                    type: geoData.type,
                    coordinates: [geoData.lat, geoData.lon],
                };
            } else {
                retVal = {
                    type: geoData.type,
                    coordinates: [geoData.lat, geoData.lon, geoData.alt]
                };
            }
        }
        changeFunction(retVal);
    }, [geoData])

    return (
        <div hidden={isHidden} className="border-dotted border-2 rounded-lg m-2">
            <SigMfCheckboxInput label="Geolocation" id={`${idPart}-geo-enabled-input`} changeFunction={setIsGeoEnabled} hidden={isHidden} />
            <SigMfTextInput label="Type" id={`${idPart}-geo-type-input`} placeholder="Point" changeFunction={setGeoType} hidden={!isGeoEnabled || isHidden} required />
            <SigMfNumberInput label="Latitude" id={`${idPart}-geo-lat-input`} placeholder="0.0" hidden={!isGeoEnabled || isHidden} changeFunction={setLat} required />
            <SigMfNumberInput label="Longitude" id={`${idPart}-geo-lon-input`} placeholder="0.0" hidden={!isGeoEnabled || isHidden} changeFunction={setLon}  required/>
            <SigMfNumberInput label="Altitude" id={`${idPart}-geo-alt-input`} placeholder="0.0" hidden={!isGeoEnabled || isHidden} changeFunction={setAlt} />
        </div>
    );
}