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
        enabled: false,
        'capture_details:acq_scale_factor': null,
        'capture_details:attenuation': null,
        'capture_details:acquisition_bandwidth': null,
        'capture_details:start_capture': null,
        'capture_details:stop_capture': null,
        'capture_details:source_file': null,
        'capture_details:gain': null
    });

    useEffect(() => {
        setCapDetCapData({
            enabled: isCapEnabled,
            'capture_details:acq_scale_factor': acqScaleFactor,
            'capture_details:attenuation': attn,
            'capture_details:acquisition_bandwidth': acqBw,
            'capture_details:start_capture': startCap,
            'capture_details:stop_capture': stopCap,
            'capture_details:source_file': srcFile,
            'capture_details:gain': gain
        });

    }, [acqScaleFactor, attn, acqBw, startCap, stopCap, srcFile, gain]);

    useEffect(() => {
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
        'capture_details:SNRdB': null,
        'capture_details:signal_reference_number': null
    });

    useEffect(() => {
        setCapDetsAnnotData({
            enabled: isCapEnabled,
            'capture_details:SNRdB': snr,
            'capture_details:signal_reference_number': sigRefNum
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