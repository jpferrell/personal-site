'use client'

import { useState } from "react";

import SigMfTextInput from "../Inputs/SigMfTextInput";
import SigMfNumberInput from "../Inputs/SigMfTextInput";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";

export function CaptureDetailsCaptures() {

    const [isCapEnabled, setIsCapEnabled] = useState<boolean>(false);
    const [acqScaleFactor, setAcqScaleFactor] = useState<number|null>(null);
    const [attn, setAttn] = useState<number|null>(null);
    const [acqBw, setAcqBw] = useState<number|null>(null);
    const [startCap, setStartCap] = useState<string|null>(null);
    const [stopCap, setStopCap] = useState<string|null>(null);
    const [srcFile, setSrcFile] = useState<string|null>(null);
    const [gain, setGain] = useState<number|null>(null);

    return (
        <div>
            <SigMfCheckboxInput label="Capture Details" id="cap-cap-dets-enabled-input" changeFunction={setIsCapEnabled} />
            <SigMfNumberInput label="Acquisition Scale Factor" id="cap-cap-dets-acq-scale-factor-input" required placeholder="0.0" hidden={!isCapEnabled} changeFunction={setAcqScaleFactor} />
            <SigMfNumberInput label="Attenuation" id="cap-cap-dets-atten-input" placeholder="0.0" hidden={!isCapEnabled} required changeFunction={setAttn} />
            <SigMfNumberInput label="Acquisition Bandwidth" id="cap-cap-dets-acq-bw-input" placeholder="0.0" hidden={!isCapEnabled} required changeFunction={setAcqBw} />
            <SigMfTextInput label="Start Capture" id="cap-cap-dets-start-cap-input" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled} required  changeFunction={setStartCap} />
            <SigMfTextInput label="Stop Capture" id="cap-cap-dets-stop-cap-input" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled} required  changeFunction={setStopCap} />
            <SigMfTextInput label="Source File" id="cap-cap-dets-src-file-input" placeholder="file" hidden={!isCapEnabled} required changeFunction={setSrcFile} />
            <SigMfNumberInput label="Gain" id="cap-cap-dets-gain-input" placeholder="0.0" hidden={!isCapEnabled} changeFunction={setGain} />
        </div>
    );
}

export function CaptureDetailsAnnotations() {

    const [isCapEnabled, setIsCapEnabled] = useState(false);
    const [snr, setSnr] = useState<number|null>(null);
    const [sigRefNum, setSigRefNum] = useState<number|null>(null);

    return (
        <div>
            <SigMfCheckboxInput label="Capture Details" id="annot-cap-dets-enabled-input" changeFunction={setIsCapEnabled} />
            <SigMfNumberInput label="SNR (dB)" id="annot-cap-dets-snr-db-input" placeholder="0.0" hidden={!isCapEnabled} required changeFunction={setSnr} />
            <SigMfNumberInput label="Signal Reference Number" id="annot-cap-dets-sig-ref-num" placeholder="number" hidden={!isCapEnabled} required changeFunction={setSigRefNum} />
        </div>
    );
}