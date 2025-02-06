'use client'

import { useEffect, useState } from "react";
import { SigMfDataChangeType, SigMfOriginType, SigMfTraceabilityAnnotationType, SigMfTraceabilityGlobalType } from "../SigMfInterfaces";
import SigMfDataChangeInput from "../Inputs/SigMfDataChangeInput";
import SigMfNumberInput from "../Inputs/SigMfNumberInput";
import SigMfOriginInput from "../Inputs/SigMfOriginInput";
import { changeStateInput } from "../SigMfFunctions";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";


export function TraceabilityGlobal( { isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function}) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [lastMod, setLastMod] = useState<SigMfDataChangeType|null>(null);
    const [lastRev, setLastRev] = useState<SigMfDataChangeType|null>(null);
    const [rev, setRev] = useState<number|null>(null);
    const [origin, setOrigin] = useState<SigMfOriginType|null>(null);

    const [traceData, setTraceData] = useState<SigMfTraceabilityGlobalType>({
        enabled: false
    });

    useEffect(() => {
        setTraceData({...traceData, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(traceData, lastMod, 'traceability:last_modified', setTraceData);
    }, [lastMod]);

    useEffect(() => {
        changeStateInput(traceData, lastRev, 'traceability:last_reviewed', setTraceData);
    }, [lastRev]);

    useEffect(() => {
        changeStateInput(traceData, rev, 'traceability:revision', setTraceData);
    }, [rev]);

    useEffect(() => {
        changeStateInput(traceData, origin, 'traceability:origin', setTraceData);
    }, [origin]);

    useEffect(() => {
        if (traceData.enabled) {
            const retObj: SigMfTraceabilityGlobalType = {...traceData};
            delete retObj.enabled;
            changeFunction(retObj);
        } else {
            changeFunction(null);
        }
    }, [traceData]);

    return (
        <div id="traceability-global-container" hidden={isHidden}>
            <SigMfCheckboxInput label="Traceability" id="trace-global-enabled-input" changeFunction={setIsEnabled} />
            <SigMfDataChangeInput idPart="trace-global-last-mod" labelPart="Last Modified" isHidden={isHidden || !isEnabled} changeFunction={setLastMod} />
            <SigMfDataChangeInput idPart="trace-global-last-rev" labelPart="Last Revision" isHidden={isHidden || !isEnabled} changeFunction={setLastRev} />
            <SigMfNumberInput label="Revision" id="trace-global-rev" hidden={isHidden || !isEnabled} placeholder="0" changeFunction={setRev}/>
            <SigMfOriginInput idPart="trace-global-origin" labelPart="Origin" isHidden={isHidden || !isEnabled} changeFunction={setOrigin} />
        </div>
    );
}

export function TraceabilityAnnotation({ isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function}) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [lastMod, setLastMod] = useState<SigMfDataChangeType|null>(null);
    const [lastRev, setLastRev] = useState<SigMfDataChangeType|null>(null);

    const [traceData, setTraceData] = useState<SigMfTraceabilityAnnotationType>({
        enabled: false
    });

    useEffect(() => {
        setTraceData({...traceData, enabled: isEnabled});
    }, [isEnabled]);

    useEffect(() => {
        changeStateInput(traceData, lastMod, 'traceability:last_modified', setTraceData);
    }, [lastMod]);

    useEffect(() => {
        changeStateInput(traceData, lastRev, 'traceability:last_reviewed', setTraceData);
    }, [lastRev]);

    useEffect(() => {
        if (traceData.enabled) {
            const retObj: SigMfTraceabilityAnnotationType = {...traceData};
            delete retObj.enabled;
            changeFunction(retObj);
        } else {
            changeFunction(null);
        }
    }, [traceData]);

    return (
        <div id="traceability-annot-container" hidden={isHidden}>
            <SigMfCheckboxInput label="Traceability" id="trace-global-enabled-input" changeFunction={setIsEnabled} />
            <SigMfDataChangeInput idPart="trace-annot-last-mod" labelPart="Last Modified" isHidden={isHidden || !isEnabled} changeFunction={setLastMod} />
            <SigMfDataChangeInput idPart="trace-annot-last-rev" labelPart="Last Revision" isHidden={isHidden || !isEnabled} changeFunction={setLastRev} />
        </div>
    );
}