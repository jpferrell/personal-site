'use client'

import { useState } from "react";
import { SigMfCapDetsCapType, SigMfCaptureType } from "./SigMfInterfaces"

export default function SigMfCaptureDisplay( { inData, idx }: { inData: SigMfCaptureType, idx: number } ) {

    const data = inData;

    return (
        <div className="dark:bg-slate-400 dark:hover:bg-slate-600 cursor-pointer rounded-md mx-4">
            <p> Capture {idx} </p>
            <p> Sample Start {data.sampStart}</p>
        </div>
    );
}