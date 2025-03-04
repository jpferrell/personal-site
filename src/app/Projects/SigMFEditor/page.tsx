'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import sigmflogo from '../../../../public/logo-color.svg'
import SigMfGlobal from "@/app/_components/SigMfComponents/SigMfGlobal";
import SigMfCapture from "@/app/_components/SigMfComponents/SigMfCapture";
import SigMfAnnotation from "@/app/_components/SigMfComponents/SigMfAnnotation";
import { SigMfAnnotationType, SigMfCaptureType, SigMfGlobalType, SigMfMetaInterface } from "@/app/_components/SigMfComponents/SigMfInterfaces";
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

    function getFileExtension(filename: string) {
        return filename.substring(0,1) === '.' ? '' : filename.split('.').slice(1).pop() || '';
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file: File|null = e.target?.files?.item(0) || null;
        console.log(file);
        if (file === null) {
            console.error('No file was selected');
        } else {
            const inFilename: string = cleanFilename(file.name);
            const inFileExt: string = getFileExtension(file.name);
            console.log("cleaned filename: " + inFilename);
            console.log("File extension: " + inFileExt);
            if (inFileExt === 'sigmf-meta') {
                console.log("in file is a sigmf-meta file");
                let fr: FileReader = new FileReader();
                fr.onload = rxJson;
                fr.readAsText(file);
            }
            setFilename(inFilename);
            const fileEl = document.getElementById("filename-input");
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(fileEl, inFilename);
            const fileEvent = new Event('input', {bubbles: true});
            fileEl?.dispatchEvent(fileEvent);
            if (inFileExt !== 'sigmf-meta') {
                const reader: FileReader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = () => {
                    if (reader.result) {
                        sha512Encrypt(reader.result as ArrayBuffer).then(rsp => {
                            const el = document.getElementById("sha512-input");
                            // Trigger the change event after setting the SHA-512 input element value
                            nativeInputValueSetter?.call(el, rsp);
                            const shaEvent = new Event('input', { bubbles: true });
                            el?.dispatchEvent(shaEvent);
                        });
                    }
                }
            }
        }

        function rxJson(e: ProgressEvent<FileReader>) {
            let lines = e.target?.result as string || "";
            let inMetaJson: SigMfMetaInterface = JSON.parse(lines);
            console.log(inMetaJson);
            handleInAnnotations(inMetaJson.annotations);
            handleInCaptures(inMetaJson.captures);
            handleInGlobal(inMetaJson.global);
        }
    }

    function handleInAnnotations(inAnnotations: Array<object>) {

        const tmpArr: AnnotationType[] = [];
        inAnnotations.forEach((annot, idx) => {
            tmpArr.push({data: annot as SigMfAnnotationType, id: idx});
        });

        setAnnotArr(tmpArr);
    }

    function handleInCaptures(inCaptures: Array<object>) {

        const tmpArr: CaptureType[] = [];
        inCaptures.forEach((cap, idx) => {
            tmpArr.push({data: cap as SigMfCaptureType, id: idx});
        });

        setCapArr(tmpArr);
    }

    function handleGeolocationKey(key: string, geoObj: object) {
        /*
        const enableEl: HTMLElement = document.getElementById(key+"-geo-enabled-input");
        const typeEl: HTMLElement = document.getElementById(key+"geo-type-input");
        const latEl: HTMLElement = document.getElementById(key+"-geo-lat-input");
        const lonEl: HTMLElement = document.getElementById(key+"-geo-lon-input");
        const altEl: HTMLElement = document.getElementById(key+"-geo-alt-input");

        console.log(geoObj);

        if (enableEl) {
            console.log(enableEl);
            //enableEl.setAttribute('checked', 'checked');
            enableEl.checked = true;
            console.log(enableEl);
            const enableEvent = new Event('change', {bubbles: true, cancelable: true});
            enableEl.dispatchEvent(enableEvent);
        }
        */
        const enableEl: HTMLElement|null = document.getElementById(key+"-geo-enabled-input");
        if (enableEl) {
            (enableEl as HTMLInputElement).checked = true;
            const event = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            enableEl?.dispatchEvent(event);
        }
        const typeEl: HTMLElement|null = document.getElementById("global-geo-type-input");
        if (typeEl) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(typeEl, geoObj['type' as keyof typeof geoObj]);
            const inputEvent = new Event('input', {bubbles: true});
            typeEl?.dispatchEvent(inputEvent);
        }
        const latEl: HTMLElement|null = document.getElementById("global-geo-lat-input");
        if (latEl) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            console.log("lat: " + geoObj['coordinates' as keyof typeof geoObj][0]);
            nativeInputValueSetter?.call(latEl, geoObj['coordinates' as keyof typeof geoObj][0]);
            const inputEvent = new Event('input', {bubbles: true});
            latEl?.dispatchEvent(inputEvent);
        }
        const lonEl: HTMLElement|null = document.getElementById("global-geo-lon-input");
        if (lonEl) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(lonEl, geoObj['coordinates' as keyof typeof geoObj][1]);
            const inputEvent = new Event('input', {bubbles: true});
            lonEl?.dispatchEvent(inputEvent);
        }
        if ((geoObj['coordinates' as keyof typeof geoObj] as Array<number>).length === 3) {
            const altEl: HTMLElement|null = document.getElementById("global-geo-alt-input");
            if (altEl) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                nativeInputValueSetter?.call(altEl, geoObj['coordinates' as keyof typeof geoObj][2]);
                const inputEvent = new Event('input', {bubbles: true});
                altEl?.dispatchEvent(inputEvent);
            }
        }
    }

    function handleDatatypeKey(inVal: string) {
        let realCplx: string = inVal.substring(0, 1);
        const rcElement: HTMLElement|null = document.getElementById("real-cplx-input");
        if (rcElement) {
            (rcElement as HTMLInputElement).value = realCplx;
            rcElement.dispatchEvent(new Event('change', {bubbles: true}));
        }
        let bigLittle: string = inVal.match(/_(.*)/gm)?.at(0)?.substring(1) || "";
        const blElement: HTMLElement|null = document.getElementById("le-be-input");
        if (blElement) {
            (blElement as HTMLInputElement).value = bigLittle;
            blElement.dispatchEvent(new Event('change', {bubbles: true}));
        }
        const dt: string = inVal.match(/([^_]{1}\d{1,2})/gm)?.at(0) || "";
        const dtElement: HTMLElement|null = document.getElementById("data-type-input");
        if (dtElement) {
            (dtElement as HTMLInputElement).value = dt;
            dtElement.dispatchEvent(new Event('change', {bubbles: true}));
        }
    }

    function handleGlobalCoreKey(key: string, val: any) {
        let htmlEl: HTMLElement|null = document.getElementById(key + "-input");

        if (key === 'metadata_only' && htmlEl) {
            (htmlEl as HTMLInputElement).checked = val;
            const event = new Event('click', {
                bubbles: true,
                cancelable: true
            });
            htmlEl?.dispatchEvent(event);
        } else if (key === 'geolocation') {
           handleGeolocationKey('global', val);
        } else if (key === 'datatype') {
            handleDatatypeKey(val);
        }

        if (htmlEl) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(htmlEl, val);
            const inputEvent = new Event('input', {bubbles: true});
            htmlEl?.dispatchEvent(inputEvent);
        }
    }

    function handleGlobalTraceabilityKey(key: string, val: any) {
        console.log("traceability key: " + key);
        let element: HTMLElement|null;
        if (key === 'revision') {
            element = document.getElementById("trace-global-revision");
            if (element) {
                const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                nativeInputValueSetter?.call(element, val);
                const inputEvent = new Event('input', {bubbles: true});
                element?.dispatchEvent(inputEvent);
            }
        } else if (key === 'origin') {
            let acctEl: HTMLElement|null = document.getElementById("trace-global-origin-account-input");
            let contEl: HTMLElement|null = document.getElementById("trace-global-origin-container-input");
            let fileEl: HTMLElement|null = document.getElementById("trace-global-origin-filepath-input");
            if (Object.hasOwn(val, "file_path")) {
                if (fileEl) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                    nativeInputValueSetter?.call(fileEl, val['file_path']);
                    const inputEvent = new Event('input', {bubbles: true});
                    fileEl?.dispatchEvent(inputEvent);
                }
            }
            if (Object.hasOwn(val, "account")) {
                if (acctEl) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                    nativeInputValueSetter?.call(acctEl, val['account']);
                    const inputEvent = new Event('input', {bubbles: true});
                    acctEl?.dispatchEvent(inputEvent);
                }
            }
            if (Object.hasOwn(val, "container")) {
                if (contEl) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                    nativeInputValueSetter?.call(contEl, val['container']);
                    const inputEvent = new Event('input', {bubbles: true});
                    contEl?.dispatchEvent(inputEvent);
                }
            }
        } else {
            let authEl: HTMLElement|null = document.getElementById("trace-global-" + key + "-data-change-author-input");
            let datetimeEl: HTMLElement|null = document.getElementById("trace-global-" + key + "-data-change-datetime-input");
            if (Object.hasOwn(val, "datetime")) {
                if (datetimeEl) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                    nativeInputValueSetter?.call(datetimeEl, val['datetime']);
                    const inputEvent = new Event('input', {bubbles: true});
                    datetimeEl?.dispatchEvent(inputEvent);
                }
            }
            if (Object.hasOwn(val, "author")) {
                if (authEl) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                    nativeInputValueSetter?.call(authEl, val['author']);
                    const inputEvent = new Event('input', {bubbles: true});
                    authEl?.dispatchEvent(inputEvent);
                }
            }
        }
    }

    function handleGlobalAntennaKey(key: string, val: any) {
        let element: HTMLElement|null = document.getElementById("antenna-global-" + key + "-input");
        if (element) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(element, val);
            const inputEvent = new Event('input', {bubbles: true});
            element?.dispatchEvent(inputEvent);
        }
    }

    function handleGlobalSpatialKey(key: string, val: any) {
        let element: HTMLElement|null = document.getElementById("spatial-global-" + key + "-input");
        if (element) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            nativeInputValueSetter?.call(element, val);
            const inputEvent = new Event('input', {bubbles: true});
            element?.dispatchEvent(inputEvent);
        }
    }

    function handleInGlobal(inGlobal: object) {
        console.log("inGlobal object: "); console.log(inGlobal);
        Object.keys(inGlobal).forEach(key => {
            const base = key.match(/^[^:]+\s*/gm)?.at(0) || "";
            const subkey = key.match(/:(.*)/gm)?.at(0)?.substring(1) || "";
            switch(base) {
                case 'core':
                    handleGlobalCoreKey(subkey, inGlobal[key as keyof typeof inGlobal]);
                break;
                case 'traceability':
                    handleGlobalTraceabilityKey(subkey, inGlobal[key as keyof typeof inGlobal]);
                break;
                case 'antenna':
                    handleGlobalAntennaKey(subkey, inGlobal[key as keyof typeof inGlobal]);
                break;
                case 'spatial':
                    handleGlobalSpatialKey(subkey, inGlobal[key as keyof typeof inGlobal]);
                break;
                default:
                    console.log("unknown base found: " + base);
                break;
            }
        });
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
            <div className={`grid grid-cols-1 place-items-center pt-4 overflow-auto gap-6`}>
                {/*<Image src={sigmflogo} alt="SigMF Logo"/>*/}
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