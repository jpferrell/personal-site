'use client'

import { ReactElement, useEffect, useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import SigMfCaptureDisplay from "@/app/_components/SigMfComponents/SigMfCaptureDisplay";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType } from "@/app/_components/SigMfComponents/SigMfInterfaces";
import SigMfAnnotationDisplay from "@/app/_components/SigMfComponents/SigMfAnnotationDisplay";
import SigMfTextInput from "@/app/_components/SigMfComponents/Inputs/SigMfTextInput";
import ExtensionPortal from "@/app/_components/SigMfComponents/Extensions/ExtensionPortal";

interface CaptureType {
    data: SigMfCaptureType,
    id: number
};

interface AnnotationType {
    data: SigMfAnnotationType,
    id: number
};

interface ExtensionsType {
    antenna: boolean,
    capture_details: boolean,
    signal: boolean,
    spatial: boolean,
    traceability: boolean
}

interface ExtensionsCheckType {
    name: string,
    regex: RegExp
}

const extensionKeywords: string[] = ['antenna', 'capture_details', 'signal', 'spatial', 'traceability'];
const extRegex: RegExp[] = [/^(antenna)/g, /^(capture_details)/g, /^(signal)/g, /^(spatial)/g, /^(traceability)/g];

const extObj: ExtensionsCheckType[] = [
    {name: 'antenna', regex: /^(antenna)/g},
    {name: 'capture_details', regex: /^(capture_details)/g},
    {name: 'signal', regex: /^(signal)/g},
    {name: 'spatial', regex: /^(spatial)/g},
    {name: 'traceability', regex: /^(traceability)/g}
];

