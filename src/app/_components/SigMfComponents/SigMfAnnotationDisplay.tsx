'use client'

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
        <div className="dark:bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4 items-center flex justify-between">
            <p> Annotation {inIdx} </p>
            <p> Sample Start {data['core:sample_start']}</p>
            <AiOutlineClose className="dark:fill-rose-300 dark:hover:fill-rose-600 dark:hover:bg-slate-500 rounded-sm" onClick={raiseDeleteEvent}/>
        </div>
    );
}