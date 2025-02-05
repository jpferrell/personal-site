'use client'

import { ReactNode, useEffect, useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import SigMfCaptureDisplay from "@/app/_components/SigMfComponents/SigMfCaptureDisplay";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType } from "@/app/_components/SigMfComponents/SigMfInterfaces";
import SigMfAnnotationDisplay from "@/app/_components/SigMfComponents/SigMfAnnotationDisplay";

export default function SigMFEditor() {

    const options = [
        {value: 'global', label: 'Global'},
        {value: 'captures', label: 'Captures'},
        {value: 'annotations', label: 'Annotations'}
    ];

    const [globalObj, setGlobalObj] = useState<Object>({});

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});
    const [isCreateEnabled, setIsCreateEnabled] = useState<boolean>(false);
    const [capCompArr, setCapCompArr] = useState<Object []>([]);
    const [annotCompArr, setAnnotCompArr] = useState<Object []>([]);

    function addCapture(capture: SigMfCaptureType) {
        let len = capCompArr.length;
        setCapCompArr([
            ...capCompArr,
            {component: <SigMfCaptureDisplay inData={capture} idx={len} key={`cap-disp-${len}`} dataGetter={getCapture}/>, data: capture}
        ]);
    }

    function addAnnotation(annotation: SigMfAnnotationType) {
        let len = annotCompArr.length;
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
        let outObj: {global?: {}, captures?: {}, annotations?: {}} = {};
        outObj["global"] = globalObj;
        outObj["captures"] = capArr;
        outObj["annotations"] = annotArr;
        const jsonFile = new Blob([JSON.stringify(outObj)], {type: 'text/plain'});
        el.href = URL.createObjectURL(jsonFile);
        el.download = "test.json";
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

    return (
        <div className="min-h-screen min-w-full justify-items-center text-center p-4">
            <h1 className="text-2xl"><strong>SigMF Editor</strong></h1>
            <div className="grid grid-cols-2 pt-4 max-h-[calc(90vh)]">
                <div className="grid grid-cols-1 overflow-auto">
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