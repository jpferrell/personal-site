'use client'

import { useEffect, useState } from "react";

import SigMfTextInput from "../Inputs/SigMfTextInput";
import SigMfNumberInput from "../Inputs/SigMfTextInput";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import { SigMfCapDetsAnnotType, SigMfCapDetsCapType } from "../SigMfInterfaces";

export function CaptureDetailsCaptures( { isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function } ) {

    const [isCapEnabled, setIsCapEnabled] = useState<boolean>(false);
    const [acqScaleFactor, setAcqScaleFactor] = useState<number|null>(null);
    const [attn, setAttn] = useState<number|null>(null);
    const [acqBw, setAcqBw] = useState<number|null>(null);
    const [startCap, setStartCap] = useState<string|null>(null);
    const [stopCap, setStopCap] = useState<string|null>(null);
    const [srcFile, setSrcFile] = useState<string|null>(null);
    const [gain, setGain] = useState<number|null>(null);

    const [capDetCapData, setCapDetCapData] = useState<SigMfCapDetsCapType>({
        acqScaleFactor: null,
        attenuation: null,
        acqBw: null,
        startCap: null,
        stopCap: null,
        srcFile: null,
        gain: null
    });

    useEffect(() => {
        setCapDetCapData({
            acqScaleFactor: acqScaleFactor,
            attenuation: attn,
            acqBw: acqBw,
            startCap: startCap,
            stopCap: stopCap,
            srcFile: srcFile,
            gain: gain
        });

        console.log("attenuation: " + capDetCapData.attenuation);
    }, [acqScaleFactor, attn, acqBw, startCap, stopCap, srcFile, gain]);

    useEffect(() => {
        console.log("srcFile: " + capDetCapData.srcFile);
        changeFunction(capDetCapData);
    }, [capDetCapData]);

    return (
        <div>
            <SigMfCheckboxInput label="Capture Details" id="cap-cap-dets-enabled-input" changeFunction={setIsCapEnabled} hidden={isHidden} />
            <SigMfNumberInput label="Acquisition Scale Factor" id="cap-cap-dets-acq-scale-factor-input" required placeholder="0.0" hidden={!isCapEnabled || isHidden} changeFunction={setAcqScaleFactor} />
            <SigMfNumberInput label="Attenuation" id="cap-cap-dets-atten-input" placeholder="0.0" hidden={!isCapEnabled || isHidden} required changeFunction={setAttn} />
            <SigMfNumberInput label="Acquisition Bandwidth" id="cap-cap-dets-acq-bw-input" placeholder="0.0" hidden={!isCapEnabled || isHidden} required changeFunction={setAcqBw} />
            <SigMfTextInput label="Start Capture" id="cap-cap-dets-start-cap-input" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled || isHidden} required  changeFunction={setStartCap} />
            <SigMfTextInput label="Stop Capture" id="cap-cap-dets-stop-cap-input" placeholder="yyyy-mm-ddTHH:MM:SSZ" hidden={!isCapEnabled || isHidden} required  changeFunction={setStopCap} />
            <SigMfTextInput label="Source File" id="cap-cap-dets-src-file-input" placeholder="file" hidden={!isCapEnabled || isHidden} required changeFunction={setSrcFile} />
            <SigMfNumberInput label="Gain" id="cap-cap-dets-gain-input" placeholder="0.0" hidden={!isCapEnabled || isHidden} changeFunction={setGain} />
        </div>
    );
}

export function CaptureDetailsAnnotations({ isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function }) {

    const [isCapEnabled, setIsCapEnabled] = useState<boolean>(false);
    const [snr, setSnr] = useState<number|null>(null);
    const [sigRefNum, setSigRefNum] = useState<number|null>(null);

    const [capDetsAnnotData, setCapDetsAnnotData] = useState<SigMfCapDetsAnnotType>({
        enabled: false,
        snr: null,
        sigRefNum: null
    });

    useEffect(() => {
        setCapDetsAnnotData({
            enabled: isCapEnabled,
            snr: snr,
            sigRefNum: sigRefNum
        });
    }, [isCapEnabled, snr, sigRefNum]);

    useEffect(() => {
        changeFunction(capDetsAnnotData);
    }, [capDetsAnnotData]);

    return (
        <div>
            <SigMfCheckboxInput label="Capture Details" id="annot-cap-dets-enabled-input" changeFunction={setIsCapEnabled} hidden={isHidden} />
            <SigMfNumberInput label="SNR (dB)" id="annot-cap-dets-snr-db-input" placeholder="0.0" hidden={!isCapEnabled || isHidden} required changeFunction={setSnr} />
            <SigMfNumberInput label="Signal Reference Number" id="annot-cap-dets-sig-ref-num" placeholder="number" hidden={!isCapEnabled || isHidden} required changeFunction={setSigRefNum} />
        </div>
    );
}