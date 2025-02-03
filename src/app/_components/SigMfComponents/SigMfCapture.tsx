'use client'

import { CaptureDetailsCaptures } from "./Extensions/CaptureDetails";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import { useEffect, useState } from "react";
import SigMfDateInput from "./Inputs/SigMfDateInput";
import { SigMfCapDetsCapType, SigMfCaptureType } from "./SigMfInterfaces";

export default function SigMfCapture({ isHidden, transferCapData }: { isHidden: boolean, transferCapData: Function }) {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);
    const [freq, setFreq] = useState<number|null>(null);
    const [globalIdx, setGlobalIdx] = useState<number|null>(null);
    const [headerBytes, setHeaderBytes] = useState<number|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsCapType|null>(null);

    const [capData, setCapData] = useState<SigMfCaptureType>({
        sampStart: null,
        datetime: null,
        freq: null,
        globalIdx: null,
        headerBytes: null,
        capDets: null
    });

    function addCapture() {
        transferCapData(capData);
    }

    useEffect(() => {
        setCapData({
            sampStart: sampStart,
            datetime: datetime,
            freq: freq,
            globalIdx: globalIdx,
            headerBytes: headerBytes,
            capDets: capDets
        });
    }, [sampStart, datetime, freq, globalIdx, headerBytes, capDets]);

    {/*useEffect(() => {
        addCapture();
    }, [capData]);*/}

    return (
        <div>
            <SigMfNumberInput label="Sample Start" id="capt-sample-start-input" placeholder="0" required changeFunction={setSampStart} hidden={isHidden}/>
            <SigMfDateInput label="Datetime" id="capt-datetime-input" changeFunction={setDatetime} hidden={isHidden} />
            <SigMfNumberInput label="Frequency" id="capt-freq-input" placeholder="0.0" changeFunction={setFreq} hidden={isHidden} />
            <SigMfNumberInput label="Global Index" id="capt-global-idx-input" placeholder="0" changeFunction={setGlobalIdx} hidden={isHidden} />
            <SigMfNumberInput label="Header Bytes" id="capt-head-bytes-input" placeholder="0" changeFunction={setHeaderBytes} hidden={isHidden} />
            <CaptureDetailsCaptures isHidden={isHidden} changeFunction={setCapDets}/>
            <button id="add-cap-button" className={`rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500 ${isHidden ? "hidden" : ""}`} onClick={addCapture}>Add Capture</button>
        </div>
    );
}