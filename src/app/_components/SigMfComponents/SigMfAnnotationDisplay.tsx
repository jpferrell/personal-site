'use client'

import { SigMfAnnotationType } from "./SigMfInterfaces"

export default function SigMfAnnotationDisplay( { inData, idx }: { inData: SigMfAnnotationType, idx: number } ) {
    const data = inData;

    return (
        <div className="dark:bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4">
            <p> Annotation {idx} </p>
            <p> Sample Start {data['core:sample_start']}</p>
        </div>
    );
}