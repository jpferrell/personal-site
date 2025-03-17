'use client'

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

type ShowPortalFn = (a: boolean) => void;
type MoveExtObjFn = (a: object) => void;

export default function ExtensionPortal( { extArr, isEnabled, moveExtObj, showPortal }: {extArr: string[], isEnabled: boolean, moveExtObj: MoveExtObjFn, showPortal: Function} ) {

    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        setShowModal(isEnabled);
    }, [isEnabled]);

    function handleData(extObj: object) {
        moveExtObj(extObj);
    }

    function handleClose() {
        showPortal(false);
    }

    return (
        <div>
            {
                showModal && createPortal(
                    <ModalContent onClose={() => {setShowModal(false); handleClose();}} extensions={extArr} moveData={handleData}/>,
                    document.body
                )
            }
        </div>
    );
}

interface ExtensionObjectType {
    name: string,
    version: string,
    optional: boolean
}

interface GlobalExtensionObjectType {
    extension?: ExtensionObjectType
}

type OnCloseFunction = () => void;
type MoveFunction = (a: GlobalExtensionObjectType) => void;

function ModalContent({ onClose, extensions, moveData }: { onClose: OnCloseFunction, extensions: Array<string>, moveData: Function }) {

    const [output, setOutput] = useState<GlobalExtensionObjectType>(() => {
        const retObj: GlobalExtensionObjectType = {};
        for (const key of extensions) {
            retObj[key as keyof typeof retObj] = {
                name: key,
                version: "",
                optional: false
            };
        }
        return retObj;
    });

    const [btnEnabled, setBtnEnabled] = useState<boolean>(false);

    function handleData() {
        moveData(output);
        onClose();
    }

    function handleExit() {
        onClose();
    }

    useEffect(() => {
        let validData = true;
        Object.keys(output).forEach(obj => {
            if (Object.values(output[obj as keyof typeof output] || "").includes("")) {validData = false};
        });
        setBtnEnabled(validData);
    }, [output]);

    return (
        <div>
            <div className="shadow-zinc-600 dark:bg-zinc-950 border-2 bg-slate-300 absolute w-full h-full bottom-16 top-16">
                <AiOutlineClose className="fill-rose-500 flex rounded-lg dark:hover:bg-zinc-700 cursor-pointer" onClick={handleExit} />
                <div className="grid grid-cols-1 place-items-center">
                    <h1 className="text-center uppercase font-extrabold text-4xl">Extensions</h1>
                    <p className="w-1/2">
                        The use of extensions requires the specification of which version of the extension is in use and whether
                        the application must support the extension. A version number must be given in order to configure. Optional
                        is presumed False unless box is checked.
                    </p>
                    <div className="">
                    {
                        extensions.map(ext => {
                            return (
                                <div className="text-center font-extrabold dark:bg-zinc-800 bg-slate-400 rounded-lg w-fit p-2 mt-4" key={`${ext}-top-div`}>
                                    <h1 className="uppercase bg-indigo-300 dark:bg-indigo-800 rounded-sm mb-2">{ext} Extension</h1>
                                    <div className="grid grid-cols-2 gap-2 capitalize w-8/12 mb-8 last:mb-2 font-normal">
                                        <label id={`${ext}-name-label`} key={`${ext}-name-label`} className="text-right">Name</label><p>{ext}</p>
                                        <label id={`${ext}-version-label`} key={`${ext}-version-label`} className="text-right">Version </label><input type="text" id={`${ext}-version-input`} onChange={
                                            (e) => {
                                                const tmp = output;
                                                setOutput({
                                                    ...tmp,
                                                    [ext]: {
                                                        name: ext,
                                                        version: e.target.value,
                                                        optional: output[ext as keyof typeof output]!.optional
                                                    }
                                                });
                                            }
                                        } placeholder="e.g. 1.2.3" className="text-black dark:bg-white bg-slate-200"></input>
                                        <label id={`${ext}-optional-label`} key={`${ext}-optional-label`} className="text-right">Optional? </label><input type="checkbox" id={`${ext}-optional-input`} onChange={
                                            (e) => {
                                                const tmp = output;
                                                setOutput({
                                                    ...tmp,
                                                    [ext]: {
                                                        name: ext,
                                                        version: output[ext as keyof typeof output]!.version,
                                                        optional: e.target.checked
                                                    }
                                                });
                                            }
                                        } className=""></input>
                                    </div>
                                </div>
                            );
                        })
                    }
                    </div>
                    <button className={`rounded-md pl-4 pr-4 ${btnEnabled ? "dark:bg-indigo-800 bg-indigo-400" : "bg-slate-200 text-slate-300 dark:bg-slate-500"} ${btnEnabled ? "dark:hover:bg-indigo-900 hover:bg-indigo-500" : ""}`} onClick={handleData} disabled={!btnEnabled}>Configure</button>
                </div>
            </div>
        </div>
    );
}