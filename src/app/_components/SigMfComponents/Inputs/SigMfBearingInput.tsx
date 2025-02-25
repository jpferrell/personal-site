'use client'

import { useEffect, useState } from "react";
import { SigMfBearingType } from "../SigMfInterfaces";
import SigMfCheckboxInput from "./SigMfCheckboxInput";
import SigMfNumberInput from "./SigMfNumberInput";
import { changeStateInput, cleanObject } from "../SigMfFunctions";

export default function SigMfBearingInput( { idPart, labelPart, isHidden, changeFunction }: { idPart: string, labelPart: string, isHidden: boolean, changeFunction: Function}) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [azimuth, setAzimuth] = useState<number|string>("");
    const [el, setEl] = useState<number|string>("");
    const [range, setRange] = useState<number|string>("");
    const [rangeRate, setRangeRate] = useState<number|string>("");
    const [azErr, setAzErr] = useState<number|string>("");
    const [elErr, setElErr] = useState<number|string>("");
    const [rangeErr, setRangeErr] = useState<number|string>("");
    const [rangeRateErr, setRangeRateErr] = useState<number|string>("");

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
        if (bearing.enabled) {
            const tmpObj = {...bearing};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [bearing]);

    return (
        <div id={`${idPart}-bearing-container`} hidden={isHidden} className="border-dotted border-2 border-slate-200 rounded-lg m-2">
            <SigMfCheckboxInput id={`${idPart}-bearing-enabled-input`} label={`${labelPart} Bearing`} changeFunction={setIsEnabled} hidden={isHidden} />
            <SigMfNumberInput id={`${idPart}-bearing-azimuth-input`} label={`${labelPart} Azimuth`} placeholder="0.0" changeFunction={setAzimuth} hidden={isHidden || !isEnabled}/>
            <SigMfNumberInput id={`${idPart}-bearing-elevation-input`} label={`${labelPart} Elevation`} placeholder="0.0" changeFunction={setEl} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-range-input`} label={`${labelPart} Range`} placeholder="0.0" changeFunction={setRange} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-range-rate-input`} label={`${labelPart} Range Rate`} placeholder="0.0" changeFunction={setRangeRate} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-azimuth-err-input`} label={`${labelPart} Azimuth Error`} placeholder="0.0" changeFunction={setAzErr} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-elevation-err-input`} label={`${labelPart} Elevation Error`} placeholder="0.0" changeFunction={setElErr} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-range-error-input`} label={`${labelPart} Range Error`} placeholder="0.0" changeFunction={setRangeErr} hidden={isHidden || !isEnabled} />
            <SigMfNumberInput id={`${idPart}-bearing-range-rate-err-input`} label={`${labelPart} Range Rate Error`} placeholder="0.0" changeFunction={setRangeRateErr} hidden={isHidden || !isEnabled} />
        </div>
    );
}