'use client'

import { useEffect, useState } from "react";

import SigMfTextInput from "../Inputs/SigMfTextInput";
import SigMfNumberInput from "../Inputs/SigMfTextInput";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";
import { SigMfCapDetsAnnotType, SigMfCapDetsCapType } from "../SigMfInterfaces";
import { changeStateInput, cleanObject } from "../SigMfFunctions";

export function CaptureDetailsCaptures( { isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function } ) {

    const [isCapEnabled, setIsCapEnabled] = useState<boolean>(false);
    const [acqScaleFactor, setAcqScaleFactor] = useState<number|string>("");
    const [attn, setAttn] = useState<number|string>("");
    const [acqBw, setAcqBw] = useState<number|string>("");
    const [startCap, setStartCap] = useState<string>("");
    const [stopCap, setStopCap] = useState<string>("");
    const [srcFile, setSrcFile] = useState<string>("");
    const [gain, setGain] = useState<number|string>("");

    const [capDetCapData, setCapDetCapData] = useState<SigMfCapDetsCapType>({
        enabled: false,
        'capture_details:acq_scale_factor': "",
        'capture_details:attenuation': "",
        'capture_details:acquisition_bandwidth': "",
        'capture_details:start_capture': "",
        'capture_details:stop_capture': "",
        'capture_details:source_file': "",
    });

    useEffect(() => {
        setCapDetCapData({...capDetCapData, enabled: isCapEnabled});
    }, [isCapEnabled]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:acq_scale_factor': acqScaleFactor});
    }, [acqScaleFactor]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:attenuation': attn});
    }, [attn]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:acquisition_bandwidth': acqBw});
    }, [acqBw]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:start_capture': startCap});
    }, [startCap]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:stop_capture': stopCap});
    }, [stopCap]);

    useEffect(() => {
        setCapDetCapData({...capDetCapData, 'capture_details:source_file': srcFile});
    }, [srcFile]);

    useEffect(() => {
        changeStateInput(capDetCapData, gain, 'capture_details:gain', setCapDetCapData);
    }, [gain]);

    useEffect(() => {
       if (capDetCapData.enabled) {
        const tmpObj: SigMfCapDetsCapType = {...capDetCapData};
        delete tmpObj.enabled;
        const retObj: object = cleanObject(tmpObj);
        if (
            Object.hasOwn(retObj, 'capture_details:acq_scale_factor') &&
            Object.hasOwn(retObj, 'capture_details:attenuation') &&
            Object.hasOwn(retObj, 'capture_details:acquisition_bandwidth') &&
            Object.hasOwn(retObj, 'capture_details:start_capture') &&
            Object.hasOwn(retObj, 'capture_details:stop_capture') &&
            Object.hasOwn(retObj, 'capture_details:source_file')
        ) {
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
       } else {
        changeFunction({});
       }
    }, [capDetCapData]);

    return (
        <div id="cap-dets-capture-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
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
    const [snr, setSnr] = useState<number|string>("");
    const [sigRefNum, setSigRefNum] = useState<number|string>("");

    const [capDetsAnnotData, setCapDetsAnnotData] = useState<SigMfCapDetsAnnotType>({
        enabled: false,
        'capture_details:SNRdB': "",
        'capture_details:signal_reference_number': ""
    });

    useEffect(() => {
        setCapDetsAnnotData({...capDetsAnnotData, enabled: isCapEnabled});
    }, [isCapEnabled]);

    useEffect(() => {
        changeStateInput(capDetsAnnotData, snr, 'capture_details:SNRdB', setCapDetsAnnotData);
    }, [snr]);

    useEffect(() => {
        changeStateInput(capDetsAnnotData, sigRefNum, 'capture_details:signal_reference_number', setCapDetsAnnotData);
    }, [sigRefNum]);

    useEffect(() => {
       if (capDetsAnnotData.enabled) {
            const tmpObj: SigMfCapDetsAnnotType = {...capDetsAnnotData};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            if (
                Object.hasOwn(retObj, 'capture_details:SNRdB') &&
                Object.hasOwn(retObj, 'capture_details:signal_reference_number')
            ) {
                changeFunction(retObj);
            } else {
                changeFunction({});
            }
       } else {
        changeFunction({});
       }
    }, [capDetsAnnotData]);

    return (
        <div id="cap-dets-annotation-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Capture Details" id="annot-cap-dets-enabled-input" changeFunction={setIsCapEnabled} hidden={isHidden} />
            <SigMfNumberInput label="SNR (dB)" id="annot-cap-dets-snr-db-input" placeholder="0.0" hidden={!isCapEnabled || isHidden} required changeFunction={setSnr} />
            <SigMfNumberInput label="Signal Reference Number" id="annot-cap-dets-sig-ref-num" placeholder="number" hidden={!isCapEnabled || isHidden} required changeFunction={setSigRefNum} />
        </div>
    );
}