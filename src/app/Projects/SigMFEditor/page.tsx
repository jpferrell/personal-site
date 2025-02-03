'use client'

import { useEffect, useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import Select from "react-select";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType } from "@/app/_components/SigMfComponents/SigMfInterfaces";

export default function SigMFEditor() {

    const capArr: SigMfCaptureType[] = [];
    const annotArr: SigMfAnnotationType[] = [];

    const options = [
        {value: 'global', label: 'Global'},
        {value: 'captures', label: 'Captures'},
        {value: 'annotations', label: 'Annotations'}
    ];

    const [globalObj, setGlobalObj] = useState<SigMfGlobalType>({
        datatype: null,
        sampRate: null,
        author: null,
        collection: null,
        dataset: null,
        dataDoi: null,
        desc: null,
        hw: null,
        license: null,
        metaOnly: null,
        metaDoi: null,
        numChans: null,
        offset: null,
        recorder: null,
        sha512: null,
        trailingBytes: null,
        version: null,
        geo: null
    });

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});
    const [isCreateEnabled, setIsCreateEnabled] = useState<boolean>(false);

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
            tmp.innerHTML += `<div id="capture-element-${idx}"><p>Capture ${idx}</p></div>`;
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

    useEffect(() => {
        let btnEnabled = false;
        if (globalObj.version !== null && globalObj.datatype !== null) {
            if (globalObj.geo?.enabled) {
                if (globalObj.geo.lat !== null && globalObj.geo.lon !== null && globalObj.geo.type !== null) {
                    btnEnabled = true;
                }
            } else {
                btnEnabled = true;
            }
        }
        setIsCreateEnabled(btnEnabled);
    }, [globalObj]);

    function cleanObj() {
        const newObj = {};
        Object.keys(globalObj).forEach(key => {
            if (globalObj[key] !== null) {
                newObj[key] = globalObj[key];
            }
        });

        return newObj;
    }

    function createSigMfFile() {
        const el = document.createElement("a");
        const outObj = cleanObj();
        const jsonFile = new Blob([JSON.stringify(outObj)], {type: 'text/plain'});
        el.href = URL.createObjectURL(jsonFile);
        el.download = "test.json";
        document.body.appendChild(el);
        el.click();
    }

    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4 h-screen">
                <div className="grid grid-cols-1 gap-2 overflow-auto">
                    <h2>Editor</h2>
                    <Select options={options} onChange={setSelectedOpt} value={selectedOpt}/>
                    <SigMfGlobal isHidden={selectedOpt.value !== 'global'} transferData={setGlobalObj}/>
                    <SigMfCapture isHidden={selectedOpt.value !== 'captures'} transferCapData={addCapture} />
                    <SigMfAnnotation isHidden={selectedOpt.value !== 'annotations'} transferData={addAnnotation} />
                    <button className="rounded block bg-slate-300 dark:bg-slate-300 hover:slate-700 dark:hover:bg-slate-500 text-indigo-500 max-h-8 min-w-20" onClick={createSigMfFile} disabled={!isCreateEnabled}>Create</button>
                </div>
                <div className="grid grid-cols-2 h-screen">
                    <div className="h-screen">
                        <h2>Captures ({capArr.length})</h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)]" id="capture-grid"></div>
                    </div>
                    <div>
                        <h2>Annotations ({annotArr.length})</h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)]" id="annotation-grid"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}