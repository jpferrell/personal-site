'use client'

import { CaptureDetailsCaptures } from "./Extensions/CaptureDetails";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import { useState } from "react";
import SigMfDateInput from "./Inputs/SigMfDateInput";
import { SigMfCapDetsCapType } from "./SigMfInterfaces";

export default function SigMfCapture() {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [datetime, setDatetime] = useState<string|null>(null);
    const [freq, setFreq] = useState<number|null>(null);
    const [globalIdx, setGlobalIdx] = useState<number|null>(null);
    const [headerBytes, setHeaderBytes] = useState<number|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsCapType|null>(null);

    return (
        <div>
            <SigMfNumberInput label="Sample Start" id="capt-sample-start-input" placeholder="0" required changeFunction={setSampStart}/>
            <SigMfDateInput label="Datetime" id="capt-datetime-input" changeFunction={setDatetime} />
            <SigMfNumberInput label="Frequency" id="capt-freq-input" placeholder="0.0" changeFunction={setFreq} />
            <SigMfNumberInput label="Global Index" id="capt-global-idx-input" placeholder="0" changeFunction={setGlobalIdx} />
            <SigMfNumberInput label="Header Bytes" id="capt-head-bytes-input" placeholder="0" changeFunction={setHeaderBytes} />
            <CaptureDetailsCaptures />
        </div>
    );
}