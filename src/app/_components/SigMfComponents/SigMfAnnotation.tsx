'use client'

import { useEffect, useState } from "react";

import SigMfGeoInput from "./SigMfGeoInput";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfAnnotationType, SigMfCapDetsAnnotType, SigMfGeoType } from "./SigMfInterfaces";
import { SignalAnnotation } from "./Extensions/SignalAnnotation";

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
    const [sigAnnot, setSigAnnot] = useState(null);

    const [annotData, setAnnotData] = useState<SigMfAnnotationType>({
        'core:sample_start': null,
        'core:sample_count': null,
        'core:freq_lower_edge': null,
        'core:freq_upper_edge': null,
        'core:label': null,
        'core:comment': null,
        'core:generator': null,
        'core:uuid': null,
        capture_details: null
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    useEffect(() => {
        setAnnotData({
            'core:sample_start': sampStart,
            'core:sample_count': sampCnt,
            'core:freq_lower_edge': freqLowEdge,
            'core:freq_upper_edge': freqHighEdge,
            'core:label': label,
            'core:comment': comment,
            'core:generator': generator,
            'core:uuid': uuid,
            capture_details: capDets
        });
    }, [sampStart, sampCnt, freqLowEdge, freqHighEdge, label, comment, generator, uuid, capDets]);

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (annotData['core:sample_start'] !== null) {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [annotData]);

    function cleanData(dirtyData: SigMfAnnotationType) {
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

    function addAnnotation() {
        const retData = cleanData(annotData);
        transferData(retData);
    }

    return (
        <div>
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
            <button id="add-annot-button" className={`rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500 ${isHidden ? "hidden" : ""} disabled:bg-slate-700 disabled:hover:bg-slate-700 disabled:hover:text-indigo-400`} disabled={!isButtonEnabled} onClick={addAnnotation} >Add Annotation</button>
        </div>
    );
}