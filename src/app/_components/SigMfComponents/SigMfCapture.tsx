'use client'

import { CaptureDetailsCaptures } from "./Extensions/CaptureDetails";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import { useEffect, useState } from "react";
import SigMfDateInput from "./Inputs/SigMfDateInput";
import { SigMfCapDetsCapType, SigMfCaptureType, SigMfGeoType } from "./SigMfInterfaces";
import SigMfGeoInput from "./SigMfGeoInput";

export default function SigMfCapture({ isHidden, transferCapData }: { isHidden: boolean, transferCapData: Function }) {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);
    const [freq, setFreq] = useState<number|null>(null);
    const [globalIdx, setGlobalIdx] = useState<number|null>(null);
    const [headerBytes, setHeaderBytes] = useState<number|null>(null);
    const [geo, setGeo] = useState<SigMfGeoType|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsCapType|null>(null);

    const [capData, setCapData] = useState<SigMfCaptureType>({
        'core:sample_start': null,
        'core:datetime': null,
        'core:frequency': null,
        'core:global_index': null,
        'core:header_bytes': null,
        'core:geolocation': null,
        capture_details: null
    });

    function cleanData(dirtyData: SigMfCaptureType) {
        const retObj = {};
        for (const [key, value] of Object.entries(dirtyData)) {
            if (key === 'capture_details') {
                if (dirtyData[key]?.enabled) {
                    for (const [innerKey, innerVal] of Object.entries(dirtyData[key])) {
                        if (innerVal !== null && innerKey !== 'enabled') {
                            retObj[innerKey] = innerVal;
                        }
                    }
                }
            } else {
                if (value !== null) {
                    retObj[key] = value;
                }
            }
        }

        return retObj;
    }

    function addCapture() {
        const retData = cleanData(capData);
        transferCapData(retData);
    }

    useEffect(() => {
        setCapData({
            'core:sample_start': sampStart,
            'core:datetime': datetime,
            'core:frequency': freq,
            'core:global_index': globalIdx,
            'core:header_bytes': headerBytes,
            'core:geolocation': geo,
            capture_details: capDets
        });
    }, [sampStart, datetime, freq, globalIdx, headerBytes, capDets]);

    return (
        <div>
            <SigMfNumberInput label="Sample Start" id="capt-sample-start-input" placeholder="0" required changeFunction={setSampStart} hidden={isHidden}/>
            <SigMfDateInput label="Datetime" id="capt-datetime-input" changeFunction={setDatetime} hidden={isHidden} />
            <SigMfNumberInput label="Frequency" id="capt-freq-input" placeholder="0.0" changeFunction={setFreq} hidden={isHidden} />
            <SigMfNumberInput label="Global Index" id="capt-global-idx-input" placeholder="0" changeFunction={setGlobalIdx} hidden={isHidden} />
            <SigMfNumberInput label="Header Bytes" id="capt-head-bytes-input" placeholder="0" changeFunction={setHeaderBytes} hidden={isHidden} />
            <SigMfGeoInput idPart="annot" isHidden={isHidden} changeFunction={setGeo} />
            <CaptureDetailsCaptures isHidden={isHidden} changeFunction={setCapDets}/>
            <button id="add-cap-button" className={`rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500 ${isHidden ? "hidden" : ""}`} onClick={addCapture}>Add Capture</button>
        </div>
    );
}