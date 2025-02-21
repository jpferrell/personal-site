'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfAnnotationType, SigMfAntennaAnnotationType, SigMfCapDetsAnnotType, SigMfGeoType, SigMfSignalType, SigMfSpatialAnnotationType, SigMfTraceabilityAnnotationType } from "./SigMfInterfaces";
import { SignalAnnotation } from "./Extensions/SignalAnnotation";
import { changeStateInput, changeStateTextInput } from "./SigMfFunctions";
import { TraceabilityAnnotation } from "./Extensions/Traceability";
import { AntennaAnnotation } from "./Extensions/Antenna";
import { SpatialAnnotation } from "./Extensions/Spatial";

export default function SigMfAnnotation( { isHidden, transferData }: { isHidden: boolean, transferData: Function } ) {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [sampCnt, setSampCnt] = useState<number|null>(null);
    const [freqLowEdge, setFreqLowEdge] = useState<number|null>(null);
    const [freqHighEdge, setFreqHighEdge] = useState<number|null>(null);
    const [label, setLabel] = useState<string|null>(null);
    const [comment, setComment] = useState<string|null>(null);
    const [generator, setGenerator] = useState<string|null>(null);
    const [uuid, setUuid] = useState<string|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsAnnotType|null>(null);
    const [sigAnnot, setSigAnnot] = useState<SigMfSignalType|null>(null);
    const [trace, setTrace] = useState<SigMfTraceabilityAnnotationType|null>(null);
    const [ant, setAnt] = useState<SigMfAntennaAnnotationType|null>(null);
    const [space, setSpace] = useState<SigMfSpatialAnnotationType|null>(null);

    const [annotData, setAnnotData] = useState<SigMfAnnotationType>({
        'core:sample_start': null,
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    useEffect(() => {
        setAnnotData({...annotData, "core:sample_start": sampStart});
    }, [sampStart]);

    useEffect(() => {
        changeStateInput(annotData, sampCnt, 'core:sample_count', setAnnotData);
    }, [sampCnt]);

    useEffect(() => {
        changeStateInput(annotData, freqLowEdge, 'core:freq_lower_edge', setAnnotData);
    }, [freqLowEdge]);

    useEffect(() => {
        changeStateInput(annotData, freqHighEdge, 'core:freq_upper_edge', setAnnotData);
    }, [freqHighEdge]);

    useEffect(() => {
        changeStateTextInput(annotData, label, 'core:label', setAnnotData);
    }, [label]);

    useEffect(() => {
        changeStateTextInput(annotData, comment, 'core:comment', setAnnotData);
    }, [comment]);

    useEffect(() => {
        changeStateTextInput(annotData, generator, 'core:generator', setAnnotData);
    }, [generator]);

    useEffect(() => {
        changeStateTextInput(annotData, uuid, 'core:uuid', setAnnotData);
    }, [uuid]);

    useEffect(() => {
        changeStateInput(annotData, capDets, 'capture_details', setAnnotData);
    }, [capDets]);

    useEffect(() => {
        changeStateInput(annotData, sigAnnot, 'signal', setAnnotData);
    }, [sigAnnot]);

    useEffect(() => {
        changeStateInput(annotData, trace, 'traceability', setAnnotData);
    }, [trace]);

    useEffect(() => {
        changeStateInput(annotData, ant, 'antenna', setAnnotData);
    }, [ant]);

    useEffect(() => {
        changeStateInput(annotData, space, 'spatial', setAnnotData);
    }, [space]);

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (!Object.values(annotData).includes(null)) {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [annotData]);

    function addAnnotation() {
        const retObj: SigMfAnnotationType = {...annotData};
        if (Object.hasOwn(retObj, 'capture_details')) {
            delete retObj.capture_details;
            Object.keys(annotData.capture_details || {}).forEach(key => {
                retObj[key as keyof typeof retObj] = annotData.capture_details[key as keyof typeof annotData.capture_details];
            });
        }

        if (Object.hasOwn(retObj, 'signal')) {
            console.log("signal:");
            console.log(retObj);
            delete retObj.signal;
            console.log("post delete");
            console.log(retObj);
            console.log(annotData);
            Object.keys(annotData.signal || {}).forEach(key => {
                console.log("key: " + key);
                retObj[key as keyof typeof retObj] = annotData.signal[key as keyof typeof annotData.signal];
            });
        }
        if (Object.hasOwn(retObj, 'traceability')) {
            delete retObj.traceability;
            Object.keys(annotData.traceability || {}).forEach(key => {
                retObj[key as keyof typeof retObj] = annotData.traceability[key as keyof typeof annotData.traceability];
            });
        }
        if (Object.hasOwn(retObj, 'antenna')) {
            delete retObj.antenna;
            Object.keys(annotData.antenna || {}).forEach(key => {
                retObj[key as keyof typeof retObj] = annotData.antenna[key as keyof typeof annotData.antenna];
            });
        }
        if (Object.hasOwn(retObj, 'spatial')) {
            delete retObj.spatial;
            Object.keys(annotData.spatial || {}).forEach(key => {
                retObj[key as keyof typeof retObj] = annotData.spatial[key as keyof typeof annotData.spatial];
            });
        }
        console.log("returned object: ");
        console.log(retObj);
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