'use client'

import { useEffect, useState } from "react";
import { SigMfDataChangeType, SigMfOriginType, SigMfTraceabilityAnnotationType, SigMfTraceabilityGlobalType } from "../SigMfInterfaces";
import SigMfDataChangeInput from "../Inputs/SigMfDataChangeInput";
import SigMfNumberInput from "../Inputs/SigMfNumberInput";
import SigMfOriginInput from "../Inputs/SigMfOriginInput";
import { changeStateInput, cleanObject } from "../SigMfFunctions";
import SigMfCheckboxInput from "../Inputs/SigMfCheckboxInput";

type ChangeFunction = (a: object|string) => void;

export function TraceabilityGlobal( { isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function }) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [lastMod, setLastMod] = useState<SigMfDataChangeType|string>("");
    const [lastRev, setLastRev] = useState<SigMfDataChangeType|string>("");
    const [rev, setRev] = useState<number|string>("");
    const [origin, setOrigin] = useState<SigMfOriginType|object>({});

    const [traceData, setTraceData] = useState<SigMfTraceabilityGlobalType>({
        enabled: false
    });

    useEffect(() => {
        setTraceData({...traceData, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, lastMod, 'traceability:last_modified', setTraceData);
    }, [lastMod]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, lastRev, 'traceability:last_reviewed', setTraceData);
    }, [lastRev]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, rev, 'traceability:revision', setTraceData);
    }, [rev]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, origin, 'traceability:origin', setTraceData);
    }, [origin]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (traceData.enabled) {
            const tmpObj: SigMfTraceabilityGlobalType = {...traceData};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [traceData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="traceability-global-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Traceability" id="trace-global-enabled-input" changeFunction={setIsEnabled} />
            <SigMfDataChangeInput idPart="trace-global-last_modified" labelPart="Last Modified" isHidden={isHidden || !isEnabled} changeFunction={setLastMod} />
            <SigMfDataChangeInput idPart="trace-global-last_reviewed" labelPart="Last Revision" isHidden={isHidden || !isEnabled} changeFunction={setLastRev} />
            <SigMfNumberInput label="Revision" id="trace-global-revision" hidden={isHidden || !isEnabled} placeholder="0" changeFunction={setRev}/>
            <SigMfOriginInput idPart="trace-global" labelPart="Origin" isHidden={isHidden || !isEnabled} changeFunction={setOrigin} />
        </div>
    );
}

export function TraceabilityAnnotation({ isHidden, changeFunction }: { isHidden: boolean, changeFunction: Function }) {

    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [lastMod, setLastMod] = useState<SigMfDataChangeType|object>({});
    const [lastRev, setLastRev] = useState<SigMfDataChangeType|object>({});

    const [traceData, setTraceData] = useState<SigMfTraceabilityAnnotationType>({
        enabled: false
    });

    useEffect(() => {
        setTraceData({...traceData, enabled: isEnabled});
    }, [isEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, lastMod, 'traceability:last_modified', setTraceData);
    }, [lastMod]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        changeStateInput(traceData, lastRev, 'traceability:last_reviewed', setTraceData);
    }, [lastRev]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (traceData.enabled) {
            const tmpObj: SigMfTraceabilityAnnotationType = {...traceData};
            delete tmpObj.enabled;
            const retObj: object = cleanObject(tmpObj);
            changeFunction(retObj);
        } else {
            changeFunction({});
        }
    }, [traceData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id="traceability-annot-container" hidden={isHidden} className="border-double border-4 rounded-lg dark:border-slate-200 dark:bg-zinc-700 mb-2">
            <SigMfCheckboxInput label="Traceability" id="trace-global-enabled-input" changeFunction={setIsEnabled} />
            <SigMfDataChangeInput idPart="trace-annot-last-mod" labelPart="Last Modified" isHidden={isHidden || !isEnabled} changeFunction={setLastMod} />
            <SigMfDataChangeInput idPart="trace-annot-last-rev" labelPart="Last Revision" isHidden={isHidden || !isEnabled} changeFunction={setLastRev} />
        </div>
    );
}