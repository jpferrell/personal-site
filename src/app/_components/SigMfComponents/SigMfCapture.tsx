'use client'

import { CaptureDetailsCaptures } from "./Extensions/CaptureDetails";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import { useEffect, useState } from "react";
import { SigMfCapDetsCapType, SigMfCaptureType, SigMfGeoType, SigMfSpatialCaptureType } from "./SigMfInterfaces";
import SigMfGeoInput from "./SigMfGeoInput";
import { changeStateInput, cleanObject } from "./SigMfFunctions";
import { SpatialCapture } from "./Extensions/Spatial";
import SigMfTextInput from "./Inputs/SigMfTextInput";

export default function SigMfCapture({ isHidden, transferCapData }: { isHidden: boolean, transferCapData: Function }) {

    const [sampStart, setSampStart] = useState<number|string>("");
    const [datetime, setDatetime] = useState<string>("");
    const [freq, setFreq] = useState<number|string>("");
    const [globalIdx, setGlobalIdx] = useState<number|string>("");
    const [headerBytes, setHeaderBytes] = useState<number|string>("");
    const [geo, setGeo] = useState<SigMfGeoType|object>({});
    const [capDets, setCapDets] = useState<SigMfCapDetsCapType|object>({});
    const [space, setSpace] = useState<SigMfSpatialCaptureType|object>({});

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    const [capData, setCapData] = useState<SigMfCaptureType>({
        'core:sample_start': "",
    });

    useEffect(() => {
        setCapData({...capData, 'core:sample_start': sampStart});
    }, [sampStart]);

    useEffect(() => {
        changeStateInput(capData, datetime, 'core:datetime', setCapData);
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
        if (capData["core:sample_start"] !== "") {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [capData]);

    function addCapture() {
        const tmpObj: object = cleanObject(capData);
        const retObj: object = {};
        if (Object.hasOwn(tmpObj, 'core:sample_start')) {
            for (const key in tmpObj) {
                switch (key) {
                    case 'spatial':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'capture_details':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    default:
                        retObj[key as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj];
                }
            }
        }
        transferCapData(retObj);
    }

    return (
        <div className="mx-auto p-2">
            <SigMfNumberInput label="Sample Start" id="capt-sample-start-input" placeholder="0" required changeFunction={setSampStart} hidden={isHidden}/>
            <SigMfTextInput label="Datetime" id="capture-datetime-id" hidden={isHidden} changeFunction={setDatetime} placeholder="yyyy-mm-ddTHH:MM:SSZ"/>
            <SigMfNumberInput label="Frequency" id="capt-freq-input" placeholder="0.0" changeFunction={setFreq} hidden={isHidden} />
            <SigMfNumberInput label="Global Index" id="capt-global-idx-input" placeholder="0" changeFunction={setGlobalIdx} hidden={isHidden} />
            <SigMfNumberInput label="Header Bytes" id="capt-head-bytes-input" placeholder="0" changeFunction={setHeaderBytes} hidden={isHidden} />
            <SigMfGeoInput idPart="annot" isHidden={isHidden} changeFunction={setGeo} />
            <CaptureDetailsCaptures isHidden={isHidden} changeFunction={setCapDets}/>
            <SpatialCapture idPart="annot" isHidden={isHidden} changeFunction={setSpace} />
            <button id="add-cap-button" className={`rounded p-2 mt-2 mb-2 mx-auto flex ${isButtonEnabled ? "dark:bg-indigo-800 bg-indigo-400 dark:hover:bg-indigo-900 hover:bg-indigo-500" : "bg-slate-200 text-slate-300 dark:bg-slate-500"}  ${isHidden ? "hidden" : ""}`} disabled={!isButtonEnabled} onClick={addCapture}>Add Capture</button>
        </div>
    );
}