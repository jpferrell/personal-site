"use client"

import { useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import Select from "react-select";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType } from "@/app/_components/SigMfComponents/SigMfInterfaces";

const capArr: SigMfCaptureType[] = [];
const annotArr: SigMfAnnotationType[] = [];

const options = [
    {value: 'global', label: 'Global'},
    {value: 'captures', label: 'Captures'},
    {value: 'annotations', label: 'Annotations'}
];

export default function SigMFEditor() {

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});

    function addCapture(capture: SigMfCaptureType) {
        console.log(capture);
        capArr.push(capture);
        const tmp: HTMLElement|null = document.getElementById("capture-grid");
        if (tmp === null) {
            console.log("capture-grid not found");
            return;
        }
        tmp.innerHTML = ``;
        capArr.forEach((cap, idx) => {
           const parEl = document.createElement("p");
            tmp.innerHTML += `<p>Capture ${idx}</p>`;
        });
    }

    function addAnnotation(annotation: SigMfAnnotationType) {
        console.log(annotation);
        annotArr.push(annotation);
        const tmp: HTMLElement|null = document.getElementById("annotation-grid");
        if (tmp === null) {
            console.log("annotation-grid not found");
            return;
        }
        tmp.innerHTML = ``;
        annotArr.forEach((annot, idx) => {
           const parEl = document.createElement("p");
            tmp.innerHTML += `<p>Annotation ${idx}</p>`;
        });
    }

    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4 h-screen">
                <div className="grid grid-cols-1 gap-2 overflow-auto">
                    <h2>Editor</h2>
                    <Select options={options} onChange={setSelectedOpt} value={selectedOpt}/>
                    <SigMfGlobal isHidden={selectedOpt.value !== 'global'} />
                    <SigMfCapture isHidden={selectedOpt.value !== 'captures'} transferCapData={addCapture} />
                    <SigMfAnnotation isHidden={selectedOpt.value !== 'annotations'} transferData={addAnnotation} />
                    <button className="rounded block bg-slate-300 dark:bg-slate-300 hover:slate-700 dark:hover:bg-slate-500 text-indigo-500 max-h-8 min-w-20">Create</button>
                </div>
                <div className="grid grid-cols-2 h-screen">
                    <h2>Captures ({capArr.length})</h2>
                    <div className="grid grid-cols-1 h-64 overflow-auto" id="capture-grid">
                    </div>
                    <h2>Annotations ({annotArr.length})</h2>
                    <div className="grid grid-cols-1 h-64 overflow-auto" id="annotation-grid">
                    </div>
                </div>
            </div>
        </div>

    );
}