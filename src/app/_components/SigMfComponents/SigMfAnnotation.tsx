'use client'

import { useState } from "react";

import SigMfGeoInput from "./SigMfGeoInput";
import SigMfNumberInput from "./Inputs/SigMfNumberInput";
import SigMfTextInput from "./Inputs/SigMfTextInput"
import { CaptureDetailsAnnotations } from "./Extensions/CaptureDetails";
import { SigMfCapDetsAnnotType, SigMfGeoType } from "./SigMfInterfaces";

export default function SigMfAnnotation() {

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

    return (
        <div>
            <SigMfNumberInput label="Sample Start" id="annot-sample-start-input" placeholder="0" changeFunction={setSampStart} required />
            <SigMfNumberInput label="Sample Count" id="annot-sample-cnt-input" placeholder="0" changeFunction={setSampCnt} />
            <SigMfNumberInput label="Frequency Lower Edge" id="annot-freq-lower-edge-input" placeholder="0.0" changeFunction={setFreqLowEdge} />
            <SigMfNumberInput label="Frequency Upper Edge" id="annot-freq-upper-edge-input" placeholder="0.0" changeFunction={setFreqHighEdge} />
            <SigMfTextInput label="Label" id="annot-label-input" placeholder="label" changeFunction={setLabel} />
            <SigMfTextInput label="Comment" id="annot-comment-input" placeholder="comment" changeFunction={setComment} />
            <SigMfTextInput label="Generator" id="annot-generator-input" placeholder="generator" changeFunction={setGenerator} />
            <SigMfTextInput label="UUID" id="annot-uuid-input" placeholder="uuid" changeFunction={setUuid} />
            <SigMfGeoInput idPart="annot" />
            <CaptureDetailsAnnotations />
            <button id="add-annot-button" className="rounded p-1 mx-auto flex dark:hover:text-slate-200 dark:bg-slate-300 dark:text-indigo-400 dark:hover:bg-slate-500">Add Annotation</button>
        </div>
    );
}