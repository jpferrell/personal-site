'use client'

import { useEffect, useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import SigMfCaptureDisplay from "@/app/_components/SigMfComponents/SigMfCaptureDisplay";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType } from "@/app/_components/SigMfComponents/SigMfInterfaces";
import SigMfAnnotationDisplay from "@/app/_components/SigMfComponents/SigMfAnnotationDisplay";
import SigMfTextInput from "@/app/_components/SigMfComponents/Inputs/SigMfTextInput";

export default function SigMFEditor() {

    const options = [
        {value: 'global', label: 'Global'},
        {value: 'captures', label: 'Captures'},
        {value: 'annotations', label: 'Annotations'}
    ];

    const [globalObj, setGlobalObj] = useState<object>({});

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});
    const [isCreateEnabled, setIsCreateEnabled] = useState<boolean>(false);
    const [capCompArr, setCapCompArr] = useState<object []>([]);
    const [annotCompArr, setAnnotCompArr] = useState<object []>([]);
    const [filename, setFilename] = useState<string|null>(null);
    //const [sha512, setSha512] = useState<string|null>(null);

    function addCapture(capture: SigMfCaptureType) {
        const len = capCompArr.length;
        setCapCompArr([
            ...capCompArr,
            {component: <SigMfCaptureDisplay inData={capture} idx={len} key={`cap-disp-${len}`} dataGetter={getCapture}/>, data: capture}
        ]);
    }

    function addAnnotation(annotation: SigMfAnnotationType) {
        const len = annotCompArr.length;
        setAnnotCompArr([
            ...annotCompArr,
            {component: <SigMfAnnotationDisplay inData={annotation} idx={len} key={`annot-disp-${len}`} />, data: annotation}
        ]);
    }

    useEffect(() => {
        let btnEnabled = false;
        if (Object.hasOwn(globalObj, 'core:datatype') && Object.hasOwn(globalObj, 'core:version')) {
                btnEnabled = true;
        }


        setIsCreateEnabled(btnEnabled);
    }, [globalObj]);

    function getCapture(data: SigMfCaptureType) {
        return data;
    }

    function getCaptureArray() {
        return capCompArr.map(cap => cap.data);
    }

    function getAnnotationArray() {
        return annotCompArr.map(annot => annot.data);
    }

    function createSigMfFile() {
        const el = document.createElement("a");
        const capArr = getCaptureArray();
        const annotArr = getAnnotationArray();
        const outObj: {global?: {}, captures?: {}, annotations?: {}} = {};
        outObj["global"] = globalObj;
        outObj["captures"] = capArr;
        outObj["annotations"] = annotArr;
        const jsonFile = new Blob([JSON.stringify(outObj)], {type: 'text/plain'});
        el.href = URL.createObjectURL(jsonFile);
        el.download = "test.sigmf-meta";
        document.body.appendChild(el);
        el.click();
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let retVal: string = "";
        if (e.target.value !== "") {
            retVal = e.target.value;
        }
        setSelectedOpt({value: retVal, label: retVal});
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file: File = e.target.files[0];
        console.log(file);
        setFilename(file.name);
        document.getElementById("filename-input").value = file.name;
        //console.log(el);
        if (file === null) {
            console.error('No file was selected');
        } else {
            const reader: FileReader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                console.log(reader.result);
                if (reader.result) {
                    sha512Encrypt(reader.result).then(rsp => {
                        console.log("sha512 has returned");
                        console.log("sha512 response: " + rsp);
                    });
                }
            }
        }
    }

    async function sha512Encrypt(inMsg: ArrayBuffer) {
       const buf: ArrayBuffer = await crypto.subtle.digest("SHA-512", inMsg);
       const hashHex = Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, "0")).join("");
       return hashHex;
    }

    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4 max-h-[calc(85vh)] overflow-auto">
                <div className="grid grid-cols-1 max-h-[calc(85vh)] overflow-auto">
                    <span><label htmlFor="sigmf-data-file-input">{"Input .sigmf-data File  "}</label><input type="file" id="sigmf-data-file-input" name="sigmf-data-file-input" onChange={handleFileChange}/></span>
                    <SigMfTextInput label="Filename" id="filename-input" changeFunction={setFilename}/>
                    <select id="selector" className={`dark:bg-slate-600 text-center max-h-6`} onChange={handleSelectionChange}>
                        <option id="selector-global-opt" value={"global"}>Global</option>
                        <option id="selector-capture-opt" value={"captures"}>Captures</option>
                        <option id="selector-annot-opt" value={"annotations"}>Annotations</option>
                    </select>
                    <SigMfGlobal isHidden={selectedOpt.value !== 'global'} transferData={setGlobalObj}/>
                    <SigMfCapture isHidden={selectedOpt.value !== 'captures'} transferCapData={addCapture} />
                    <SigMfAnnotation isHidden={selectedOpt.value !== 'annotations'} transferData={addAnnotation} />
                    <button className="rounded block bg-slate-300 dark:bg-slate-300 hover:slate-700 dark:hover:bg-slate-500 text-indigo-500 max-h-8 min-w-20" onClick={createSigMfFile} disabled={!isCreateEnabled}>Create</button>
                </div>
                <div className="grid grid-cols-2 h-screen">
                    <div className="h-screen" id="captures-section">
                        <h2>{`Captures`}</h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)] gap-2" id="capture-grid">
                            {capCompArr.map(capture => capture.component)}
                        </div>
                    </div>
                    <div>
                        <h2>Annotations</h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)] gap-2" id="annotation-grid">
                            {annotCompArr.map(annotation => annotation.component)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}