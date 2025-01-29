"use client"

import { useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfCapture";
import Select from "react-select";
import SigMfAnnotation from "@/app/_components/SigMfAnnotation";

const capArr = [{}, {}];
const annotArr = [{}];

const options = [
    {value: 'global', label: 'Global'},
    {value: 'captures', label: 'Captures'},
    {value: 'annotations', label: 'Annotations'}
];

export default function SigMFEditor() {

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});

    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4">
                <div className="grid grid-cols-1 gap-2">
                    <h2>Editor</h2>
                    <Select options={options} onChange={setSelectedOpt} value={selectedOpt}/>
                    {selectedOpt.value === 'global' ? <SigMfGlobal /> : selectedOpt.value === 'captures' ? <SigMfCapture /> : <SigMfAnnotation />}
                    <button className="rounded block bg-slate-300 dark:bg-slate-300 hover:slate-700 dark:hover:bg-slate-500 text-indigo-500">Create</button>
                </div>
                <div className="grid grid-cols-2">
                    <h2>Captures ({capArr.length})</h2>
                    <div className="grid grid-cols-1">
                    {capArr.map((capture, idx) => (
                        <div key={`caparr-${idx}`}>
                            <p>Capture {idx}</p>
                        </div>
                    ))}
                    </div>
                    <h2>Annotations ({annotArr.length})</h2>
                    <div className="grid grid-cols-1">
                    {annotArr.map((annotation, idx) => (
                        <div key={`annotarr-${idx}`}>
                            <p>Annotation {idx}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>

    );
}