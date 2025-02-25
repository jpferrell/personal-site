'use client'

import { useEffect, useState } from "react";
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType } from "@/app/_components/SigMfComponents/SigMfInterfaces";
import SigMfTextInput from "@/app/_components/SigMfComponents/Inputs/SigMfTextInput";
import ExtensionPortal from "@/app/_components/SigMfComponents/Extensions/ExtensionPortal";
import SigMfArrayDisplay from "@/app/_components/SigMfComponents/SigMfArrayDisplay";

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
        if (Object.keys(globalObj).length !== 0) {
            btnEnabled = true;
        }
        setIsCreateEnabled(btnEnabled);
    }, [globalObj]);

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
                return regex.test(key);
            }).includes(true);
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
        keys.forEach(key => {
            extObj.forEach(ext => {
                const regex: RegExp = ext.regex;
                const name: string = ext.name;
                const extFound: boolean = Object.keys(searchObj[key as keyof typeof searchObj]).map(innerKey => {
                    return regex.test(innerKey);
                }).includes(true);
                if (extFound) {
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
        setGlobalObj({
            ...globalObj,
            'core:extensions': tmpArr
        });

        setIsModalObjValid(true);
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
        checkForExtensions();
        setIsCreateFile(true);
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
        <div className="text-center p-4 mx-auto">
            <h1 className="text-4xl"><strong>SigMF Editor</strong></h1>
            <p className="p-8">This is an editor for SigMF IQ signal capture files. Currently it is able to create a .sigmf-meta file with a filename stub that can
                 be customized through the Filename input. </p>
            <ExtensionPortal extArr={extArr} isEnabled={isExtPortalOpen} moveExtObj={setExtModalObj} showPortal={setIsExtPortalOpen}></ExtensionPortal>
            <div className="grid grid-cols-1 place-items-center pt-4 overflow-auto gap-6">
                <div className="grid grid-cols-1 overflow-auto h-[calc(50dvw)] w-[calc(50dvw)] dark:bg-zinc-800 bg-slate-100 rounded-lg p-2">
                    <span className="grid grid-cols-3"><label htmlFor="sigmf-data-file-input" className="text-center col-span-2"><strong>{".sigmf-data File  "}</strong></label><input type="file" id="sigmf-data-file-input" name="sigmf-data-file-input" onChange={handleFileChange}/></span>
                    <div className="">
                        <SigMfTextInput label="Filename" id="filename-input" changeFunction={setFilename}/>
                    </div>
                    <select id="selector" className={`dark:bg-slate-600 bg-slate-300 text-center max-h-6 rounded-md`} onChange={handleSelectionChange}>
                        <option id="selector-global-opt" value={"global"}>Global</option>
                        <option id="selector-capture-opt" value={"captures"}>Captures</option>
                        <option id="selector-annot-opt" value={"annotations"}>Annotations</option>
                    </select>
                    <SigMfGlobal isHidden={selectedOpt.value !== 'global'} transferData={setGlobalObj}/>
                    <SigMfCapture isHidden={selectedOpt.value !== 'captures'} transferCapData={addCapture} />
                    <SigMfAnnotation isHidden={selectedOpt.value !== 'annotations'} transferData={addAnnotation} />
                    <button className={`rounded block ${isCreateEnabled ? "dark:bg-indigo-800 bg-indigo-400 dark:hover:bg-indigo-900 hover:bg-indigo-500" : "bg-slate-200 text-slate-300 dark:bg-zinc-600 dark:text-zinc-500"} max-h-8 min-w-20`} onClick={createSigMfFile} disabled={!isCreateEnabled}>Create</button>
                </div>
                <div className="grid grid-cols-2 place-content-center w-[calc(80dvw)] gap-2">
                    <div className="dark:bg-zinc-800 bg-slate-100 rounded-lg pb-2" id="captures-section">
                        <h2 className="text-2xl"><strong>Captures</strong></h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)] gap-2" id="capture-grid">
                            {capArr.map(cap => <SigMfArrayDisplay inData={cap.data} inIdx={cap.id} typeStr="Capture" key={`cap-disp-${cap.id}`} deleterFunction={removeCapture} />)}
                        </div>
                    </div>
                    <div className="dark:bg-zinc-800 bg-slate-100 rounded-lg pb-2" id="annotations-section">
                        <h2 className="text-2xl"><strong>Annotations</strong></h2>
                        <div className="grid grid-cols-1 overflow-auto max-h-[calc(90vh)] gap-2" id="annotation-grid">
                        {annotArr.map(annot => <SigMfArrayDisplay inData={annot.data} inIdx={annot.id} typeStr="Annotation" key={`cap-disp-${annot.id}`} deleterFunction={removeAnnotation} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}