export default function SigMFEditor() {

    const [globalObj, setGlobalObj] = useState<object>({});

    const [selectedOpt, setSelectedOpt] = useState({value: 'global', label: 'Global'});
    const [isCreateEnabled, setIsCreateEnabled] = useState<boolean>(false);
    const [filename, setFilename] = useState<string|null>(null);
    const [capArr, setCapArr] = useState<CaptureType []>([]);
    const [capIdx, setCapIdx] = useState<number>(0);
    const [annotArr, setAnnotArr] = useState<AnnotationType []>([]);
    const [annotIdx, setAnnotIdx] = useState<number>(0);
    const [extArr, setExtArr] = useState<string[]>([]);
    const [isExtPortalOpen, setIsExtPortalOpen] = useState<boolean>(false);
    const [extModalObj, setExtModalObj] = useState<object>({});
    const [isCreateFile, setIsCreateFile] = useState<boolean>(false);
    const [isModalObjValid, setIsModalObjValid] = useState<boolean>(true);

    function removeCapture(idx: number) {
        setCapArr(capArr.filter(cap => cap.id !== idx));
    }

    function removeAnnotation(idx: number) {
        setAnnotArr(annotArr.filter(annot => annot.id !== idx));
    }

    function addCapture(capture: SigMfCaptureType) {
       setCapArr([
        ...capArr,
        {data: capture, id: capIdx}
       ]);
       setCapIdx(capIdx + 1);
    }

    function addAnnotation(annotation: SigMfAnnotationType) {
       setAnnotArr([
        ...annotArr,
        {data: annotation, id: annotIdx}
       ]);
       setAnnotIdx(annotIdx + 1)
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

    function getAnnotation(data: SigMfAnnotationType) {
        return data;
    }

    function getCaptureArray() {
        return capArr.map(cap => cap.data);
    }

    function getAnnotationArray() {
        return annotArr.map(annot => annot.data);
    }

    function findExtensions(obj: object) {
        const keys: string[] = Object.keys(obj);
        let retObj: ExtensionsType = {
            antenna: false,
            capture_details: false,
            signal: false,
            spatial: false,
            traceability: false
        };
        extObj.forEach(ext => {
            const regex: RegExp = ext.regex;
            const name: string = ext.name;
            const extFound: boolean = keys.map(key => {
                console.log("key: " + key);
                return regex.test(key);
            }).includes(true);
            console.log("Was " + name + " found? " + extFound);
            if (extFound) {
                retObj = {
                    ...retObj,
                    [name]: extFound
                };
            }
        });

        return retObj;
    }

    function findExtensionInArray(searchObj: object, retObj: ExtensionsType) {
        const keys: string[] = Object.keys(searchObj);
        console.log(keys);
        keys.forEach(key => {
            console.log(searchObj[key as keyof typeof searchObj]);
            extObj.forEach(ext => {
                const regex: RegExp = ext.regex;
                const name: string = ext.name;
                const extFound: boolean = Object.keys(searchObj[key as keyof typeof searchObj]).map(innerKey => {
                    console.log("inner key: " + innerKey);
                    return regex.test(innerKey);
                }).includes(true);
                if (extFound) {
                    console.log("extension: " + name + " found");
                    retObj = {
                        ...retObj,
                        [name]: extFound
                    };
                }
            });
        })
        return retObj;
    }

    useEffect(() => {
        const tmpArr = Object.keys(extModalObj).map(key => extModalObj[key as keyof typeof extModalObj]);
        console.log(tmpArr);
        setGlobalObj({
            ...globalObj,
            'core:extensions': tmpArr
        });

        setIsModalObjValid(true);
        console.log("global obj after modal: ");
        console.log(globalObj);
    }, [extModalObj]);

    function checkForExtensions() {
        let extObj: ExtensionsType = findExtensions(globalObj);
        extObj = findExtensionInArray(getCaptureArray(), extObj);
        extObj = findExtensionInArray(getAnnotationArray(), extObj);
        if (Object.values(extObj).includes(true)) {
            // There are extensions used that need to be accounted for
            const tmp = Object.keys(extObj).filter(key => extObj[key as keyof typeof extObj] === true);
            setExtArr(tmp);
            setIsExtPortalOpen(true);
            setIsModalObjValid(false);
        }
    }

    useEffect(() => {
        if (isCreateFile && isModalObjValid) {
            const el = document.createElement("a");
            const outObj: {global?: object, captures?: object, annotations?: object} = {};
            outObj["global"] = globalObj;
            outObj["captures"] = getCaptureArray().sort((a, b) => a["core:sample_start"]! < b["core:sample_start"]! ? -1 : a["core:sample_start"]! > b["core:sample_start"]! ? 1 : 0);
            outObj["annotations"] = getAnnotationArray().sort((a,b) => a["core:sample_start"]! < b["core:sample_start"]! ? -1 : a["core:sample_start"]! > b["core:sample_start"]! ? 1 : 0);
            console.log("object out: ");
            console.log(outObj);
            setIsCreateFile(false);
            const jsonFile = new Blob([JSON.stringify(outObj)], {type: 'text/plain'});
            el.href = URL.createObjectURL(jsonFile);
            const fileExt: string = ".sigmf-meta";
            el.download = filename === null ? "out"+fileExt : filename + fileExt;
            document.body.appendChild(el);
            el.click();
        }
    }, [isCreateFile, isModalObjValid]);

    function createSigMfFile() {
        //const el = document.createElement("a");
        //const outObj: {global?: object, captures?: object, annotations?: object} = {};
        checkForExtensions();
        setIsCreateFile(true);
        /*
        outObj["global"] = globalObj;
        outObj["captures"] = getCaptureArray().sort((a, b) => a["core:sample_start"]! < b["core:sample_start"]! ? -1 : a["core:sample_start"]! > b["core:sample_start"]! ? 1 : 0);
        outObj["annotations"] = getAnnotationArray().sort((a,b) => a["core:sample_start"]! < b["core:sample_start"]! ? -1 : a["core:sample_start"]! > b["core:sample_start"]! ? 1 : 0);
        console.log(outObj);
        */
        /*
        const jsonFile = new Blob([JSON.stringify(outObj)], {type: 'text/plain'});
        el.href = URL.createObjectURL(jsonFile);
        const fileExt: string = ".sigmf-meta";
        el.download = filename === null ? "out"+fileExt : filename + fileExt;
        document.body.appendChild(el);
        el.click();
        */
    }

    function handleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        let retVal: string = "";
        if (e.target.value !== "") {
            retVal = e.target.value;
        }
        setSelectedOpt({value: retVal, label: retVal});
    }

    function cleanFilename(name: string) {
        console.log("In filename: " + name);
        return name.replace(/\.[^/.]+$/, "");
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file: File = e.target.files[0];
        console.log(file);
        if (file === null) {
            console.error('No file was selected');
        } else {
            const inFilename: string = cleanFilename(file.name);
            console.log("cleaned filename: " + inFilename);
            setFilename(inFilename);
            const fileEl = document.getElementById("filename-input");
            const reader: FileReader = new FileReader();
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(fileEl, inFilename);
            const fileEvent = new Event('input', {bubbles: true});
            fileEl?.dispatchEvent(fileEvent);
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                if (reader.result) {
                    sha512Encrypt(reader.result as ArrayBuffer).then(rsp => {
                        const el = document.getElementById("sha-512-input");
                        // Trigger the change event after setting the SHA-512 input element value
                        nativeInputValueSetter?.call(el, rsp);
                        const shaEvent = new Event('input', { bubbles: true });
                        el?.dispatchEvent(shaEvent);
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
            <p className="p-8">This is an editor for SigMF IQ signal capture files. Currently, it is able to create a .sigmf-meta file with a filename stub that can
                 be customized through the "Filename" input. </p>
            <ExtensionPortal extArr={extArr} isEnabled={isExtPortalOpen} moveExtObj={setExtModalObj} showPortal={setIsExtPortalOpen}></ExtensionPortal>
            <div className="grid grid-cols-2 pt-4 max-h-[calc(85vh)] overflow-auto">
                <div className="grid grid-cols-1 max-h-[calc(85vh)] overflow-auto gap-2">
                    <span><label htmlFor="sigmf-data-file-input">{"Input .sigmf-data File  "}</label><input type="file" id="sigmf-data-file-input" name="sigmf-data-file-input" onChange={handleFileChange}/></span>
                    <div className="">
                        <SigMfTextInput label="Filename" id="filename-input" changeFunction={setFilename}/>
                    </div>
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
                            {capArr.map(cap => <SigMfCaptureDisplay inData={cap.data} inIdx={cap.id} dataGetter={getCapture} key={`cap-disp-${cap.id}`} deleterFunction={removeCapture} />)}
                        </div>
                    </div>
                    <div>
                        <h2>Annotations</h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)] gap-2" id="annotation-grid">
                        {annotArr.map(annot => <SigMfAnnotationDisplay inData={annot.data} inIdx={annot.id} dataGetter={getAnnotation} key={`cap-disp-${annot.id}`} deleterFunction={removeAnnotation} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}