'use client'

import { ReactNode } from "react";
import { SigMfAnnotationType } from "./SigMfInterfaces"
import { AiOutlineClose } from "react-icons/ai";

export default function SigMfAnnotationDisplay( { inData, inIdx, dataGetter, deleterFunction }: { inData: SigMfAnnotationType, inIdx: number, dataGetter: Function, deleterFunction: Function } ) {

    const data = inData;
    const idx = inIdx;

    function raiseDeleteEvent() {
        console.log("delete event selected");
        deleterFunction(idx);
    }

    return (
        <div className="bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4 items-center justify-between p-4 first:mt-2 grid grid-cols-5">
            <p><strong>Annotation {inIdx}</strong></p>
            <div className="grid grid-cols-1 col-span-3">
                <ul>
                    {Object.keys(data).map(key => <li key={`key-${key}`}><em>{key}</em>: {data[key as keyof typeof data] as ReactNode}</li>)}
                </ul>
            </div>
            <div className="flex justify-end">
                <AiOutlineClose className="fill-rose-500 dark:fill-rose-300 hover:fill-rose-600 hover:bg-slate-500 rounded-md" onClick={raiseDeleteEvent}/>
            </div>
        </div>
    );
}