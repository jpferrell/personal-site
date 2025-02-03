'use client'

import { useEffect, useState } from "react";

import SigMfGeoInput from "./SigMfGeoInput";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfAnnotationType, SigMfCapDetsAnnotType, SigMfGeoType } from "./SigMfInterfaces";

export default function SigMfAnnotation( { isHidden, transferData }: { isHidden: boolean, transferData: Function } ) {

    const [sampStart, setSampStart] = useState<number|null>(null);
    const [sampCnt, setSampCnt] = useState<number|null>(null);
    const [freqLowEdge, setFreqLowEdge] = useState<number|null>(null);
    const [freqHighEdge, setFreqHighEdge] = useState<number|null>(null);
    const [label, setLabel] = useState<string|null>(null);
    const [comment, setComment] = useState<string|null>(null);
    const [generator, setGenerator] = useState<string|null>(null);
    const [uuid, setUuid] = useState<string|null>(null);
    const [geo, setGeo] = useState<SigMfGeoType|null>(null);
    const [capDets, setCapDets] = useState<SigMfCapDetsAnnotType|null>(null);

    const [annotData, setAnnotData] = useState<SigMfAnnotationType>({
        sampStart: null,
        sampCnt: null,
        freqLowEdge: null,
        freqHighEdge: null,
        label: null,
        comment: null,
        generator: null,
        uuid: null,
        geo: null,
        capDets: null
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

    useEffect(() => {
        setAnnotData({
            sampStart: sampStart,
            sampCnt: sampCnt,
            freqLowEdge: freqLowEdge,
            freqHighEdge: freqHighEdge,
            label: label,
            comment: comment,
            generator: generator,
            uuid: uuid,
            geo: geo,
            capDets: capDets
        });
    }, [sampStart, sampCnt, freqLowEdge, freqHighEdge, label, comment, generator, uuid, geo, capDets]);

    useEffect(() => {
        let btnEnabled: boolean = false;
        if (annotData.sampStart !== null) {
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
            <SigMfGeoInput idPart="annot" isHidden={isHidden} changeFunction={setGeo} />
            <CaptureDetailsAnnotations isHidden={isHidden} changeFunction={setCapDets} />
            <button id="add-annot-button" className={`rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500 ${isHidden ? "hidden" : ""} disabled:bg-slate-700 disabled:hover:bg-slate-700 disabled:hover:text-indigo-400`} disabled={!isButtonEnabled} onClick={addAnnotation} >Add Annotation</button>
        </div>
    );
}