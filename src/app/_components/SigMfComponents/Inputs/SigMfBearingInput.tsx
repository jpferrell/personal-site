'use client'

import { useEffect, useState } from "react";
import { SigMfBearingType } from "../SigMfInterfaces";
import SigMfCheckboxInput from "./SigMfCheckboxInput";
import SigMfNumberInput from "./SigMfNumberInput";
import { changeStateInput } from "../SigMfFunctions";

export default function SigMfBearingInput( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function}) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [azimuth, setAzimuth] = useState<number|null>(null);
    const [el, setEl] = useState<number|null>(null);
    const [range, setRange] = useState<number|null>(null);
    const [rangeRate, setRangeRate] = useState<number|null>(null);
    const [azErr, setAzErr] = useState<number|null>(null);
    const [elErr, setElErr] = useState<number|null>(null);
    const [rangeErr, setRangeErr] = useState<number|null>(null);
    const [rangeRateErr, setRangeRateErr] = useState<number|null>(null);

    const [bearing, setBearing] = useState<SigMfBearingType>({
        enabled: false
    });

    useEffect(() => {
        setBearing({...bearing, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(bearing, azimuth, 'azimuth', setBearing);
    }, [azimuth]);

    useEffect(() => {
        changeStateInput(bearing, el, 'elevation', setBearing);
    }, [el]);

    useEffect(() => {
        changeStateInput(bearing, range, 'range', setBearing);
    }, [range]);

    useEffect(() => {
        changeStateInput(bearing, rangeRate, 'range_rate', setBearing);
    }, [rangeRate]);

    useEffect(() => {
        changeStateInput(bearing, azErr, 'az_error', setBearing);
    }, [azErr]);

    useEffect(() => {
        changeStateInput(bearing, elErr, 'el_error', setBearing);
    }, [elErr]);

    useEffect(() => {
        changeStateInput(bearing, rangeErr, 'range_error', setBearing);
    }, [rangeErr]);

    useEffect(() => {
        changeStateInput(bearing, rangeRateErr, 'range_rate_error', setBearing);
    }, [rangeRateErr]);

    useEffect(() => {
        if (isEnabled) {
            const retObj = {...bearing};
            delete retObj.enabled;
            changeFunction(retObj);
        } else {
            changeFunction(null);
        }
    }, [bearing]);

    return (
        <div id={`${idPart}-bearing-container`} hidden={isHidden}>
            <SigMfCheckboxInput id={`${idPart}-bearing-enabled-input`} label={`${labelPart} Bearing`} changeFunction={setIsEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-azimuth-input`} label={`${labelPart} Azimuth`} placeholder="0.0" changeFunction={setAzimuth} />
            <SigMfNumberInput id={`${idPart}-bearing-elevation-input`} label={`${labelPart} Elevation`} placeholder="0.0" changeFunction={setEl} />
            <SigMfNumberInput id={`${idPart}-bearing-range-input`} label={`${labelPart} Range`} placeholder="0.0" changeFunction={setRange} />
            <SigMfNumberInput id={`${idPart}-bearing-range-rate-input`} label={`${labelPart} Range Rate`} placeholder="0.0" changeFunction={setRangeRate} />
            <SigMfNumberInput id={`${idPart}-bearing-azimuth-err-input`} label={`${labelPart} Azimuth Error`} placeholder="0.0" changeFunction={setAzErr} />
            <SigMfNumberInput id={`${idPart}-bearing-elevation-err-input`} label={`${labelPart} Elevation Error`} placeholder="0.0" changeFunction={setElErr} />
            <SigMfNumberInput id={`${idPart}-bearing-range-error-input`} label={`${labelPart} Range Error`} placeholder="0.0" changeFunction={setRangeErr} />
            <SigMfNumberInput id={`${idPart}-bearing-range-rate-err-input`} label={`${labelPart} Range Rate Error`} placeholder="0.0" changeFunction={setRangeRateErr} />
        </div>
    );
}