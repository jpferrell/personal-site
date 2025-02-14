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
        <div className="bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4 items-center flex justify-between">
            <p> Annotation {inIdx} </p>
            <p> Sample Start {data['core:sample_start']}</p>
            <AiOutlineClose className="fill-rose-500 dark:fill-rose-300 hover:fill-rose-600 hover:bg-slate-500 rounded-md" onClick={raiseDeleteEvent}/>
        </div>
    );
}