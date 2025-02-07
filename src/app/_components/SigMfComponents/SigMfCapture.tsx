'use client'

import { CaptureDetailsCaptures } from "./Extensions/CaptureDetails";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import { useEffect, useState } from "react";
import SigMfDateInput from "./Inputs/SigMfDateInput";
import { SigMfCapDetsCapType, SigMfCaptureType, SigMfGeoType, SigMfSpatialCaptureType } from "./SigMfInterfaces";
import SigMfGeoInput from "./SigMfGeoInput";
import { changeStateInput, changeStateTextInput } from "./SigMfFunctions";
import { SpatialCapture } from "./Extensions/Spatial";

export default function SigMfCapture({ isHidden, transferCapData }: { isHidden: boolean, transferCapData: Function }) {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);
    const [freq, setFreq] = useState<number|null>(null);
    const [globalIdx, setGlobalIdx] = useState<number|null>(null);
    const [headerBytes, setHeaderBytes] = useState<number|null>(null);
    const [geo, setGeo] = useState<SigMfGeoType|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsCapType|null>(null);
    const [space, setSpace] = useState<SigMfSpatialCaptureType|null>(null);

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    const [capData, setCapData] = useState<SigMfCaptureType>({
        'core:sample_start': null,
    });

    useEffect(() => {
        setCapData({...capData, 'core:sample_start': sampStart});
    }, [sampStart]);

    useEffect(() => {
        changeStateTextInput(capData, datetime, 'core:datetime', setCapData);
    }, [datetime]);

    useEffect(() => {
        changeStateInput(capData, freq, 'core:frequency', setCapData);
    }, [freq]);

    useEffect(() => {
        changeStateInput(capData, globalIdx, 'core:global_index', setCapData);
    }, [globalIdx]);

    useEffect(() => {
        changeStateInput(capData, headerBytes, 'core:header_bytes', setCapData);
    }, [headerBytes]);

    useEffect(() => {
        changeStateInput(capData, geo, 'core:geolocation', setCapData);
    }, [geo]);

    useEffect(() => {
        changeStateInput(capData, capDets, 'capture_details', setCapData);
    }, [capDets]);

    useEffect(() => {
        changeStateInput(capData, space, 'spatial', setCapData);
    }, [space]);

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (!Object.values(capData).includes(null)) {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [capData]);

    function addCapture() {
        if (capData["core:sample_start"] !== null) {
            const retObj: SigMfCaptureType = {...capData};
            if (Object.hasOwn(retObj, 'capture_details')) {
                delete retObj.capture_details;
                Object.keys(capData.capture_details || {}).forEach(key => {
                    retObj[key] = capData.capture_details[key];
                });
            }
            if (Object.hasOwn(retObj, 'spatial')) {
                delete retObj.spatial;
                Object.keys(capData.spatial || {}).forEach(key => {
                    retObj[key] = capData.spatial[key];
                });
            }
            transferCapData(retObj);
        }
    }

    return (
        <div>
            <SigMfNumberInput label="Sample Start" id="capt-sample-start-input" placeholder="0" required changeFunction={setSampStart} hidden={isHidden}/>
            <SigMfDateInput label="Datetime" id="capt-datetime-input" changeFunction={setDatetime} hidden={isHidden} />
            <SigMfNumberInput label="Frequency" id="capt-freq-input" placeholder="0.0" changeFunction={setFreq} hidden={isHidden} />
            <SigMfNumberInput label="Global Index" id="capt-global-idx-input" placeholder="0" changeFunction={setGlobalIdx} hidden={isHidden} />
            <SigMfNumberInput label="Header Bytes" id="capt-head-bytes-input" placeholder="0" changeFunction={setHeaderBytes} hidden={isHidden} />
            <SigMfGeoInput idPart="annot" isHidden={isHidden} changeFunction={setGeo} />
            <CaptureDetailsCaptures isHidden={isHidden} changeFunction={setCapDets}/>
            <SpatialCapture idPart="annot" isHidden={isHidden} changeFunction={setSpace} />
            <button id="add-cap-button" className={`rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500 ${isHidden ? "hidden" : ""}`} disabled={!isButtonEnabled} onClick={addCapture}>Add Capture</button>
        </div>
    );
}