'use client'

import { useState } from "react";
import { SigMfCapDetsCapType, SigMfCaptureType } from "./SigMfInterfaces"

export default function SigMfCaptureDisplay( { inData, idx, dataGetter }: { inData: SigMfCaptureType, idx: number, dataGetter: Function } ) {

    const data = inData;

    return (
        <div className="dark:bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4">
            <p> Capture {idx} </p>
            <p> Sample Start {data['core:sample_start']}</p>
        </div>
    );
}