'use client'

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ExtensionPortal() {

    const [showModal, setShowModal] = useState<boolean>(false);
    const extArr: string[] = ["antenna", "spatial"];

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                Show modal
            </button>
            {
                showModal && createPortal(
                    <ModalContent onClose={() => setShowModal(false)} extensions={extArr}/>,
                    document.body
                )
            }
        </div>
    );
}

function ModalContent({ onClose, extensions }: { onClose: Function, extensions: Array<string> }) {

    interface ExtensionObjectType {
        name: string,
        version: string,
        optional: boolean
    }

    interface GlobalExtensionObjectType {
        extension?: ExtensionObjectType
    }
    const [output, setOutput] = useState<object>(() => {
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

    function printOutput() {
        console.log(output);
    }

    return (
        <div className="grid grid-cols-1 justify-evenly items-center shadow-slate-300 bg-slate-500 border-2 absolute w-full h-full bottom-16 top-16">
            <h1 className="text-center uppercase font-extrabold">Extensions</h1>
            <div className="">
            {
                extensions.map(ext => {
                    return (
                        <div className="text-center uppercase font-extrabold" key={`${ext}-top-div`}>
                            <h1>{ext} Extension</h1>
                            <div className="grid grid-cols-2 gap-2 capitalize w-8/12 mb-8 font-normal">
                                <label id={`${ext}-name-label`} key={`${ext}-name-label`} className="text-right">Name</label><p>{ext}</p>
                                <label id={`${ext}-version-label`} key={`${ext}-version-label`} className="text-right">Version </label><input type="text" id={`${ext}-version-input`} onChange={
                                    (e) => {
                                        let tmp = output;
                                        setOutput({
                                            ...tmp,
                                            [ext]: {
                                                name: ext,
                                                version: e.target.value,
                                                optional: output[ext as keyof typeof output].optional
                                            }
                                        });
                                    }
                                } placeholder="e.g. 1.2.3"></input>
                                <label id={`${ext}-optional-label`} key={`${ext}-optional-label`} className="text-right">Optional? </label><input type="checkbox" id={`${ext}-optional-input`} onChange={
                                    (e) => {
                                        let tmp = output;
                                        setOutput({
                                            ...tmp,
                                            [ext]: {
                                                name: ext,
                                                version: output[ext as keyof typeof output].version,
                                                optional: e.target.checked
                                            }
                                        });
                                    }
                                }></input>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <button className="rounded-md bg-slate-600 hover:bg-slate-700" onClick={printOutput}>Close</button>
        </div>
    )
}