'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfAnnotationType, SigMfAntennaAnnotationType, SigMfCapDetsAnnotType, SigMfSignalType, SigMfSpatialAnnotationType, SigMfTraceabilityAnnotationType } from "./SigMfInterfaces";
import { SignalAnnotation } from "./Extensions/SignalAnnotation";
import { changeStateInput, cleanObject } from "./SigMfFunctions";
import { TraceabilityAnnotation } from "./Extensions/Traceability";
import { AntennaAnnotation } from "./Extensions/Antenna";
import { SpatialAnnotation } from "./Extensions/Spatial";

export default function SigMfAnnotation( { isHidden, transferData }: { isHidden: boolean, transferData: Function } ) {

    const [sampStart, setSampStart] = useState<number|string>("");
    const [sampCnt, setSampCnt] = useState<number|string>("");
    const [freqLowEdge, setFreqLowEdge] = useState<number|string>("");
    const [freqHighEdge, setFreqHighEdge] = useState<number|string>("");
    const [label, setLabel] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [generator, setGenerator] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const [capDets, setCapDets] = useState<SigMfCapDetsAnnotType|object>({});
    const [sigAnnot, setSigAnnot] = useState<SigMfSignalType|object>({});
    const [trace, setTrace] = useState<SigMfTraceabilityAnnotationType|object>({});
    const [ant, setAnt] = useState<SigMfAntennaAnnotationType|object>({});
    const [space, setSpace] = useState<SigMfSpatialAnnotationType|object>({});

    const [annotData, setAnnotData] = useState<SigMfAnnotationType>({
        'core:sample_start': "",
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    useEffect(() => {
        setAnnotData({...annotData, "core:sample_start": sampStart});
    }, [sampStart]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, sampCnt, 'core:sample_count', setAnnotData);
    }, [sampCnt]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, freqLowEdge, 'core:freq_lower_edge', setAnnotData);
    }, [freqLowEdge]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, freqHighEdge, 'core:freq_upper_edge', setAnnotData);
    }, [freqHighEdge]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, label, 'core:label', setAnnotData);
    }, [label]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, comment, 'core:comment', setAnnotData);
    }, [comment]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, generator, 'core:generator', setAnnotData);
    }, [generator]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, uuid, 'core:uuid', setAnnotData);
    }, [uuid]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, capDets, 'capture_details', setAnnotData);
    }, [capDets]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, sigAnnot, 'signal', setAnnotData);
    }, [sigAnnot]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, trace, 'traceability', setAnnotData);
    }, [trace]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, ant, 'antenna', setAnnotData);
    }, [ant]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(annotData, space, 'spatial', setAnnotData);
    }, [space]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (annotData["core:sample_start"] !== "") {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [annotData]);

    function addAnnotation() {
        const tmpObj: object = cleanObject(annotData);
        const retObj: object = {};
        if (Object.hasOwn(tmpObj, 'core:sample_start')) {
            for (const key in tmpObj) {
                switch(key) {
                    case 'signal':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'traceability':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'antenna':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    case 'spatial':
                        for (const innerKey in tmpObj[key as keyof typeof tmpObj] as object) {
                            retObj[innerKey as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj][innerKey];
                        }
                        break;
                    default:
                        retObj[key as keyof typeof retObj] = tmpObj[key as keyof typeof tmpObj];
                        break;
                }
            }
        }
        transferData(retObj);
    }

    return (
        <div className="mx-auto">
            <SigMfNumberInput label="Sample Start" id="annot-sample-start-input" placeholder="0" changeFunction={setSampStart} required hidden={isHidden} />
            <SigMfNumberInput label="Sample Count" id="annot-sample-cnt-input" placeholder="0" changeFunction={setSampCnt} hidden={isHidden} />
            <SigMfNumberInput label="Frequency Lower Edge" id="annot-freq-lower-edge-input" placeholder="0.0" changeFunction={setFreqLowEdge} hidden={isHidden} />
            <SigMfNumberInput label="Frequency Upper Edge" id="annot-freq-upper-edge-input" placeholder="0.0" changeFunction={setFreqHighEdge} hidden={isHidden} />
            <SigMfTextInput label="Label" id="annot-label-input" placeholder="label" changeFunction={setLabel} hidden={isHidden} />
            <SigMfTextInput label="Comment" id="annot-comment-input" placeholder="comment" changeFunction={setComment} hidden={isHidden} />
            <SigMfTextInput label="Generator" id="annot-generator-input" placeholder="generator" changeFunction={setGenerator} hidden={isHidden} />
            <SigMfTextInput label="UUID" id="annot-uuid-input" placeholder="uuid" changeFunction={setUuid} hidden={isHidden} />
            <CaptureDetailsAnnotations isHidden={isHidden} changeFunction={setCapDets} />
            <SignalAnnotation idPart="annot" isHidden={isHidden} changeFunction={setSigAnnot} />
            <TraceabilityAnnotation changeFunction={setTrace} isHidden={isHidden} />
            <AntennaAnnotation changeFunction={setAnt} isHidden={isHidden} />
            <SpatialAnnotation idPart="annot-spatial" changeFunction={setSpace} isHidden={isHidden} />
            <button id="add-annot-button" className={`rounded p-2 mt-2 mb-2 mx-auto flex ${isButtonEnabled ? "dark:bg-indigo-800 bg-indigo-400 dark:hover:bg-indigo-900 hover:bg-indigo-500" : "bg-slate-200 text-slate-300 dark:bg-slate-500"}  ${isHidden ? "hidden" : ""} `} disabled={!isButtonEnabled} onClick={addAnnotation} >Add Annotation</button>
        </div>
    );
}