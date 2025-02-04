'use client'

import { useEffect, useState } from "react";

import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfAnnotationType, SigMfCapDetsAnnotType, SigMfGeoType, SigMfSignalType } from "./SigMfInterfaces";
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
    const [sigAnnot, setSigAnnot] = useState<SigMfSignalType|null>(null);

    const [annotData, setAnnotData] = useState<SigMfAnnotationType>({
        'core:sample_start': null,
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    useEffect(() => {
        setAnnotData({...annotData, "core:sample_start": sampStart});
    }, [sampStart]);

    useEffect(() => {
        if (sampCnt !== null) {
            setAnnotData({...annotData, "core:sample_count": sampCnt});
        } else if (Object.hasOwn(annotData, 'core:sample_count')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:sample_count'];
            setAnnotData(tmpObj);
        }
    }, [sampCnt]);

    useEffect(() => {
        if (freqLowEdge !== null) {
            setAnnotData({...annotData, "core:freq_lower_edge": freqLowEdge});
        } else if (Object.hasOwn(annotData, 'core:freq_lower_edge')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:freq_lower_edge'];
            setAnnotData(tmpObj);
        }
    }, [freqLowEdge]);

    useEffect(() => {
        if (freqHighEdge !== null) {
            setAnnotData({...annotData, "core:freq_upper_edge": freqHighEdge});
        } else if (Object.hasOwn(annotData, 'core:freq_upper_edge')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:freq_upper_edge'];
            setAnnotData(tmpObj);
        }
    }, [freqHighEdge]);

    useEffect(() => {
        if (label !== null && label !== "") {
            setAnnotData({...annotData, "core:label": label});
        } else if (Object.hasOwn(annotData, 'core:label')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:label'];
            setAnnotData(tmpObj);
        }
    }, [label]);

    useEffect(() => {
        if (comment !== null && comment !== "") {
            setAnnotData({...annotData, "core:comment": comment});
        } else if (Object.hasOwn(annotData, 'core:comment')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:comment'];
            setAnnotData(tmpObj);
        }
    }, [comment]);

    useEffect(() => {
        if (generator !== null && generator !== "") {
            setAnnotData({...annotData, "core:generator": generator});
        } else if (Object.hasOwn(annotData, 'core:generator')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:generator'];
            setAnnotData(tmpObj);
        }
    }, [generator]);

    useEffect(() => {
        if (uuid !== null && uuid !== "") {
            setAnnotData({...annotData, "core:uuid": uuid});
        } else if (Object.hasOwn(annotData, 'core:uuid')) {
            const tmpObj = {...annotData};
            delete tmpObj['core:uuid'];
            setAnnotData(tmpObj);
        }
    }, [uuid]);

    useEffect(() => {
        if (capDets !== null) {
            setAnnotData({...annotData, "capture_details": capDets});
        } else if (Object.hasOwn(annotData, 'capture_details')) {
            const tmpObj = {...annotData};
            delete tmpObj.capture_details;
            setAnnotData(tmpObj);
        }
    }, [capDets]);

    useEffect(() => {
        if (sigAnnot !== null) {
            setAnnotData({...annotData, "signal": sigAnnot});
        } else if (Object.hasOwn(annotData, 'signal')) {
            const tmpObj = {...annotData};
            delete tmpObj.signal;
            setAnnotData(tmpObj);
        }
    }, [sigAnnot]);

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (annotData['core:sample_start'] !== null) {
            btnEnabled = true;
        }
        setIsButtonEnabled(btnEnabled);
    }, [annotData]);

    function addAnnotation() {
        transferData(annotData);
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